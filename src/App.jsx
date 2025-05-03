import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ConfirmList from './components/Admin/ConfirmList';
import RoomList from './components/Admin/RoomList';
import AdminPage from './pages/Adminpage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StudentPage from './pages/StudentPage';

// Protected Route component for admin
const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');

  if (!user || user.type !== 'admin') {
    return <Navigate to="/login/admin" />;
  }

  return children;
};

// Protected Route component for student
const ProtectedStudentRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');

  if (!user || user.type !== 'student') {
    return <Navigate to="/login/student" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login/:userType" element={<LoginPage />} />

        {/* Protected student routes */}
        <Route
          path="/student"
          element={
            <ProtectedStudentRoute>
              <StudentPage />
            </ProtectedStudentRoute>
          }
        />

        {/* Protected admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        >
          <Route path="confirm-list" element={<ConfirmList />} />
          <Route path="room-list" element={<RoomList />} />
        </Route>

        {/* Redirect /admin to /admin/confirm-list */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/confirm-list" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
