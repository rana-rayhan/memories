import React, { useEffect, useState } from "react";

const Search = ({onSearch}) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);
  };

  useEffect(() => {
    onSearch(search);
  }, [onSearch, search]);

  return (
    <div className=" d-flex justify-content-center bg-info rounded mt-3 p-2 gap-1">
      <input
        className=" input-group border-0 rounded"
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={handleSearch}
      />
      <button className="btn btn-outline-light text-dark fw-semibold">
        Search
      </button>
    </div>
  );
};

export default Search;
