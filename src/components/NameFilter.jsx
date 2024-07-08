import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, setSearchTerm } from "../slice/dataSlice.js";
import "../style/sort.css";

const NameFilter = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="name-filter">
      <label htmlFor="nameFilter">Name Filter</label>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="search-input"
      />
    </div>
  );
};

export default NameFilter;
