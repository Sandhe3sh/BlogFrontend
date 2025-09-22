

// Home.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import './Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchBlogs(currentPage);
  }, [currentPage, navigate]);

  const fetchBlogs = async (page) => {
    try {
      const response = await blogAPI.getBlogs(page, 5);
      setBlogs(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home-container">
      <h1>All Blogs</h1>
      {!blogs || blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <>
          {blogs && blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <h3>
                <Link to={`/blog/${blog.id}`} className="blog-link">
                  {blog.title}
                </Link>
              </h3>
              <p className="blog-meta">
                By {blog.author?.email || 'Unknown author'} on {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown date'}
              </p>
              <p>{blog.content.substring(0, 200)}...</p>
            </div>
          ))}
          
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="pagination-button prev"
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage >= totalPages - 1}
              className="pagination-button next"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;