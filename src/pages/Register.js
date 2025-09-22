// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { authAPI } from '../services/api';

// const Register = ({ setUser }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       navigate('/');
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Registering user:', email);
//     try {
//       const response = await authAPI.register(email, password);
//       console.log('Registration response:', response.data);
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('email', response.data.email);
//       setUser(response.data.email);
//       navigate('/');
//     } catch (error) {
//       console.error('Registration error:', error);
//       setError(error.response?.data?.error || error.message || 'Registration failed');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
//       <h2>Register</h2>
//       {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '1rem' }}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
//           />
//         </div>
//         <div style={{ marginBottom: '1rem' }}>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
//           />
//         </div>
//         <button type="submit" style={{ 
//           width: '100%', 
//           padding: '0.75rem', 
//           background: '#28a745', 
//           color: 'white', 
//           border: 'none',
//           fontSize: '1rem',
//           cursor: 'pointer'
//         }}>
//           Register
//         </button>
//       </form>
//       <p style={{ marginTop: '1rem', textAlign: 'center' }}>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;
/* Register.css */


// Register.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Register.css';

const Register = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    console.log('Registering user:', email);
    try {
      const response = await authAPI.register(email, password);
      console.log('Registration response:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      setUser(response.data.email);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.error || error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Account</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            disabled={isLoading}
            minLength="6"
          />
        </div>
        
        <button 
          type="submit" 
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
      
      <p className="login-link">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;