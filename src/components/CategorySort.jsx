import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import Select from 'react-select'; 
import { useDispatch, useSelector } from 'react-redux';
import '../style/sort.css';
import {
  setSortField,
  selectCategoryCounts,
  setSelectedCategories, 
} from '../slice/dataSlice'; 

import NameFilter from './NameFilter'; 

const CategorySort = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const categoryCounts = useSelector(selectCategoryCounts);
  const [selectedCategories, setSelectedCategoriesState] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  const options = Object.keys(categoryCounts).map((category) => ({
    value: category,
    label: `${category} (${categoryCounts[category]})`
  }));

  const handleCategorySelect = (selectedOptions) => {
    const categories = selectedOptions.map(option => option.value);
    setSelectedCategoriesState(categories);
  };
  const clearFilters = () => {
    setSelectedCategoriesState([]);
  };
  useEffect(() => {
    dispatch(setSelectedCategories(selectedCategories));
  }, [selectedCategories, dispatch]);

  const handleSortChange = (field) => {
    dispatch(setSortField(field));
  };
  const handleNameFilterChange = (value) => {
    setNameFilter(value);
    
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>Options</h3>
        <p id='closeId'><IoClose size={30} onClick={onClose}  /></p>
      </div>
      <NameFilter value={nameFilter} onChange={handleNameFilterChange} />
      <div className="sort-options">
        <div className="category">
        <label htmlFor="drop" >Categories:</label>
          <Select
            options={options}
            id="drop"
            isMulti
            onChange={handleCategorySelect}
            value={selectedCategories.map(category => ({ value: category, label: `${category} (${categoryCounts[category]})` }))}
          />
        </div>
      
        <button onClick={clearFilters} className="clear-button">
          Clear Filters
        </button>
        
      </div>
    </div>
  );
};

export default CategorySort;
