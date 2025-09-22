import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';

const EditBlog = ({ user }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlog(id);
      const blog = response.data;
      
      if (user !== blog.author?.email) {
        navigate('/');
        return;
      }
      
      setTitle(blog.title);
      setContent(blog.content);
      setLoading(false);
    } catch (error) {
      setError('Blog not found');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogAPI.updateBlog(id, title, content);
      navigate(`/blog/${id}`);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update blog');
    }
  };

  if (!user) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          textAlign: 'center',
          maxWidth: '400px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
          <h2 style={{ 
            margin: '0 0 1rem 0', 
            color: '#1f2937', 
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>Access Required</h2>
          <p style={{ 
            color: '#6b7280', 
            margin: '0 0 2rem 0',
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>Please login to edit blogs.</p>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0px)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem auto'
        }}></div>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '1rem'
        }}>Loading blog...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative'
    }}>
      <div style={{ 
        maxWidth: '700px', 
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        animation: 'slideUp 0.6s ease-out'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2.5rem 2rem',
          color: 'white',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="20" cy="20" r="4"/%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✨</div>
            <h2 style={{ 
              margin: 0, 
              fontSize: '2rem', 
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>Edit Blog Post</h2>
            <p style={{ 
              margin: 0, 
              opacity: 0.9,
              fontSize: '1.1rem',
              fontWeight: '300'
            }}>Make your content shine</p>
          </div>
        </div>

        {/* Form Content */}
        <div style={{ padding: '2.5rem 2rem' }}>
          {error && (
            <div style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              marginBottom: '2rem',
              color: '#dc2626',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '1.2rem' }}>⚠️</span>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#374151',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}>
                📝 Blog Title
              </label>
              <input
                type="text"
                placeholder="Enter your amazing blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem 1.25rem', 
                  fontSize: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#ffffff',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0px)';
                }}
              />
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#374151',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}>
                📚 Blog Content
              </label>
              <textarea
                placeholder="Share your thoughts and ideas..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows="12"
                style={{ 
                  width: '100%', 
                  padding: '1rem 1.25rem', 
                  fontSize: '1rem', 
                  resize: 'vertical',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#ffffff',
                  fontFamily: 'inherit',
                  lineHeight: '1.6'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Button Container */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              flexWrap: 'wrap',
              paddingTop: '1rem'
            }}>
              <button 
                type="submit" 
                style={{ 
                  padding: '1rem 2rem', 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white', 
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                  flex: '1',
                  minWidth: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                }}
              >
                <span>💾</span> Update Blog
              </button>
              
              <button 
                type="button" 
                onClick={() => navigate(`/blog/${id}`)}
                style={{ 
                  padding: '1rem 2rem', 
                  background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                  color: 'white', 
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(107, 114, 128, 0.3)',
                  flex: '1',
                  minWidth: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(107, 114, 128, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(107, 114, 128, 0.3)';
                }}
              >
                <span>↩️</span> Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem 2rem',
          backgroundColor: 'rgba(249, 250, 251, 0.8)',
          borderTop: '1px solid rgba(229, 231, 235, 0.5)',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            💡 <strong>Tip:</strong> Use markdown formatting for rich text content
          </p>
        </div>
      </div>

      {/* Global Keyframe Animations */}
      <style jsx>{`
        @keyframes slideUp {
          0% { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px) scale(1); 
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .button-container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default EditBlog;