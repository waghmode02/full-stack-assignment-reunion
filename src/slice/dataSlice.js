import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get(
    "https://file.notion.so/f/f/ca71608c-1cc3-4167-857a-24da97c78717/b041832a-ec40-47bb-b112-db9eeb72f678/sample-data.json?id=ce885cf5-d90e-46f3-ab62-c3609475cfb6&table=block&spaceId=ca71608c-1cc3-4167-857a-24da97c78717&expirationTimestamp=1720519200000&signature=YoxlzVNPHD99mSWJtqt1pj23_FNvQnvmov5HDbS4jd8&downloadName=sample-data.json"
  );
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    filteredData: [],
    searchTerm: "",
    sortField: null,
    sortOrder: "asc",
    currentPage: 1,
    itemsPerPage: 10,
    isSidebarOpen: false,
    numberRangeFilter: { min: null, max: null },
    dateRangeFilter: { start: null, end: null },
    categoryCounts: {},
    selectedCategories: [],
    nameFilter: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setSortField: (state, action) => {
      const field = action.payload;
      const isDateField = ["createdAt", "updatedAt"].includes(field);

      let sortedData = [...state.filteredData];
      if (state.sortField === field) {
        sortedData.reverse();
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        sortedData.sort((a, b) => {
          let aValue = a[field];
          let bValue = b[field];

          if (isDateField) {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
          }

          if (aValue < bValue) return state.sortOrder === "asc" ? -1 : 1;
          if (aValue > bValue) return state.sortOrder === "asc" ? 1 : -1;
          return 0;
        });
        state.sortField = field;
        state.sortOrder = "asc";
      }
      state.filteredData = sortedData;
    },
    clearSort: (state) => {
      state.sortField = null;
      state.sortOrder = "asc";
      state.filteredData = [...state.data];
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setNumberRangeFilter: (state, action) => {
      const { min, max } = action.payload;
      state.numberRangeFilter = { min, max };
      applyFilters(state);
    },
    setDateRangeFilter: (state, action) => {
      const { start, end } = action.payload;
      state.dateRangeFilter = { start, end };
      applyFilters(state);
    },
    setNameFilter: (state, action) => {
      state.nameFilter = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.filteredData = action.payload;

      const categoryCounts = action.payload.reduce((counts, item) => {
        counts[item.category] = (counts[item.category] || 0) + 1;
        return counts;
      }, {});
      state.categoryCounts = categoryCounts;
    });
  },
});

function applyFilters(state) {
  state.filteredData = state.data.filter((item) => {
    const matchesSearchTerm = item.name
      .toLowerCase()
      .includes(state.searchTerm.toLowerCase());
    const matchesCategory =
      state.selectedCategories.length === 0 ||
      state.selectedCategories.includes(item.category);
    const matchesNameFilter = item.name
      .toLowerCase()
      .includes(state.nameFilter.toLowerCase());
    return matchesSearchTerm && matchesCategory && matchesNameFilter;
  });
}

export const {
  setSearchTerm,
  setSortField,
  clearSort,
  setPage,
  toggleSidebar,
  setNumberRangeFilter,
  setDateRangeFilter,
  setNameFilter,
  setSelectedCategories,
} = dataSlice.actions;

export const selectCategoryCounts = (state) => state.data.categoryCounts;

export default dataSlice.reducer;
