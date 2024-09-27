import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage({error}) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Navigate back to the homepage or some other route
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Error connecting to the server</h1>
      <p style={styles.message}>
        It seems there was an issue retrieving the data. Please try again later. {error}
      </p>
      <button style={styles.button} onClick={handleGoBack}>
        Go Back to Home
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#f5c6cb',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default ErrorPage;
