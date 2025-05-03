import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="logo-container">
        <img src="/images/HCMUT_official_logo.png" alt="HCMUT Logo" className="logo" />
      </div>
      
      <div className="auth-options">
        <Link to="/login/admin" className="auth-option">
          <div className="auth-icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="auth-label">Admin</div>
        </Link>
        
        <Link to="/login/student" className="auth-option">
          <div className="auth-icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="auth-label">Student</div>
        </Link>
        
        <Link to="/login/google" className="auth-option">
          <div className="auth-icon">
            <i className="fab fa-google"></i>
          </div>
          <div className="auth-label">Google</div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 