import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentPage.css';
import SidebarStudent from '../components/Student/SidebarStudent';
import HeaderStudent from '../components/Student/HeaderStudent';
import SearchForm from '../components/Student/SearchForm';
import RoomList from '../components/Student/RoomList';
import BookingList from '../components/Student/BookingList';
import StudentList from '../components/Student/StudentList';
import StudentDetail from '../components/Student/StudentDetail';

const API_BASE = 'http://localhost:5000';

const StudentPage = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    capacity: '',
    equipment: '',
    time: '',
  });
  const [selectedMenu, setSelectedMenu] = useState('booking-list');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
    if (!storedUser || storedUser.role !== 'student') {
      navigate('/login/student');
    } else {
      setStudentId(storedUser.studentId);
    }
  }, [navigate]);

  // Fetch rooms and bookings from API
  useEffect(() => {
    fetch(`${API_BASE}/rooms`)
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error('Error loading rooms:', err));

    fetch(`${API_BASE}/bookings`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error('Error loading bookings:', err));
  }, []);

  const handleSearchChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    alert('Chức năng tìm kiếm sẽ được triển khai');
  };

  const filteredRooms = rooms.filter(room => {
    return (
      (searchCriteria.capacity === '' || room.capacity >= parseInt(searchCriteria.capacity)) &&
      (searchCriteria.equipment === '' || room.equipment.toLowerCase().includes(searchCriteria.equipment.toLowerCase()))
    );
  });

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleBooking = async () => {
    if (!selectedRoom || !searchCriteria.time) {
      alert('Vui lòng chọn phòng và thời gian đặt phòng');
      return;
    }

    const isConflict = bookings.some(
      (b) => b.roomName === selectedRoom.name && b.time === searchCriteria.time
    );

    if (isConflict) {
      alert('Phòng đã được đặt vào thời gian này. Vui lòng chọn thời gian khác.');
      return;
    }

    const newBooking = {
      studentId: studentId,
      roomName: selectedRoom.name,
      time: searchCriteria.time,
      confirmed: false,
      rejected: false
    };

    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      });

      if (response.ok) {
        const createdBooking = await response.json();
        setBookings([...bookings, createdBooking]);
        alert(`Đặt phòng thành công cho phòng ${selectedRoom.name} vào lúc ${searchCriteria.time}`);
        setSelectedRoom(null);
        setSearchCriteria({ capacity: '', equipment: '', time: '' });
      } else {
        alert('Lỗi khi đặt phòng.');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      alert('Đặt phòng thất bại.');
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    navigate('/'); // Quay về trang chủ
  };
  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  const studentBookings = bookings.filter(b => b.studentId === studentId);

  return (
    <div className="admin-container">
      <SidebarStudent onMenuSelect={handleMenuSelect} />
      <HeaderStudent onLogout={handleLogout} />
      <div className="main-content">
        <div className="student-page">
          {selectedMenu === 'booking-list' && <h1>Danh sách đặt phòng</h1>}
          {selectedMenu === 'room-list' && <h1>Trạng thái phòng học</h1>}
          {selectedMenu === 'student' && <h1>Danh sách sinh viên</h1>}

          {selectedMenu === 'booking-list' && (
            <BookingList bookings={studentBookings} />
          )}

          {selectedMenu === 'room-list' && (
            <>
              <SearchForm
                searchCriteria={searchCriteria}
                onSearchChange={handleSearchChange}
                onSearch={handleSearch}
              />

              <RoomList
                rooms={filteredRooms}
                selectedRoom={selectedRoom}
                onRoomSelect={handleRoomSelect}
              />

              {selectedRoom && (
                <section>
                  <h2>Đặt phòng: {selectedRoom.name}</h2>
                  <button onClick={handleBooking}>Xác nhận đặt phòng</button>
                </section>
              )}
            </>
          )}

          {selectedMenu === 'student' && (
            <div>
              <StudentList onSelectStudent={handleStudentSelect} />
              <StudentDetail student={selectedStudent} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
