import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/Admin/Header.css'; // dùng lại CSS

const HeaderStudent = ({ onLogout }) => {
  return (
    <header className="header">
      <div className="menu-icon">
        <i className="fas fa-bars"></i>
      </div>

      <div className="header-right">
        <img
          src="/images/logo-bach-khoa-dongphucsongphu2.png"
          alt="BK logo"
          className="admin-logo"
        />
        <span className="username">STUDENT</span>
        <button className="logout-button" onClick={onLogout}>
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default HeaderStudent;
