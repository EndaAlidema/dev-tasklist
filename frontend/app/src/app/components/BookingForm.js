// src/app/components/BookingForm.js

'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        service: '',
        doctor_name: '',
        start_time: '',
        end_time: '',
        date: '',
    });

    const [errors, setErrors] = useState([]);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            await axios.post('http://host.docker.internal:5001/api/bookings', formData);
            router.push('/'); // Redirect to the main page
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors([error.response.data]);
            } else {
                setErrors(['An unexpected error occurred.', error.message]);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="form-label">Service:</label>
                <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>
            <div>
                <label className="form-label">Doctor Name:</label>
                <input
                    type="text"
                    name="doctor_name"
                    value={formData.doctor_name}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>
            <div>
                <label className="form-label">Start Time:</label>
                <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>
            <div>
                <label className="form-label">End Time:</label>
                <input
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>
            <div>
                <label className="form-label">Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>
            <button type="submit" className="form-button">Book Appointment</button>

            {errors.length > 0 && (
                <div>
                    <h3>Errors:</h3>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
};

export default BookingForm;