import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import './Table.css'; // Import the custom CSS

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
    <div className={`container mt-5`}>
      <div className="d-flex justify-content-between mb-4">
        <h1 className="text-center">Evaluated Results</h1>
      </div>
      <Table striped bordered hover responsive className="custom-table">
        <thead>
          <tr>
            {/* Display selected columns first */}
            <th>No.</th>
            <th>Sector</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Question_tokens</th>
            <th>Answer_tokens</th>
            {/* Followed by the rest of the keys in GPT-3.5 results */}
            {data[0] && Object.keys(data[0]).filter(key => !['_id', 'Sector', 'Question', 'Answer', 'Question_tokens', 'Answer_tokens'].includes(key) && !key.includes('GPT4')).map((key) => (
              <th key={key}>{key}</th>
            ))}
            {/* Then the GPT-4 specific keys */}
            {data[0] && Object.keys(data[0]).filter(key => key.includes('GPT4')).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {/* Display the selected columns first */}
              <td>{index+1}</td>
              <td>{row.Sector}</td>
              <td>{row.Question}</td>
              <td>{row.Answer}</td>
              <td>{row.Question_tokens}</td>
              <td>{row.Answer_tokens}</td>
              {/* Followed by the rest of the values in GPT-3.5 results */}
              {Object.entries(row).filter(([key]) => !['_id', 'Sector', 'Question', 'Answer', 'Question_tokens', 'Answer_tokens'].includes(key) && !key.includes('GPT4')).map(([key, value], idx) => (
                <td key={idx}>
                  {key.includes('ROUGE') ? formatRougeValues(value) : Array.isArray(value) ? value.join(', ') : value}
                </td>
              ))}
              {/* Then the GPT-4 specific values */}
              {Object.entries(row).filter(([key]) => key.includes('GPT4')).map(([key, value], idx) => (
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
