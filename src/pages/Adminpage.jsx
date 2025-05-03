import React from 'react';
import Sidebar from '../components/Admin/Sidebar';
import Header from '../components/Admin/Header';
import '../styles/Adminpage.css';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Đăng xuất');
    navigate('/'); // ← điều hướng về trang chủ
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <Header onLogout={handleLogout} /> {/* Truyền props */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
