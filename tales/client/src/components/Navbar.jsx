import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { FaPen, FaSignOutAlt, FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const categories = [
    { name: "ART", path: "/?cat=art" },
    { name: "SCIENCE", path: "/?cat=science" },
    { name: "TECHNOLOGY", path: "/?cat=technology" },
    { name: "CINEMA", path: "/?cat=cinema" },
    { name: "DESIGN", path: "/?cat=design" },
    { name: "FOOD", path: "/?cat=food" },
  ];

  const isActiveLink = (path) => {
    const category = new URLSearchParams(location.search).get("cat");
    if (path === "/") return location.pathname === "/" && !category;
    if (path.includes("cat=")) return category === path.split("=")[1];
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <h1 className="logo-text">Tales</h1>
          </Link>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="category-links">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className={`nav-link ${isActiveLink(category.path) ? 'active' : ''}`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="auth-links">
            {currentUser ? (
              <>
                <div className="user-info">
                  <FaUser className="user-icon" />
                  <span className="username">{currentUser.username}</span>
                </div>
                <button className="logout-button" onClick={logout}>
                  <FaSignOutAlt className="logout-icon" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="login-button">
                Login
              </Link>
            )}
            <Link to="/write" className="write-button">
              <FaPen className="write-icon" />
              <span>Write</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          background-color: #ffffff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 0.75rem 0;
          z-index: 1000;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1.5rem;
        }

        .navbar-logo {
          flex: 0 0 auto;
        }

        .logo-link {
          text-decoration: none;
        }

        .logo-text {
          color: #333;
          font-size: 1.75rem;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: 1px;
          margin: 0;
          background: linear-gradient(45deg, #333, #666);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: transform 0.3s ease;
        }

        .logo-text:hover {
          transform: scale(1.05);
        }

        .navbar-links {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          margin-left: 2rem;
        }

        .category-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .nav-link {
          color: #555;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 0.5rem 0;
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #333;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #000;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: #000;
          font-weight: 700;
        }

        .auth-links {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #f5f5f5;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
        }

        .user-icon {
          color: #555;
          font-size: 0.8rem;
        }

        .username {
          font-size: 0.9rem;
          font-weight: 600;
          color: #333;
        }

        .logout-button, 
        .login-button {
          background-color: transparent;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 0.4rem 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          color: #555;
          transition: all 0.3s ease;
        }

        .logout-button:hover,
        .login-button:hover {
          background-color: #f5f5f5;
          color: #333;
        }

        .login-button {
          text-decoration: none;
        }

        .write-button {
          background-color: #333;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        .write-button:hover {
          background-color: #555;
        }

        .write-icon,
        .logout-icon {
          font-size: 0.8rem;
        }

        .mobile-menu-toggle {
          display: none;
          cursor: pointer;
          font-size: 1.25rem;
          color: #555;
        }

        @media (max-width: 992px) {
          .category-links {
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block;
          }

          .navbar-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-left: 0;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease-in-out;
          }

          .navbar-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .category-links {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            margin-bottom: 1rem;
            gap: 0.5rem;
          }

          .auth-links {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            gap: 0.5rem;
          }

          .user-info,
          .logout-button,
          .login-button,
          .write-button {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;