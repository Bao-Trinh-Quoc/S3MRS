import React from 'react';

const StudentDetail = ({ student }) => {
  if (!student) {
    return <p>Chưa chọn sinh viên</p>;
  }

  return (
    <section className="student-detail" style={{ marginBottom: '20px' }}>
      <h3>Chi tiết sinh viên</h3>
      <p>Họ tên: {student.name}</p>
      <p>Tuổi: {student.age}</p>
      <p>ID: {student.id}</p>
      {/* Thêm thông tin khác nếu cần */}
    </section>
  );
};

export default StudentDetail;
