import express from 'express';
import cors from 'cors';
import { firestore } from './firebase/firebase.js';
import { collection, getDocs, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore methods

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/events', async (req, res) => {
  try {
    const eventsRef = collection(firestore, 'events');
    const snapshot = await getDocs(eventsRef);
    const events = snapshot.docs.map(doc => {
      return {
        event_id: doc.id,
        ...doc.data() 
      };
    });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events from Firestore:', error);
    res.status(500).json({ error: 'Failed to fetch events from Firestore' });
  }
});


app.post('/events/:id/book', async (req, res) => {
  const eventId = req.params.id;
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ success: false, message: 'Student ID is required' });
  }

  try {
    const eventRef = doc(firestore, 'events', eventId);
    const eventDoc = await getDoc(eventRef); // Use getDoc to retrieve a single document

    if (!eventDoc.exists()) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const eventData = eventDoc.data();
    if (eventData.student_id) {
      return res.status(409).json({ success: false, message: 'Event already booked' });
    }

    // Use setDoc instead of updateDoc to set the value of student_id
    await setDoc(eventRef, { ...eventData, student_id: studentId });

    res.json({ success: true, message: 'Event booked successfully' });
  } catch (error) {
    console.error('Error booking event in Firestore:', error);
    res.status(500).json({ success: false, message: 'Failed to book event in Firestore' });
  }
});


// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
