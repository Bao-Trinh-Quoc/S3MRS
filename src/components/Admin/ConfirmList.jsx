import React, { useEffect, useState } from 'react';
import RegistrationCard from './RegistrationCard';
import Pagination from './Pagination';
import users from '../../data/users.json';

const ConfirmList = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleReject = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmed: false, rejected: true }),
      });

      if (!response.ok) {
        throw new Error('Không thể cập nhật trạng thái');
      }

      // Cập nhật state để ẩn booking đã bị từ chối khỏi UI
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error('Lỗi khi từ chối:', error);
    }
  };

  const handleConfirm = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmed: true }),
      });

      if (!response.ok) throw new Error('Không thể cập nhật trạng thái');

      // Cập nhật lại state sau khi xác nhận để loại bỏ booking đã được xác nhận
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error('Lỗi khi xác nhận:', error);
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/bookings')
      .then((res) => {
        if (!res.ok) throw new Error('Không thể lấy dữ liệu');
        return res.json();
      })
      .then((data) => {
        // Lọc các booking có cả confirmed và rejected đều là false
        const unconfirmedAndUnrejected = data.filter(
          (b) => b.confirmed === false && b.rejected === false
        );
        setBookings(unconfirmedAndUnrejected);
      })
      .catch((err) => console.error('Lỗi khi fetch bookings:', err));
  }, []);

  // Lấy tên sinh viên từ studentId
  const getStudentName = (studentId) => {
    const student = users.students.find((s) => String(s.studentId) === String(studentId));
    return student ? student.name : 'Không rõ tên';
  };

  // Phân trang
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Danh sách cần xác nhận</h2>

      <div className="cards">
        {currentBookings.length === 0 ? (
          <p>Không có đăng ký nào</p>
        ) : (
          currentBookings.map((booking) => (
            <RegistrationCard
              key={booking.id}
              room={booking.roomName}
              student={`Sinh viên: ${getStudentName(booking.studentId)} \n MSSV: ${booking.studentId}`}
              time={booking.time}
              onApprove={() => handleConfirm(booking.id)}
              onReject={() => handleReject(booking.id)} // Xử lý từ chối
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default ConfirmList;
