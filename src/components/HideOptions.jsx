import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FormControlLabel, Switch } from "@mui/material";
import "../style/hide.css";

const HideOptions = ({
  isOpen,
  onClose,
  onApplyHideColumns,
  onShowAllColumns,
}) => {
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleCheckboxChange = (field) => {
    setSelectedColumns((prev) =>
      prev.includes(field)
        ? prev.filter((col) => col !== field)
        : [...prev, field]
    );
  };

  const handleApply = () => {
    onApplyHideColumns(selectedColumns);
  };

  const handleShowAll = () => {
    setSelectedColumns([]);
    onShowAllColumns();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h3>Show / Hide Columns</h3>
        <p id="closeID">
          <IoClose size={30} onClick={onClose} />
        </p>
      </div>
      <div className="sort-options">
        {[
          { label: "ID", field: "id" },
          { label: "Name", field: "name" },
          { label: "Category", field: "category" },
          { label: "Subcategory", field: "subcategory" },
          { label: "CreatedAt", field: "createdAt" },
          { label: "UpdatedAt", field: "updatedAt" },
          { label: "Price", field: "price" },
          { label: "Sale Price", field: "sale_price" },
        ].map(({ label, field }) => (
          <FormControlLabel
            value="start"
            control={
              <Switch
                checked={!selectedColumns.includes(field)}
                onChange={() => handleCheckboxChange(field)}
              />
            }
            label={label}
            labelPlacement="start"
          />
        ))}
      </div>
      <div className="actions">
        <button onClick={handleShowAll} id="btn1">
          Show All Columns
        </button>
        <button onClick={handleApply} id="btn2">
          Apply
        </button>
      </div>
    </div>
  );
};

export default HideOptions;
