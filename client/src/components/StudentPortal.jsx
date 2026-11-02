import { useState, useEffect } from 'react';//add useeffect
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';


export default function StudentPortal({ onBackToHome }) {
  // Hook for programmatic client-side navigation
  const navigate = useNavigate();
  // Hook to read the current URL path for active styling
  const location = useLocation();


  //const [assignments, setAssignments] = useState([
   // { id: 1, subject: 'CS3301 - Full Stack', title: 'Lab Assignment 2: React Routing', status: 'Pending', dueDate: 'Sept 15, 2026' },
    //{ id: 2, subject: 'CS3302 - DBMS', title: 'ER Diagram Project Report', status: 'Submitted', dueDate: 'Sept 01, 2026' }
 // ]);
 const [assignments, setAssignments] = useState([]);


// Fetch live assignments from Express API when component mounts
useEffect(() => {
  fetch('http://localhost:5000/api/assignments')
    .then((res) => res.json())
    .then((data) => setAssignments(data))
    .catch((err) => console.error('Error fetching assignments:', err));
}, []);


  const notices = [
    { id: 1, title: 'Mid-Term Exam Schedule Released', date: 'Sept 10, 2026', dept: 'SOCSE' },
    { id: 2, title: 'Hackathon Registration Open', date: 'Sept 20, 2026', dept: 'RVU Tech Club' }
  ];


  //const handleAssignmentSubmit = (id) => {
    //setAssignments(assignments.map(item =>
      //item.id === id ? { ...item, status: 'Submitted' } : item
   // ));
  //};
  const handleAssignmentSubmit = (id) => {
  fetch(`http://localhost:5000/api/assignments/${id}/submit`, {
    method: 'PUT'
  })
    .then((res) => res.json())
    .then((updatedAssignment) => {
      // Update local state with the returned updated record from Express
      setAssignments(
        assignments.map((item) =>
          item.id === id ? updatedAssignment : item
        )
      );
    })
    .catch((err) => console.error('Error submitting assignment:', err));
};


  return (
    <div style={styles.container}>
      {/* Header View */}
      <header style={styles.header}>
        <div>
          <h2 style={{ margin: 0, color: '#F2A900' }}>👨‍🎓 Student Portal View</h2>
          <span style={{ fontSize: '13px', color: '#e0e0e0' }}>Welcome, RVU Student</span>
        </div>
        <button onClick={onBackToHome} style={styles.backBtn}>
          ← Back to Main Campus View
        </button>
      </header>


      {/* STUDENT TASK 1: Navigate programmatically on button clicks using navigate() */}
      <div style={styles.tabContainer}>
        <button
          onClick={() => navigate('/student/notices')}
          style={location.pathname.includes('/notices') || location.pathname === '/student' ? styles.activeTab : styles.tab}
        >
          Notices & Events
        </button>


        <button
          onClick={() => navigate('/student/assignments')}
          style={location.pathname.includes('/assignments') ? styles.activeTab : styles.tab}
        >
          Assignments
        </button>


        <button
          onClick={() => navigate('/student/attendance')}
          style={location.pathname.includes('/attendance') ? styles.activeTab : styles.tab}
        >
          Track Attendance
        </button>


        <button
          onClick={() => navigate('/student/profile')}
          style={location.pathname.includes('/profile') ? styles.activeTab : styles.tab}
        >
          Profile
        </button>
      </div>


      {/* STUDENT TASK 2: Route rendering using <Routes> and <Route> */}
      <div style={styles.contentCard}>
        <Routes>
          <Route path="/" element={<NoticesView notices={notices} />} />
          <Route path="notices" element={<NoticesView notices={notices} />} />
          <Route
            path="assignments"
            element={<AssignmentsView assignments={assignments} onSubmit={handleAssignmentSubmit} />}
          />
          <Route path="attendance" element={<AttendanceView />} />
          <Route path="profile" element={<ProfileView />} />
        </Routes>
      </div>
    </div>
  );
}


// Sub-views
function NoticesView({ notices }) {
  return (
    <div>
      <h3>📢 Campus Notices & Events</h3>
      <ul style={styles.list}>
        {notices.map((item) => (
          <li key={item.id} style={styles.listItem}>
            <div>
              <strong>{item.title}</strong>
              <p style={styles.subText}>{item.dept} • {item.date}</p>
            </div>
            <button style={styles.actionBtn}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


function AssignmentsView({ assignments, onSubmit }) {
  return (
    <div>
      <h3>📝 Assignments & Submissions</h3>
      <ul style={styles.list}>
        {assignments.map((item) => (
          <li key={item.id} style={styles.listItem}>
            <div>
              <strong>{item.title}</strong>
              <p style={styles.subText}>{item.subject} • Due: {item.dueDate}</p>
            </div>
            {item.status === 'Submitted' ? (
              <span style={styles.badgeSuccess}>Submitted</span>
            ) : (
              <button style={styles.actionBtn} onClick={() => onSubmit(item.id)}>
                Submit Assignment
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


function AttendanceView() {
  return (
    <div>
      <h3>📊 Attendance Tracker</h3>
      <div style={styles.grid}>
        <div style={styles.metricCard}>
          <h4>CS3301 - Full Stack</h4>
          <p style={styles.metricText}>88% Attendance</p>
        </div>
        <div style={styles.metricCard}>
          <h4>CS3302 - DBMS</h4>
          <p style={styles.metricText}>92% Attendance</p>
        </div>
      </div>
    </div>
  );
}


function ProfileView() {
  return (
    <div>
      <h3>👤 Student Profile</h3>
      <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
        <p><strong>Name:</strong> RVU Student</p>
        <p><strong>Department:</strong> School of Computer Science & Engineering (SOCSE)</p>
        <p><strong>Course:</strong> CS3301 - Full Stack Development</p>
        <p><strong>Status:</strong> Active Enrolled</p>
      </div>
    </div>
  );
}


// RVU University Styling
const styles = {
  container: { maxWidth: '850px', margin: '30px auto', fontFamily: 'Arial, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0A2240', padding: '15px 20px', borderRadius: '8px 8px 0 0', color: '#fff' },
  backBtn: { backgroundColor: '#F2A900', border: 'none', padding: '8px 14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', color: '#0A2240' },
  tabContainer: { display: 'flex', backgroundColor: '#e0e0e0', borderBottom: '2px solid #0A2240' },
  tab: { flex: 1, padding: '12px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#333' },
  activeTab: { flex: 1, padding: '12px', border: 'none', backgroundColor: '#ffffff', color: '#0A2240', fontWeight: 'bold', borderTop: '3px solid #0A2240', cursor: 'pointer' },
  contentCard: { backgroundColor: '#ffffff', padding: '25px', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  list: { listStyle: 'none', padding: 0 },
  listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #eee' },
  subText: { margin: '4px 0 0 0', fontSize: '12px', color: '#666' },
  actionBtn: { backgroundColor: '#0A2240', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  badgeSuccess: { backgroundColor: '#28a745', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  metricCard: { border: '1px solid #ddd', padding: '15px', borderRadius: '6px', textAlign: 'center' },
  metricText: { fontSize: '18px', fontWeight: 'bold', color: '#0A2240' }
};