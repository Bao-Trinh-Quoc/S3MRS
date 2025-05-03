import React, { useState, useEffect } from 'react';
import './RoomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [editedData, setEditedData] = useState({ equipment: '', capacity: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomRes, bookingRes] = await Promise.all([
          fetch('http://localhost:5000/rooms'),
          fetch('http://localhost:5000/bookings')
        ]);

        if (!roomRes.ok || !bookingRes.ok) {
          throw new Error('Không thể lấy dữ liệu');
        }

        const roomData = await roomRes.json();
        const bookingData = await bookingRes.json();

        const updatedRooms = roomData.map(room => {
          const isBooked = bookingData.some(
            b => b.roomName === room.name && b.confirmed === true && b.rejected !== true
          );
          return {
            ...room,
            status: isBooked ? 'Đã đặt' : 'Trống'
          };
        });

        setRooms(updatedRooms);
      } catch (error) {
        console.error('Lỗi:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (room) => {
    setEditingRoom(room.id);
    setEditedData({ equipment: room.equipment || '', capacity: room.capacity || '' });
  };

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const roomToUpdate = rooms.find(r => r.id === editingRoom);
      const updatedRoom = {
        ...roomToUpdate,
        equipment: editedData.equipment,
        capacity: parseInt(editedData.capacity)
      };

      const res = await fetch(`http://localhost:5000/rooms/${editingRoom}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRoom)
      });

      if (!res.ok) throw new Error('Không thể cập nhật phòng');

      const updatedRooms = rooms.map(room =>
        room.id === editingRoom ? { ...updatedRoom, status: room.status } : room
      );
      setRooms(updatedRooms);
      setEditingRoom(null);
    } catch (error) {
      console.error('Lỗi khi lưu:', error);
    }
  };

  const handleCancel = () => {
    setEditingRoom(null);
  };

  return (
    <div>
      <h2>Danh sách phòng</h2>
      <table className="room-table">
        <thead>
          <tr>
            <th>Tên phòng</th>
            <th>Trạng thái</th>
            <th>Sức chứa</th>
            <th>Thiết bị</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.status}</td>
              <td>
                {editingRoom === room.id ? (
                  <input
                    type="number"
                    name="capacity"
                    value={editedData.capacity}
                    onChange={handleInputChange}
                  />
                ) : (
                  room.capacity
                )}
              </td>
              <td>
                {editingRoom === room.id ? (
                  <input
                    type="text"
                    name="equipment"
                    value={editedData.equipment}
                    onChange={handleInputChange}
                  />
                ) : (
                  room.equipment
                )}
              </td>
              <td>
                {editingRoom === room.id ? (
                  <>
                    <button onClick={handleSave}>Lưu</button>
                    <button onClick={handleCancel}>Hủy</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(room)}>Điều chỉnh</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;
