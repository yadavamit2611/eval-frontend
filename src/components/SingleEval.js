import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SingleEval() {
  const [question, setQuestion] = useState('');
  const [idealAnswer, setIdealAnswer] = useState('');
  const [responseType, setResponseType] = useState('llm'); // 'llm' or 'own'
  const [selectedModel, setSelectedModel] = useState('gpt-3.5');
  const [userResponse, setUserResponse] = useState('');
  const [evaluationResults, setEvaluationResults] = useState(null);
  const navigate = useNavigate();


  // Placeholder for submitting and fetching evaluation data
  const handleEvaluate = () => {
    const requestData = {
      question,
      idealAnswer,
      responseType,
      model: selectedModel,
      userResponse: responseType === 'own' ? userResponse : null,
    };

    // Simulate a backend request and response
    // Here you would send `requestData` to your backend and fetch the evaluation results
    setEvaluationResults({
      metric1: { gpt3_5: '85%', gpt4: '90%' },
      metric2: { gpt3_5: '80%', gpt4: '88%' },
      metric3: { gpt3_5: '78%', gpt4: '85%' },
    });
  };

  return (
    <div style={styles.container}>
        <div style={styles.evalone}>
            <h1 style={styles.title}>EVALONE</h1>
        </div>
      <div style={styles.form}>
        {/* Question Input */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Question:</label>
          <textarea
            style={styles.textarea}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the question..."
          />
        </div>

        {/* Ideal Answer Input */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Ideal Answer:</label>
          <textarea
            style={styles.textarea}
            value={idealAnswer}
            onChange={(e) => setIdealAnswer(e.target.value)}
            placeholder="Enter the ideal answer..."
          />
        </div>

        {/* Choose Response Type */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Response Type:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                value="llm"
                checked={responseType === 'llm'}
                onChange={() => setResponseType('llm')}
              />{' '}
              Generate from LLM
            </label>
            <label>
              <input
                type="radio"
                value="own"
                checked={responseType === 'own'}
                onChange={() => setResponseType('own')}
              />{' '}
              Provide your own response
            </label>
          </div>
        </div>

        {/* If responseType is LLM, choose model */}
        {responseType === 'llm' && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>Choose Model:</label>
            <select
              style={styles.select}
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="gpt-3.5">GPT-3.5</option>
              <option value="gpt-4">GPT-4</option>
            </select>
          </div>
        )}

        {/* If responseType is own, show user response input */}
        {responseType === 'own' && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>Your Response:</label>
            <textarea
              style={styles.textarea}
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Enter your response..."
            />
          </div>
        )}

        {/* Evaluate Button */}
        <button style={styles.button} onClick={handleEvaluate}>
          Evaluate
        </button>

        {/* Evaluation Results */}
        {evaluationResults && (
          <div style={styles.resultsContainer}>
            <h2 style={styles.resultsTitle}>Evaluation Results</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>GPT-3.5</th>
                  <th>GPT-4</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(evaluationResults).map((metric) => (
                  <tr key={metric}>
                    <td>{metric}</td>
                    <td>{evaluationResults[metric].gpt3_5}</td>
                    <td>{evaluationResults[metric].gpt4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
        <button onClick={() => navigate('/')} style={styles.backButton}>
                Go back
        </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
/*     padding: '20px', */
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
  },
  title: {
    fontSize: '30px',
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  evalone: {
    backgroundColor: '#4CAF50',
    width: '10%',
    marginBottom: '20px',
    borderRadius: '0px 0px 10px 10px',
    padding: '5px',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    color: '#333',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  radioGroup: {
    display: 'flex',
    gap: '10px',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  backButton: {
    width: '10%',
    marginTop: '40px',
    padding: '10px',
    backgroundColor: '#06402B',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  buttonDisabled: {
    backgroundColor: '#ddd',
    cursor: 'not-allowed',
  },
  resultsContainer: {
    marginTop: '40px',
  },
  resultsTitle: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '10px',
    backgroundColor: '#f0f4f8',
    border: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
  },
};

export default SingleEval;
