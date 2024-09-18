import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="Search health records"
      className="border border-gray-300 p-2 rounded w-full"
    />
  );
};

export default SearchBar;
