import React from 'react';
import Link from 'next/link';

async function getBooking(id: string) {
  const res = await fetch(`http://host.docker.internal:5001/api/bookings/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch booking data');
  }

  return res.json();
}

const BookingDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  let booking = null;
  let error = null;

  try {
    booking = await getBooking(id);
  } catch (err) {
    console.error('Error fetching booking details:', err);
    error = err.message;
  }

  if (error) {
    return <div>Error: {error} {booking} {id}</div>;
  }

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Booking Details</h1>
      <p>This booking is with {booking.doctor_name} for {booking.service} and it ends on {booking.end_time}</p>
      <Link href="/">Back to homepage</Link>
    </div>
  );
};

export default BookingDetail;