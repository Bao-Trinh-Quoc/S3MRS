import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../components/Admin/Sidebar.css'; // dùng lại css của Sidebar

const SidebarStudent = ({ onMenuSelect }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  const handleMenuClick = (menu) => {
    if (onMenuSelect) {
      onMenuSelect(menu);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h1 className="logo"><span className="blue">myBK</span>/app</h1>
      </div>

      <div className="sidebar-bottom">
        <h2><img src="/images/logo-bach-khoa-dongphucsongphu2.png" alt="BK logo" className="admin-logo" /> STUDENT </h2> 
        
        <ul className="menu">
          <li onClick={() => handleMenuClick('student')}>
            <div style={{cursor: 'pointer'}}>
              <i className="fa fa-user" /> Sinh viên
            </div>
          </li>

          <li>
            <div className="submenu-toggle" onClick={() => { toggleSubmenu(); handleMenuClick('service'); }}>
              <i className="fa fa-book" /> Dịch vụ
            </div>

            {showSubmenu && (
              <ul className="submenu">
                <li onClick={() => handleMenuClick('booking-list')}>
                  <div style={{cursor: 'pointer'}}>Danh sách đặt phòng</div>
                </li>
                <li onClick={() => handleMenuClick('room-list')}>
                  <div style={{cursor: 'pointer'}}>Trạng thái phòng học</div>
                </li>
              </ul>
            )}
          </li>

          <li onClick={() => handleMenuClick('contact')}>
            <Link to="/lien-he"><i className="fa fa-envelope" /> Liên hệ</Link>
          </li>
          <li onClick={() => handleMenuClick('document')}>
            <Link to="/tai-lieu"><i className="fa fa-file" /> Tài liệu</Link>
          </li>
        </ul>
        <p>© 2025</p>
      </div>
    </div>
  );
};

export default SidebarStudent;
