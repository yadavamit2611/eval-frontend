import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  // State to control which cards are disabled
  const [isPreprocessDisabled] = useState(true);
  const [isViewResultsDisabled] = useState(true);
  const [isStartEvaluatingDisabled] = useState(true);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>LLM Eval Prototype</h1>
      <p style={styles.subtitle}>Choose an option to proceed</p>

      {/* Second Section for Test Eval */}
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

      {/* First Section */}
      <div style={styles.cardContainer}>
        {/* Upload Dataset Card (Always Enabled) */}
        <div style={styles.card} onClick={() => navigate('/upload-dataset')}>
          <i className="fas fa-upload" style={styles.icon}></i>
          <h2 style={styles.cardTitle}>Upload Dataset</h2>
          <p style={styles.cardDescription}>Upload new question & answers dataset using an Excel file.</p>
        </div>

        {/* Preprocess Data Card (Disabled) */}
        <div
          style={isPreprocessDisabled ? { ...styles.card, ...styles.disabledCard } : styles.card}
          onClick={!isPreprocessDisabled ? () => navigate('/preprocess-data') : null}
        >
          <i className="fas fa-cogs" style={isPreprocessDisabled ? styles.disabledIcon : styles.icon}></i>
          <h2 style={styles.cardTitle}>Preprocess Data</h2>
          <p style={styles.cardDescription}>Preprocess data and generate LLM responses.</p>
        </div>

        {/* View Results Card (Disabled) */}
        <div
          style={isViewResultsDisabled ? { ...styles.card, ...styles.disabledCard } : styles.card}
          onClick={!isViewResultsDisabled ? () => navigate('/view-results') : null}
        >
          <i className="fas fa-chart-bar" style={isViewResultsDisabled ? styles.disabledIcon : styles.iconstyles.icon}></i>
          <h2 style={styles.cardTitle}>View Results</h2>
          <p style={styles.cardDescription}>View the generated results and insights.</p>
        </div>

        {/* Start Evaluating Card (Disabled) */}
        <div
          style={isStartEvaluatingDisabled ? { ...styles.card, ...styles.disabledCard } : styles.card}
          onClick={!isStartEvaluatingDisabled ? () => navigate('/start-evaluation') : null}
        >
          <i className="fas fa-play" style={isStartEvaluatingDisabled ? styles.disabledIcon : styles.icon}></i>
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
  testEvalSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px',
    marginBottom: '40px', // Space between the two sections
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
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  disabledCard: {
    backgroundColor: '#e0e0e0', // Lighter background for disabled card
    color: '#999', // Text color for disabled card
    cursor: 'not-allowed', // Not-allowed cursor for disabled card
    pointerEvents: 'none', // Prevents clicks on disabled cards
    boxShadow: 'none', // Remove shadow for disabled card
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
  },
  disabledIcon: {
    fontSize: '40px',
    color: '#808080',
  }
};

export default HomePage;
