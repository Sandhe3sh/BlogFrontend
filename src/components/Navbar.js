import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser(null);
    navigate('/login'); // redirect to login after logout
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: '0',
      zIndex: '1000',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Link to="/" style={{ 
        color: 'white', 
        textDecoration: 'none', 
        fontSize: '1.8rem',
        fontWeight: '700',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
      onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
      >
        ✨ Blog App
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user ? (
          <>
            <Link to="/create" style={{ 
              color: 'white', 
              marginRight: '1rem', 
              textDecoration: 'none',
              background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
              padding: '0.6rem 1.2rem',
              borderRadius: '25px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 10px rgba(238, 90, 36, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(238, 90, 36, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 10px rgba(238, 90, 36, 0.3)';
            }}
            >
              + Create Blog
            </Link>
            <span style={{ 
              marginRight: '1rem',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontWeight: '500',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              👤 {user}
            </span>
            <button onClick={handleLogout} style={{
              background: 'linear-gradient(45deg, #ff4757, #ff3838)',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.2rem',
              cursor: 'pointer',
              borderRadius: '25px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 10px rgba(255, 71, 87, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 71, 87, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 10px rgba(255, 71, 87, 0.3)';
            }}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ 
              color: 'white', 
              marginRight: '1rem', 
              textDecoration: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '25px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';
              e.target.style.border = '2px solid rgba(255, 255, 255, 0.3)';
            }}
            >
              Login
            </Link>
            <Link to="/register" style={{ 
              color: 'white', 
              textDecoration: 'none',
              background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)',
              padding: '0.6rem 1.2rem',
              borderRadius: '25px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 10px rgba(58, 123, 213, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(58, 123, 213, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 10px rgba(58, 123, 213, 0.3)';
            }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;