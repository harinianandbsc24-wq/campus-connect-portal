import { useState, useEffect } from 'react';
import AuthModule from './components/AuthModule.jsx';
import StudentPortal from './components/StudentsPortal.jsx';

export default function App() {
  const [activeView, setActiveView] = useState('auth'); //'
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#login') {
        setActiveView('auth');
        setActiveTab('login');
        scrollToAuth();
      } else if (hash === '#register') {
        setActiveView('auth');
        setActiveTab('register');
        scrollToAuth();
      } else if (hash === '#student') {
        setActiveView('student');
        scrollToAuth();
      }
    };

    const scrollToAuth = () => {
      const authElem = document.getElementById('auth-section');
      if (authElem) {
        authElem.scrollIntoView({ behavior: 'smooth' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div style={{ padding: '20px 0'}}>
      {activeView === 'student' ? (
        <StudentPortal onBackToHome={() => setActiveView('auth')} />
      ) : (
        <AuthModule initialMode={activeTab} />
      )}
      </div>
  );
}