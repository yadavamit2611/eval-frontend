import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TableComponent from './components/TableComponent';
import DetailComponent from './components/DetailComponent';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetching data
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/data'); // API endpoint
      const result = await response.json();
      console.log(result);
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TableComponent data={data} />} />
        <Route path="/details/:id" element={<DetailComponent data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;
