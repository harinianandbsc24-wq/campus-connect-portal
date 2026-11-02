import express from 'express';
import cors from 'cors';
import { errorHandler, ApiError, asyncHandler } from './src/Middleware/errorMiddleware.js';



const app = express();
const PORT = 5000;




// Middleware to parse incoming JSON and allow React requests
app.use(express.json());
app.use(cors());




// Mock Data (In-Memory Database)
let assignments = [
  { id: 1, subject: 'CS3301 - Full Stack', title: 'Lab 2: React Routing', status: 'Pending' },
  { id: 2, subject: 'CS3302 - DBMS', title: 'ER Diagram Report', status: 'Submitted' }
];




// -------------------------------------------------------------
// RESTful API Routes
// -------------------------------------------------------------




// 1. GET: Fetch all assignments
app.get('/api/assignments', (req, res) => {
  res.json(assignments);
});




// 2. POST: Create a new assignment (Faculty View)
app.post('/api/assignments', (req, res) => {
  const newAssignment = {
    id: assignments.length + 1,
    subject: req.body.subject,
    title: req.body.title,
    status: 'Pending'
  };
  assignments.push(newAssignment);
  res.status(201).json(newAssignment);
});




// 3. PUT: Submit an assignment (Student View)
app.put('/api/assignments/:id/submit', (req, res) => {
  const id = parseInt(req.params.id);
  const assignment = assignments.find(a => a.id === id);




  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }




  assignment.status = 'Submitted';
  res.json(assignment);
});




// Start the Node.js HTTP Server
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});