import React from 'react';

const SearchForm = ({ searchCriteria, onSearchChange, onSearch }) => {
  return (
    <section className="search-section" style={{ marginBottom: '20px' }}>
      <h2>Tìm kiếm phòng</h2>
      <label>
        Sức chứa:
        <input
          type="number"
          name="capacity"
          value={searchCriteria.capacity}
          onChange={onSearchChange}
          style={{ marginLeft: '10px', marginRight: '20px' }}
        />
      </label>
      <label>
        Trang thiết bị:
        <input
          type="text"
          name="equipment"
          value={searchCriteria.equipment}
          onChange={onSearchChange}
          style={{ marginLeft: '10px', marginRight: '20px' }}
        />
      </label>
      <label>
        Thời gian:
        <input
          type="datetime-local"
          name="time"
          value={searchCriteria.time}
          onChange={onSearchChange}
          style={{ marginLeft: '10px' }}
        />
      </label>
      <button onClick={onSearch} style={{ marginLeft: '20px' }}>
        Tìm kiếm
      </button>
    </section>
  );
};

export default SearchForm;
