// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store.js';
import DataTable from './components/DataTable.jsx';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <DataTable />
      </div>
    </Provider>
  );
};

export default App;
