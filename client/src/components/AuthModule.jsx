import { useState } from 'react';


export default function AuthModule({ initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Logging in with: ${formData.email}`);
    } else {
      alert(`RVU Student Registered: ${formData.name} (${formData.email})`);
    }
  };


  return (
    <div style={styles.cardContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>RV UNIVERSITY</h1>
        <p style={styles.subtitle}>Excellence in Education</p>
      </div>


      <h2 style={styles.formTitle}>
        {isLogin ? 'Student Login' : 'Student Registration'}
      </h2>


      <div style={styles.tabContainer}>
        <button
          style={isLogin ? styles.activeTab : styles.inactiveTab}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          style={!isLogin ? styles.activeTab : styles.inactiveTab}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>


      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        )}


        <input
          type="email"
          name="email"
          placeholder="RVU Email Address"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />


        <button type="submit" style={styles.submitBtn}>
          {isLogin ? 'Sign In to Portal' : 'Create Student Account'}
        </button>
      </form>
    </div>
  );
}


const styles = {
  cardContainer: {
    maxWidth: '400px',
    margin: '30px auto',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    backgroundColor: '#0A2240',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '20px'
  },
  title: {
    color: '#F2A900',
    margin: 0,
    fontSize: '22px',
    letterSpacing: '1px'
  },
  subtitle: {
    color: '#ffffff',
    margin: '4px 0 0 0',
    fontSize: '12px'
  },
  formTitle: {
    color: '#0A2240',
    fontSize: '18px',
    marginBottom: '15px'
  },
  tabContainer: {
    display: 'flex',
    justify: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  activeTab: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#0A2240',
    color: '#F2A900',
    border: 'none',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  inactiveTab: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#e0e0e0',
    color: '#333333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #cccccc',
    fontSize: '14px',
    outline: 'none'
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#F2A900',
    color: '#0A2240',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer'
  }
};