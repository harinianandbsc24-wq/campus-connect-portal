import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// 1. CONNECT TO LOCAL MONGODB
mongoose.connect('mongodb://127.0.0.1:27017/campus_connect')
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 2. DEFINE MONGOOSE SCHEMA & MODEL
const assignmentSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, default: 'Pending' }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

// -------------------------------------------------------------
// RESTful API Routes (Connected to MongoDB)
// -------------------------------------------------------------

// 1. GET: Fetch all assignments from MongoDB
app.get('/api/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST: Create a new assignment in MongoDB (Faculty View)
app.post('/api/assignments', async (req, res) => {
  try {
    const newAssignment = await Assignment.create({
      subject: req.body.subject,
      title: req.body.title,
      status: 'Pending'
    });
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. PUT: Submit an assignment in MongoDB (Student View)
app.put('/api/assignments/:id/submit', async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      id,
      { status: 'Submitted' },
      { new: true }
    );

    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(updatedAssignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the Node.js HTTP Server
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});