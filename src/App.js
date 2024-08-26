import React, { useEffect, useState } from 'react';
import TableComponent from './components/TableComponent';
import './App.css';


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/testdata'); // Replace with your API endpoint
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="page-title">Evaluation Results</h1>
      <div>
        <TableComponent data={data} />
      </div>
    </div>
  );
};

export default App;
