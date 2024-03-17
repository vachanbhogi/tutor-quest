import express from 'express';
import cors from 'cors';
import { readEventsFromCSV, updateCSV } from './fileOperations.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let events = [];

readEventsFromCSV()
  .then(rows => {
    events = rows;
  })
  .catch(err => {
    console.error('Error reading CSV file:', err);
  });

app.get('/events', (req, res) => {
  res.json(events);
});

app.post('/events/:id/book', (req, res) => {
  const eventId = req.params.id;
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ success: false, message: 'Student ID is required' });
  }

  const eventIndex = events.findIndex(event => event.event_id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  const event = events[eventIndex];
  if (event.student_id) {
    return res.status(409).json({ success: false, message: 'Event already booked' });
  }

  event.student_id = studentId;
  updateCSV(events)
    .then(() => {
      res.json({ success: true, message: 'Event booked successfully' });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Failed to update CSV file' });
    });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
