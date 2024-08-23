import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import './TableComponent.css'; // Import the custom CSS

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const formatRougeValues = (rougeData) => {
    if (typeof rougeData === 'object' && rougeData !== null) {
      return (
        <div>
          {Object.entries(rougeData).map(([key, value]) => (
            <div key={key}>
              <strong>{key}: </strong>{value.join(', ')}
            </div>
          ))}
        </div>
      );
    }
    return rougeData;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Evaluated Results</h1>
      <Table striped bordered hover responsive className="custom-table">
        <thead className='thead-dark'>
          <tr>
            {data[0] && Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.entries(row).map(([key, value], idx) => (
                <td key={idx}>
                  {key.includes('ROUGE') ? formatRougeValues(value) : Array.isArray(value) ? value.join(', ') : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
