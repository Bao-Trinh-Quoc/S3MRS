import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import users from '../data/users.json';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { userType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // If userType is google, redirect to Google's auth page
    if (userType === 'google') {
      window.location.href = 'https://accounts.google.com';
    }
  }, [userType]);

  // If it's a Google login, don't render the login form
  if (userType === 'google') {
    return (
      <div className="login-container">
        <div className="login-header">
          <img src="/images/HCMUT_official_logo.png" alt="HCMUT Logo" className="login-logo" />
          <h1>DỊCH VỤ XÁC THỰC TẬP TRUNG</h1>
        </div>
        <div className="login-box">
          <div className="login-form">
            <h3>Redirecting to Google login...</h3>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    console.log('Login attempt:', { username, password, userType });
    console.log('Available users:', users);

    // Determine which user list to check based on userType
    const userList = userType === 'admin' ? users.admin : users.students;
    
    const user = userList.find(
      (u) => u.username === username && u.password === password
    );

    console.log('Found user:', user);

    if (user) {
      // Store user info in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify({ ...user, type: userType }));
      } else {
        sessionStorage.setItem('user', JSON.stringify({ ...user, type: userType }));
      }

      // Redirect based on user type
      if (userType === 'admin') {
        console.log('Redirecting to admin page...');
        navigate('/admin/confirm-list');
      } else if (userType === 'student') {
        navigate('/student');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
    setRememberMe(false);
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src="/images/HCMUT_official_logo.png" alt="HCMUT Logo" className="login-logo" />
        <h1>DỊCH VỤ XÁC THỰC TẬP TRUNG</h1>
      </div>

      <div className="login-box">
        <div className="login-form">
          <h3>Nhập thông tin tài khoản của bạn</h3>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên tài khoản</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                id="rememberMe"
              />
              <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-login">Đăng nhập</button>
              <button type="button" className="btn-cancel" onClick={handleClear}>Xóa</button>
            </div>

            <div className="forgot-password">
              <a href="#">Thay đổi mật khẩu?</a>
            </div>
          </form>
        </div>

        <div className="login-info">
          <div className="language-selector">
            <span style={{ color: '#0066cc', fontWeight: 'bold' }}>Ngôn ngữ</span>
            <div className="language-options">
              <a href="#">Tiếng Việt</a> | <a href="#">Tiếng Anh</a>
            </div>
          </div>

          <div className="notice">
            <h4>Lưu ý</h4>
            <p>
              Trang đăng nhập này chỉ phục vụ việc nhập mật thư điện tử/mã số trong Đại học Bách Khoa Tp.HCM.
              Đây chỉ có nghĩa là bạn chỉ đăng nhập một lần cho những hệ thống web có sử dụng hệ số hệ thống xác thực quản lý
              này của Bách Khoa.
            </p>
          </div>

          <div className="support">
            <h4>Hỗ trợ kỹ thuật</h4>
            <p>E-mail: support@hcmut.edu.vn</p>
            <p>ĐT: (84-8) 38647256 - 5200</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 