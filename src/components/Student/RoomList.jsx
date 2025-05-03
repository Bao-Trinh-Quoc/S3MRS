import React from 'react';

const RoomList = ({ rooms, selectedRoom, onRoomSelect }) => {
  return (
    <section className="rooms-section" style={{ marginBottom: '20px' }}>
      <h2>Phòng có sẵn</h2>
      {rooms.length === 0 ? (
        <p>Không có phòng phù hợp</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rooms.map(room => (
            <li
              key={room.id}
              onClick={() => onRoomSelect(room)}
              style={{
                padding: '10px',
                marginBottom: '10px',
                border: selectedRoom && selectedRoom.id === room.id ? '2px solid blue' : '1px solid #ccc',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
            >
              <strong>{room.name}</strong> - Sức chứa: {room.capacity} - Trang thiết bị: {room.equipment}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RoomList;
