const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./database');
const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings');
    console.log("Fetching bookings: ", rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to fetch a single booking by ID
app.get('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Calling get booking by id with id = ', id);

  try {
    const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [id]);
    console.log("Fetching booking by id: ", rows);

    if (rows.length === 0) {
      res.status(404).send('Booking not found');
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to insert a booking
app.post('/api/bookings', async (req, res) => {
  console.log('Calling insert booking with body = ', req.body);
  const { service, doctor_name, start_time, end_time, date } = req.body;
  const insertQuery = 'INSERT INTO bookings (service, doctor_name, start_time, end_time, date) VALUES (?, ?, ?, ?, ?)';

  try {
    console.log('Inserting booking:', req.body);
    await pool.query(insertQuery, [service, doctor_name, start_time, end_time, date]);
    res.status(201).send('Booking inserted successfully');
  } catch (error) {
    console.error('Error inserting booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});