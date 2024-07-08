
import { createSelector } from 'reselect';

const selectData = (state) => state.data.filteredData;

export const selectCategoryCounts = createSelector([selectData], (filteredData) => {
  return filteredData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
});
