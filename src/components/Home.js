import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // Import Spinner from React Bootstrap

function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePreprocessDataClick = async () => {
    setLoading(true);
    setError(''); // Clear any previous error

    fetch('http://127.0.0.1:5000/api/generateLLMResponse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frontEndRequest: "False" }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          setError(result.error); // Set error message if the response contains an error
        } else {
          setData(result); // Set the result data if successful
          navigate('/preprocess-data', { state: { resultData: result } }); // Navigate and pass data to the next page
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to preprocess data. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const handleStartEvaluationClick = async () => {
    setLoading(true);
    setError(''); // Clear any previous error

    fetch('http://127.0.0.1:5000/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frontEndRequest: "False" }),      
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          setError(result.error); // Set error message if the response contains an error
        } else {
          console.log('Evaluation Results:', result); // Log the results to the console
          setSuccess('Evaluation Complete. View Evaluation Results');
        }
      })
      .catch((error) => {
        console.error('Error fetching evaluation data:', error);
        setError('Failed to evaluate responses. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>LLM Eval Prototype</h1>
      <p style={styles.subtitle}>Choose an option to proceed</p>

      <div style={styles.testEvalSection}>
        <div style={styles.cardContainer}>
          <div style={styles.card} onClick={() => navigate('/test-eval')}>
            <i className="fas fa-bolt" style={styles.icon}></i>
            <h2 style={styles.cardTitle}>Run Single Evaluation</h2>
            <p style={styles.cardDescription}>Run tests to evaluate LLM responses.</p>
          </div>
        </div>
      </div>

      <h2 style={styles.midortitle}>OR</h2>

      <div style={styles.cardContainer}>
        <div style={styles.card} onClick={() => navigate('/upload-dataset')}>
          <i className="fas fa-upload" style={styles.icon}></i>
          <h2 style={styles.cardTitle}>Upload Dataset</h2>
          <p style={styles.cardDescription}>Upload new question & answers dataset using an Excel file.</p>
        </div>

        {/* Preprocess Data Card */}
        <div
          style={styles.card}
          onClick={handlePreprocessDataClick}
        >
          <i className="fas fa-cogs" style={styles.icon}></i>
          <h2 style={styles.cardTitle}>Generate LLM Responses</h2>
          <p style={styles.cardDescription}>Process data and generate LLM responses.</p>
        </div>

        {/* Start Evaluating Card */}
        <div style={styles.card} onClick={handleStartEvaluationClick}>
          <i className="fas fa-play" style={styles.icon}></i>
          <h2 style={styles.cardTitle}>Start Evaluating</h2>
          <p style={styles.cardDescription}>Start evaluating the generated responses.</p>
        </div>

        <div style={styles.card} onClick={() => navigate('/evaluation-results')}>
          <i className="fas fa-poll" style={styles.icon}></i>
          <h2 style={styles.cardTitle}>Evaluation Results</h2>
          <p style={styles.cardDescription}>See the results of the evaluation.</p>
        </div>
      </div>

      {/* Display loading spinner or error message if needed */}
      {loading && (
        <div style={styles.loadingContainer}>
          <Spinner animation="border" style={styles.spinner} />
          <p style={styles.loadingText}>Loading...</p>
        </div>
      )}
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '20px',
  },
  title: {
    fontSize: '36px',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '40px',
    color: '#666',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    width: '100%',
  },
  testEvalSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px',
    marginBottom: '40px',
    width: '100%',
    textAlign: 'center',
  },
  midortitle: {
    fontSize: '28px',
    marginBottom: '40px',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '30px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '40px',
    color: '#4CAF50',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
  spinner: {
    marginRight: '10px',
    color: '#4CAF50',
  },
  loadingText: {
    fontSize: '18px',
    color: '#333',
  },
  error: {
    color: 'white',
    backgroundColor: 'red',
    padding: '10px 20px',
    borderRadius: '5px',
    margin: '20px 0',
    fontSize: '16px',
    textAlign: 'center',
    width: '80%', // Responsive width
    maxWidth: '400px', // Max width for the error message
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
  },
  success: {
    color: 'white',
    backgroundColor: 'green',
    padding: '10px 20px',
    borderRadius: '5px',
    margin: '20px 0',
    fontSize: '16px',
    textAlign: 'center',
    width: '80%', // Responsive width
    maxWidth: '400px', // Max width for the error message
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
  }
};

export default HomePage;
