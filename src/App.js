import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TableComponent from './components/TableComponent';
import DetailComponent from './components/DetailComponent';
import ErrorPage from './components/ErrorPage';
import './App.css';
import HomePage from './components/Home';
import UploadDataset from './components/UploadDataset';
import SingleEval from './components/SingleEval';
import LLMResponses from './components/LLMResponses';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const updateData = (newData) => {
    setData(newData); // Function to update data state
  };

  useEffect(() => {
    // fetching data
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/data'); // API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          const result = await response.json();
          console.log(result);
          setData(result);
        }
      } catch (error) {
        // Handle the error and set error state
        setError('Failed to connect to the server');
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage updateData={updateData} />} />
        <Route path="/details/:id" element={data ? <DetailComponent data={data} /> : <ErrorPage error={error} />} />
        <Route path="/preprocess-data" element={<LLMResponses />} />
        <Route path="/evaluation-results" element={data ? <TableComponent data={data} /> : <ErrorPage error={error} />} />
        <Route path="/upload-dataset" element={<UploadDataset />} />
        <Route path="/test-eval" element={<SingleEval />} />
        <Route path="/error" element={<ErrorPage error={error} />} />
      </Routes>
    </Router>
  );
}

export default App;