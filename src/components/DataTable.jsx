import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  setSearchTerm,
  setSortField,
  setPage,
  toggleSidebar,
} from "../slice/dataSlice.js";
import { BiSortAlt2, BiSolidHide } from "react-icons/bi";
import { CgSortAz } from "react-icons/cg";
import { FaLayerGroup } from "react-icons/fa6";
import HideOptions from "./HideOptions.jsx";
import "../style/dataTable.css";
import Sorting from "./Sorting.jsx";
import formatDate from "./Date.js";
import DateSort from "./DateSort.jsx";
import CategorySort from "./CategorySort.jsx";
const DataTable = () => {
  const dispatch = useDispatch();
  const { filteredData, searchTerm, currentPage, itemsPerPage, isSidebarOpen } =
    useSelector((state) => state.data);

  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isSortingTime, setIsSortingTime] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleApplyHideColumns = (columns) => {
    setHiddenColumns(columns);
  };

  const handleShowAllColumns = () => {
    setHiddenColumns([]);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "subcategory", label: "Subcategory" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
    { key: "price", label: "Price" },
    { key: "sale_price", label: "Sale Price" },
  ];

  return (
    <div className="datatable-container">
      <HideOptions
        isOpen={isSidebarOpen}
        onClose={() => dispatch(toggleSidebar())}
        onSortChange={(field) => dispatch(setSortField(field))}
        onApplyHideColumns={handleApplyHideColumns}
        onShowAllColumns={handleShowAllColumns}
      />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="search-input"
        />
        <span className="icons">
          <BiSolidHide size={30} onClick={() => dispatch(toggleSidebar())} />
        </span>
        <span className="icons">
          <BiSortAlt2 size={30} onClick={() => setIsSortingOpen(true)} />
          <Sorting
            isOpen={isSortingOpen}
            onClose={() => setIsSortingOpen(false)}
          />
        </span>
        <span className="icons">
          <CgSortAz size={30} onClick={() => setIsSortingTime(true)} />
          <DateSort
            isOpen={isSortingTime}
            onClose={() => setIsSortingTime(false)}
          />
        </span>
        <span className="icons">
          <FaLayerGroup size={30} onClick={() => setIsCategoryOpen(true)} />
          <CategorySort
            isOpen={isCategoryOpen}
            onClose={() => setIsCategoryOpen(false)}
          />
        </span>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {columns.map(
              (column) =>
                !hiddenColumns.includes(column.key) && (
                  <th
                    key={column.key}
                    onClick={() => dispatch(setSortField(column.key))}
                  >
                    {column.label} <BiSortAlt2 size={18} />
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              {!hiddenColumns.includes("id") && <td>{item.id}</td>}
              {!hiddenColumns.includes("name") && <td>{item.name}</td>}
              {!hiddenColumns.includes("category") && <td>{item.category}</td>}
              {!hiddenColumns.includes("subcategory") && (
                <td>{item.subcategory}</td>
              )}
              {!hiddenColumns.includes("createdAt") && (
                <td>{formatDate(item.createdAt)}</td>
              )}
              {!hiddenColumns.includes("updatedAt") && (
                <td>{formatDate(item.updatedAt)}</td>
              )}
              {!hiddenColumns.includes("price") && <td>{item.price}</td>}
              {!hiddenColumns.includes("sale_price") && (
                <td>{item.sale_price}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({
          length: Math.ceil(filteredData.length / itemsPerPage),
        }).map((_, index) => (
          <button key={index} onClick={() => dispatch(setPage(index + 1))}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
