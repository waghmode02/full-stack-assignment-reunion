import React from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setSortField } from "../slice/dataSlice.js";
import "../style/sort.css";
import { clearSort } from "../slice/dataSlice.js";
import { BiSortAlt2 } from "react-icons/bi";
const Sorting = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleSort = (field) => {
    dispatch(setSortField(field));
  };
  const handleClearSort = () => {
    dispatch(clearSort());
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h3>Options</h3>
        <p id="closeId">
          <IoClose size={30} onClick={onClose} />
        </p>
      </div>
      <div className="sortOp">
        <h4>Sort Options</h4>

        <div className="sortID" onClick={() => handleSort("id")}>
          ID <BiSortAlt2 size={20} />
        </div>
        <div className="sortID" onClick={() => handleSort("name")}>
          Name <BiSortAlt2 size={20} />
        </div>
        <div className="sortID" onClick={() => handleSort("category")}>
          Category <BiSortAlt2 size={20} />
        </div>
        <div className="sortID" onClick={() => handleSort("subcategory")}>
          Subcategory <BiSortAlt2 size={20} />
        </div>
        <div className="sortID" onClick={() => handleSort("createdAt")}>
          Created At <BiSortAlt2 size={20} />
        </div>
        <div className="sortID" onClick={() => handleSort("updatedAt")}>
          Updated At <BiSortAlt2 size={20} />
        </div>
        <div className="sortID" onClick={() => handleSort("price")}>
          Price <BiSortAlt2 size={20} />
        </div>
        <div className="sortID" onClick={() => handleSort("sale_price")}>
          Sale Price <BiSortAlt2 size={20} />
        </div>
        <button id="clearBtn" onClick={handleClearSort}>
          Clear Sort
        </button>
      </div>
    </div>
  );
};

export default Sorting;
