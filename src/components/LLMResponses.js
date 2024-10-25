import React from 'react';
import { useLocation } from 'react-router-dom';

function LLMResponses() {
  const location = useLocation();
  const resultData = location.state?.resultData || []; // Get data passed from navigation

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>LLM Responses</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Question</th>
            <th style={styles.th}>GPT-3.5 Response</th>
            <th style={styles.th}>GPT-4 Response</th>
          </tr>
        </thead>
        <tbody>
          {resultData.map((row, index) => (
            <tr key={index} style={styles.tr}>
              <td style={styles.td}>{row.Question}</td>
              <td style={styles.td}>{row.gpt3_5_response}</td>
              <td style={styles.td}>{row.gpt_4_response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    overflowX: 'auto',
  },
  th: {
    border: '1px solid #ddd',
    padding: '12px 15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  td: {
    border: '1px solid #ddd',
    padding: '12px 15px',
    textAlign: 'left',
    fontSize: '14px',
    color: '#333',
  },
  tr: {
    transition: 'background-color 0.3s',
  },
};

export default LLMResponses;
