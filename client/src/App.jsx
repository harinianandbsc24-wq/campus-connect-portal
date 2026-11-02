import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthModule from './components/AuthModule.jsx';
import StudentPortal from './components/StudentPortal.jsx';

export default function App() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px 0' }}>
      <Routes>
        {/* Auth Route */}
        <Route path="/" element={<AuthModule initialMode="login" />} />
        <Route path="/login" element={<AuthModule initialMode="login" />} />
        <Route path="/register" element={<AuthModule initialMode="register" />} />

        {/* Student Portal Parent Route */}
        <Route 
          path="/student/*" 
          element={<StudentPortal onBackToHome={() => navigate('/')} />} 
        />
      </Routes>
    </div>
  );
}