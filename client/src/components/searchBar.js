
import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && query) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-md">
      <input
        type="text"
        placeholder="Search for ingredients..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-l-full border border-gray-400 focus:outline-none focus:border-green-400"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-green-700 rounded-r-full text-white hover:bg-green-600"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;
