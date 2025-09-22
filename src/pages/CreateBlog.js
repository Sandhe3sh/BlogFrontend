import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';

const CreateBlog = ({ user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #ffd93d, #ff6b35)',
          color: 'white',
          padding: '2rem 3rem',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(255, 217, 61, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', fontWeight: '600' }}>
            Authentication Required
          </h2>
          <p style={{ margin: '0', fontSize: '1.1rem', opacity: '0.9' }}>
            Please login to create a blog.
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid white',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600',
              marginTop: '1.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#ff6b35';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await blogAPI.createBlog(title, content);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '2rem auto', 
      padding: '0 2rem',
      minHeight: '80vh'
    }}>
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          ✍️ Create New Blog
        </h1>
        <p style={{
          color: '#666',
          fontSize: '1.1rem',
          margin: '0'
        }}>
          Share your thoughts with the world
        </p>
      </div>

      {/* Main Form Container */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Back button */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 10px rgba(102, 126, 234, 0.3)';
            }}
          >
            ← Back to Blogs
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '15px',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(238, 90, 36, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>❌</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}>
              📝 Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter your blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                fontSize: '1.1rem',
                border: '2px solid #e9ecef',
                borderRadius: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: 'white',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          {/* Content Textarea */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}>
              📄 Blog Content
            </label>
            <textarea
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="12"
              style={{
                width: '100%',
                padding: '1.5rem',
                fontSize: '1.1rem',
                border: '2px solid #e9ecef',
                borderRadius: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: 'white',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                resize: 'vertical',
                minHeight: '300px',
                fontFamily: 'inherit',
                lineHeight: '1.6'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          {/* Word Count */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '1rem',
            background: 'rgba(102, 126, 234, 0.05)',
            borderRadius: '10px',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <div style={{
              color: '#666',
              fontSize: '0.9rem'
            }}>
              <span style={{ fontWeight: '500' }}>Words:</span> {content.split(/\s+/).filter(word => word.length > 0).length}
            </div>
            <div style={{
              color: '#666',
              fontSize: '0.9rem'
            }}>
              <span style={{ fontWeight: '500' }}>Characters:</span> {content.length}
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: 'center' }}>
            <button 
              type="submit" 
              disabled={isSubmitting || !title.trim() || !content.trim()}
              style={{
                padding: '1rem 3rem',
                background: isSubmitting ? '#ccc' : 'linear-gradient(45deg, #28a745, #20c997)',
                color: 'white',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                boxShadow: isSubmitting ? 'none' : '0 4px 20px rgba(40, 167, 69, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && title.trim() && content.trim()) {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 25px rgba(40, 167, 69, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(40, 167, 69, 0.3)';
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #fff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Publishing...
                </>
              ) : (
                <>
                  🚀 Publish Blog
                </>
              )}
            </button>
          </div>

          {/* Tips Section */}
         
        </form>
      </div>

   
    </div>
  );
};

export default CreateBlog;