import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar productos..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;
