import React from 'react';

const SearchFilter = ({ searchTerm, onSearchChange, selectedType, onTypeChange, types }) => (
  <div className="row mb-4">
    <div className="col-md-6">
      <input
        type="text"
        className="form-control"
        placeholder="Cari Pokemon..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
    <div className="col-md-4">
      <select
        className="form-select"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="">Semua Tipe</option>
        {types.map(type => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
    <div className="col-md-2">
      <button
        className="btn btn-outline-secondary w-100"
        onClick={() => {
          onSearchChange('');
          onTypeChange('');
        }}
      >
        Reset
      </button>
    </div>
  </div>
);

export default SearchFilter;