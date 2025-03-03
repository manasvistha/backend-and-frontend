import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { FaSpinner, FaCalendarAlt, FaUser, FaTag, FaEye } from "react-icons/fa";
import moment from "moment";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const location = useLocation();
  const cat = location.search;

  // Top categories
  const categories = [
    { name: "All", value: "all" },
    { name: "Art", value: "art" },
    { name: "Science", value: "science" },
    { name: "Technology", value: "technology" },
    { name: "Cinema", value: "cinema" },
    { name: "Design", value: "design" },
    { name: "Food", value: "food" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
        
        // Update active category based on URL search
        if (!cat) {
          setActiveCategory("all");
        } else {
          const category = new URLSearchParams(cat).get("cat");
          setActiveCategory(category || "all");
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [cat]);

  const getText = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + "...";
  };

  const getCategoryTitle = () => {
    if (activeCategory === "all") return "Latest Posts";
    return categories.find(c => c.value === activeCategory)?.name || "Posts";
  };

  return (
    <div className="home-container">
      <div className="category-filters">
        <div className="category-filters-inner">
          {categories.map((category) => (
            <Link
              key={category.value}
              to={category.value === "all" ? "/" : `/?cat=${category.value}`}
              className={`category-filter ${activeCategory === category.value ? "active" : ""}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="posts-section">
        <h2 className="section-title">{getCategoryTitle()}</h2>

        {loading ? (
          <div className="loading-container">
            <FaSpinner className="spinner" />
            <p>Loading posts...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Try Again
            </button>
          </div>
        ) : Array.isArray(posts) && posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map((post) => (
              <article className="post-card" key={post.id}>
                <div className="post-image">
                  {post.img ? (
                    <img 
                      src={`../upload/${post.img}`} 
                      alt={post.title} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="placeholder-image">
                      <span>No Image</span>
                    </div>
                  )}
                  {post.cat && (
                    <div className="post-category-badge">
                      <FaTag className="category-icon" />
                      <span>{post.cat}</span>
                    </div>
                  )}
                </div>
                
                <div className="post-content">
                  <div className="post-meta">
                    {post.date && (
                      <div className="post-date">
                        <FaCalendarAlt className="meta-icon" />
                        <span>{moment(post.date).format("MMM D, YYYY")}</span>
                      </div>
                    )}
                    {post.username && (
                      <div className="post-author">
                        <FaUser className="meta-icon" />
                        <span>{post.username}</span>
                      </div>
                    )}
                    {post.views && (
                      <div className="post-views">
                        <FaEye className="meta-icon" />
                        <span>{post.views} views</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="post-title">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="post-excerpt">{truncateText(getText(post.desc))}</p>
                  
                  <Link to={`/post/${post.id}`} className="read-more-button">
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-posts">
            <h3>No posts found</h3>
            <p>There are no posts in this category yet.</p>
            <Link to="/" className="browse-all-button">
              Browse all posts
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .home-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        .category-filters {
          margin-bottom: 2rem;
          border-bottom: 1px solid #eee;
          overflow-x: auto;
        }

        .category-filters-inner {
          display: flex;
          gap: 1rem;
          padding-bottom: 0.5rem;
          min-width: min-content;
        }

        .category-filter {
          padding: 0.5rem 1rem;
          color: #555;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          border-radius: 20px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .category-filter:hover {
          background-color: #f5f5f5;
          color: #333;
        }

        .category-filter.active {
          background-color: #333;
          color: white;
        }

        .section-title {
          margin-bottom: 1.5rem;
          font-size: 1.75rem;
          color: #333;
          position: relative;
          display: inline-block;
          padding-bottom: 0.5rem;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background-color: #333;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .post-card {
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: white;
          height: 100%;
        }

        .post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }

        .post-image {
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .post-card:hover .post-image img {
          transform: scale(1.05);
        }

        .placeholder-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          color: #aaa;
        }

        .post-category-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: rgba(51, 51, 51, 0.8);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .category-icon {
          font-size: 0.7rem;
        }

        .post-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .post-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          color: #666;
          font-size: 0.75rem;
          flex-wrap: wrap;
        }

        .post-date, .post-author, .post-views {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .meta-icon {
          font-size: 0.7rem;
        }

        .post-title {
          margin-top: 0;
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
          line-height: 1.4;
        }

        .post-title a {
          color: #333;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .post-title a:hover {
          color: #666;
        }

        .post-excerpt {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .read-more-button {
          margin-top: auto;
          display: inline-block;
          padding: 0.5rem 1rem;
          background-color: #333;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: background-color 0.2s ease;
          align-self: flex-start;
        }

        .read-more-button:hover {
          background-color: #555;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 0;
          color: #666;
        }

        .spinner {
          animation: spin 1s linear infinite;
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #333;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .error-container {
          text-align: center;
          padding: 3rem 0;
          color: #d32f2f;
        }

        .retry-button {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .retry-button:hover {
          background-color: #d32f2f;
        }

        .no-posts {
          text-align: center;
          padding: 3rem 0;
          color: #666;
        }

        .browse-all-button {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.5rem 1.5rem;
          background-color: #333;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }

        .browse-all-button:hover {
          background-color: #555;
        }

        @media (max-width: 768px) {
          .posts-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .post-image {
            height: 180px;
          }

          .home-container {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;