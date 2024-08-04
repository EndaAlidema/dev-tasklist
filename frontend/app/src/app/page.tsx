import React from 'react';
import Link from 'next/link';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5001/api/bookings', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Home: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div>
      <h1>Current booking count: {bookings.length}</h1>
      <ul>
        {bookings.map((booking: any) => (
          <li key={booking.id}>
            <Link href={`/booking/${booking.id}`}>
              A Booking on {booking.date} starting at {booking.start_time}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;