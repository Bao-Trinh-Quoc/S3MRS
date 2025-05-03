const RegistrationCard = ({ room, student, time, onApprove, onReject }) => (
  <div className="card">
    <h3>Phòng: {room}</h3>
    <p>{student}</p>
    <p>Thời gian: {time}</p>
    <div className="actions">
      <button className="btn btn-approve" onClick={onApprove}>Chấp thuận</button>
      <button className="btn btn-reject" onClick={onReject}>Từ chối</button>
    </div>
  </div>
);

export default RegistrationCard;
