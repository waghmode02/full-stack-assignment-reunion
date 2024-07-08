import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDateRangeFilter } from "../slice/dataSlice";
import { IoClose } from "react-icons/io5";
import "../style/sort.css";

const DateSort = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleFilter = () => {
    dispatch(
      setDateRangeFilter({
        start: start !== "" ? start : null,
        end: end !== "" ? end : null,
      })
    );
  };

  return (
    <div className={`date-sort-container ${isOpen ? "open" : ""}`}>
      <div className="date-sort-content">
        <IoClose size={30} onClick={onClose} />
        <div>
          <label>
            Created At
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </label>
          <label>
            To
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </label>
          <button onClick={handleFilter}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default DateSort;
