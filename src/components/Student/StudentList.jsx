import React, { useState, useEffect } from 'react';

const StudentList = ({ onSelectStudent }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Giả lập dữ liệu sinh viên
    const mockStudents = [
      { id: 1, name: 'John Doe', age: 20 },
      { id: 2, name: 'Jane Smith', age: 22 },
      { id: 3, name: 'Alice Johnson', age: 21 },
    ];
    setStudents(mockStudents);
  }, []);

  return (
    <section className="student-list" style={{ marginBottom: '20px' }}>
      <h2>Danh sách sinh viên</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {students.map(student => (
          <li
            key={student.id}
            onClick={() => onSelectStudent(student)}
            style={{
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            {student.name} - Tuổi: {student.age}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StudentList;
