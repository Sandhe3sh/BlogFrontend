import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';

const BlogDetail = ({ user }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlog(id);
      setBlog(response.data);
      setLoading(false);
    } catch (error) {
      setError('Blog not found');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(id);
        navigate('/');
      } catch (error) {
        setError('Failed to delete blog');
      }
    }
  };

  if (loading) return (
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
        width: '60px',
        height: '60px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #667eea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }}></div>
      <p style={{ 
        color: '#666', 
        fontSize: '1.1rem',
        fontWeight: '500'
      }}>Loading...</p>
    </div>
  );

  if (error) return (
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
        background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(238, 90, 36, 0.3)',
        fontSize: '1.1rem',
        fontWeight: '500'
      }}>
        ❌ {error}
      </div>
    </div>
  );

  if (!blog) return (
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
        padding: '1rem 2rem',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(255, 217, 61, 0.3)',
        fontSize: '1.1rem',
        fontWeight: '500'
      }}>
        📝 Blog not found
      </div>
    </div>
  );

  const isAuthor = user === blog.author?.email;

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '2rem auto', 
      padding: '0 2rem',
      minHeight: '80vh'
    }}>
      <article style={{
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

        {/* Blog title */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '1.5rem',
          lineHeight: '1.2',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {blog.title}
        </h1>

        {/* Meta information */}
        <div style={{
          background: 'rgba(102, 126, 234, 0.1)',
          padding: '1rem 1.5rem',
          borderRadius: '15px',
          marginBottom: '2rem',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#5a67d8',
            fontWeight: '500'
          }}>
            <span style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {blog.author?.email?.charAt(0)?.toUpperCase() || '?'}
            </span>
            <span>By {blog.author?.email || 'Unknown author'}</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            <span>📅</span>
            <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown date'}</span>
          </div>
          {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              <span>✏️</span>
              <span>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Blog content */}
        <div style={{
          lineHeight: '1.8',
          whiteSpace: 'pre-wrap',
          fontSize: '1.1rem',
          color: '#2c3e50',
          marginBottom: '3rem',
          background: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid #f0f0f0'
        }}>
          {blog.content}
        </div>
        
        {/* Author actions */}
        {isAuthor && (
          <div style={{
            marginTop: '3rem',
            borderTop: '2px solid rgba(102, 126, 234, 0.1)',
            paddingTop: '2rem',
            background: 'rgba(102, 126, 234, 0.05)',
            borderRadius: '15px',
            padding: '2rem',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <h3 style={{
              color: '#5a67d8',
              marginBottom: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ⚙️ Author Actions
            </h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link 
                to={`/edit/${blog.id}`}
                style={{ 
                  padding: '0.7rem 1.5rem',
                  background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '25px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 10px rgba(58, 123, 213, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
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
                ✏️ Edit Blog
              </Link>
              <button 
                onClick={handleDelete}
                style={{ 
                  padding: '0.7rem 1.5rem',
                  background: 'linear-gradient(45deg, #ff4757, #ff3838)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '25px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 10px rgba(255, 71, 87, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
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
                🗑️ Delete Blog
              </button>
            </div>
          </div>
        )}
      </article>

      {/* Add CSS animation for loading spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default BlogDetail;