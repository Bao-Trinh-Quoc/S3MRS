import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import CSS

const Sidebar = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h1 className="logo"><span className="blue">myBK</span>/app</h1>
      </div>

      <div className="sidebar-bottom">
      <h2><img src="/images/logo-bach-khoa-dongphucsongphu2.png" alt="BK logo" className="admin-logo" /> ADMIN  </h2> 
      
        <ul className="menu">
          <li>
            <Link to="/teacher"><i className="fa fa-user" /> Giáo viên</Link>
          </li>

          <li>
            <div className="submenu-toggle" onClick={toggleSubmenu}>
              <i className="fa fa-book" /> Dịch vụ
            </div>

            {showSubmenu && (
              <ul className="submenu">
                <li>
                  <Link to="/admin/confirm-list">Danh sách đăng ký mới</Link>
                </li>
                <li>
                  <Link to="/admin/room-list">Trạng thái phòng học</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/lien-he"><i className="fa fa-envelope" /> Liên hệ</Link>
          </li>
          <li>
            <Link to="/tai-lieu"><i className="fa fa-file" /> Tài liệu</Link>
          </li>
        </ul>
        <p>© 2025</p>
      </div>
    </div>
  );
};
export default Sidebar;