"use client";
import { useState } from "react";

interface HeaderProps {
  onSearch: (query: { title: string; city: string }) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");

  const handleSearch = () => {
    onSearch({ title: searchQuery, city: cityQuery });
  };

  return (
    <div className="header-image flex flex-col justify-center items-center text-white p-6">
      <h1 className="text-bold text-4xl">Find What You Need</h1>
      <p className="text-xl mt-2">Search for any job you want</p>

      <div className="mt-3 w-full max-w-2xl flex flex-col sm:flex-row gap-4">
        <input type="search" placeholder="Search by Job Title..."
          className="p-3 rounded-lg border-none outline-none text-black w-full font-medium text-xl"
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        
        <input type="search" placeholder="Search by City..."  className="p-3 rounded-lg border-none outline-none text-black w-full font-medium text-xl"
          value={cityQuery} onChange={(e) => setCityQuery(e.target.value)}/>
        
        <button onClick={handleSearch}
          className="bg-teal-600 px-4 py-3 text-white font-bold rounded-lg hover:bg-teal-700 transition">
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
