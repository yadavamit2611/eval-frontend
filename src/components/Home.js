import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>LLM Eval Prototype</h1>
      <p style={styles.subtitle}>Choose an option to proceed</p>
      <div style={styles.cardContainer}>
        <div style={styles.card} onClick={() => navigate('/upload-dataset')}>
          <i className="fas fa-upload" style={styles.icon}></i>
          <h2 style={styles.cardTitle}>Upload Dataset</h2>
          <p style={styles.cardDescription}>Upload new question & answers dataset using an Excel file.</p>
        </div>

        <div style={styles.card} onClick={() => navigate('/preprocess-data')}>
          <i className="fas fa-cogs" style={styles.icon}></i>
          <h2 style={styles.cardTitle}>Preprocess Data</h2>
          <p style={styles.cardDescription}>Preprocess data and generate LLM responses.</p>
        </div>

        <div style={styles.card} onClick={() => navigate('/view-results')}>
          <i className="fas fa-chart-bar" style={styles.icon}></i>
          <h2 style={styles.cardTitle}>View Results</h2>
          <p style={styles.cardDescription}>View the generated results and insights.</p>
        </div>

        <div style={styles.card} onClick={() => navigate('/start-evaluation')}>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '30px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
  cardTitle: {
    fontSize: '24px',
    margin: '20px 0 10px',
    color: '#333',
  },
  cardDescription: {
    fontSize: '16px',
    color: '#666',
  },
  icon: {
    fontSize: '40px',
    color: '#4CAF50',
  }
};

export default HomePage;
