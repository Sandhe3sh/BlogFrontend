import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Style objects for reusability and cleaner JSX
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      backgroundColor: '#fff'
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#333',
      fontSize: '1.5rem',
      fontWeight: '600'
    },
    inputGroup: {
      marginBottom: '1rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#007bff'
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      background: loading ? '#6c757d' : '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.3s ease',
      opacity: loading ? 0.7 : 1
    },
    error: {
      color: '#dc3545',
      backgroundColor: '#f8d7da',
      border: '1px solid #f5c6cb',
      borderRadius: '4px',
      padding: '0.75rem',
      marginBottom: '1rem',
      fontSize: '0.875rem'
    },
    footer: {
      marginTop: '1.5rem',
      textAlign: 'center',
      color: '#666',
      fontSize: '0.875rem'
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: '500'
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      setUser(response.data.email);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = styles.inputFocus.borderColor;
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = styles.input.border.split(' ')[2]; // Reset to original
  };

  const handleButtonHover = (e) => {
    if (!loading) {
      e.target.style.backgroundColor = '#0056b3';
    }
  };

  const handleButtonLeave = (e) => {
    if (!loading) {
      e.target.style.backgroundColor = styles.button.background;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      
      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            required
            disabled={loading}
            style={styles.input}
          />
        </div>
        
        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            required
            disabled={loading}
            style={styles.input}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={styles.button}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p style={styles.footer}>
        Don't have an account?{' '}
        <Link 
          to="/register" 
          style={styles.link}
          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;