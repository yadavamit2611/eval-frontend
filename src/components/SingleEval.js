import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Modal component for displaying evaluation results
const Modal = ({ showModal, handleClose, children }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button onClick={handleClose} style={modalStyles.closeButton}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

function SingleEval() {
  const [question, setQuestion] = useState('');
  const [idealAnswer, setIdealAnswer] = useState('');
  const [responseType, setResponseType] = useState('llm');
  const [selectedModel, setSelectedModel] = useState('Llama 3.2');
  const [userResponse, setUserResponse] = useState('');
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [llmResponse, setLlmResponse] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to track modal visibility
  const navigate = useNavigate();

  const getLLMResponse = async () => {
    if (responseType === 'llm') {
      try {
        if(question === null || question.trim() === ''){
            throw new Error('Question cannot be empty.');
        }else if(idealAnswer === null || idealAnswer.trim() === ''){
            throw new Error('Ideal Answer cannot be empty.');
        }        
        const body = {
          model: selectedModel,
          messages: [
            { role: 'system', content: 'Please provide concise answers to the questions provided' },
            { role: 'user', content: `Claim: ${question}` },
          ],
          temperature: 0.7,
        };

        const response = await fetch('http://localhost:1234/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        const llmScore = data.choices[0].message.content;
        setLlmResponse(llmScore); // Store LLM response
      } catch (error) {
        console.error('Error fetching LLM response:', error);
        setLlmResponse('Error fetching LLM response ' + error);
      }
    }
  };

  const handleEvaluate = async () => {
    try {
      if (responseType === 'own' && (userResponse == null || userResponse.trim() === '')) {
        throw new Error('Your response cannot be empty.');
      } else if (responseType === 'llm' && (llmResponse == null || llmResponse.trim() === '')) {
        throw new Error('The LLM response cannot be empty.');
      }else if(question === null || question.trim() === ''){
        throw new Error('Question cannot be empty.');
      }else if(idealAnswer === null || idealAnswer.trim() === ''){
        throw new Error('Ideal Answer cannot be empty.');
      }

      const requestBody = {
        question: question,
        ideal_answer: idealAnswer,
        llm_response: responseType === 'own' ? userResponse : llmResponse,
      };

      const response = await fetch('http://127.0.0.1:5000/api/evalOne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setEvaluationResults(data); // Set the evaluation results to the state
      setShowModal(true); // Open the modal after evaluation
    } catch (error) {
      console.error('Error Fetching Evaluation Results:', error);
      setEvaluationResults('Error Fetching Evaluation Results');
      setShowModal(true); // Still show modal with error message
    }
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
              <option value="hugging-quants/Llama-3.2-1B-Instruct-Q8_0-GGUF/llama-3.2-1b-instruct-q8_0.gguf">
                Llama 3.2
              </option>
              <option value="gpt-3.5">GPT-3.5</option>
              <option value="gpt-4">GPT-4</option>
            </select>
          </div>
        )}

        {responseType === 'llm' && (
          <button style={styles.button} onClick={getLLMResponse}>
            Get LLM Response
          </button>
        )}
        {responseType === 'llm' && llmResponse && (
          <div style={styles.resultsContainer}>
            <h2 style={styles.resultsTitle}>{selectedModel} Response</h2>
            <p style={styles.llmResponse}>{llmResponse}</p>
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

        {/* Modal for Evaluation Results */}
        <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
          {evaluationResults && (
            <div style={styles.resultsContainer}>
              <h2 style={styles.resultsTitle}>Evaluation Results</h2>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td style={styles.metricLabel}><strong>Question:</strong></td>
                      <td style={styles.metricValue}>{evaluationResults.question}</td>
                    </tr>
                    <tr>
                      <td style={styles.metricLabel}><strong>Ideal Answer:</strong></td>
                      <td style={styles.metricValue}>{evaluationResults.ideal_answer}</td>
                    </tr>
                    <tr>
                      <td style={styles.metricLabel}><strong>LLM Hypothesis:</strong></td>
                      <td style={styles.metricValue}>{evaluationResults['llm-results'].hypothesis}</td>
                    </tr>
                    <tr>
                      <td style={styles.metricLabel}><strong>BLEU Score:</strong></td>
                      <td style={styles.metricValue}>{evaluationResults['llm-results'].bleu}</td>
                    </tr>
                    <tr>
                      <td style={styles.metricLabel}><strong>METEOR Score:</strong></td>
                      <td style={styles.metricValue}>{evaluationResults['llm-results'].meteor}</td>
                    </tr>
                    <tr>
                      <td style={styles.metricLabel}><strong>ROUGE-1:</strong></td>
                      <td style={styles.metricValue}>{evaluationResults['llm-results'].rouge.rouge1[2]}</td>
                    </tr>
                    <tr>
                      <td style={styles.metricLabel}><strong>ROUGE-2:</strong></td>
                      <td style={styles.metricValue}>{evaluationResults['llm-results'].rouge.rouge2[2]}</td>
                    </tr>
                    <tr>
                      <td style={styles.metricLabel}><strong>ROUGE-L:</strong></td>
                      <td style={styles.metricValue}>{evaluationResults['llm-results'].rouge.rougeL[2]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Modal>

        <button style={styles.button} onClick={() => navigate('/')}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

// Modal styles
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '18px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
};

// Main page styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'left',
  },
  evalone: {
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  label: {
    marginBottom: '5px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
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
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '10px',
  },
  resultsContainer: {
    marginTop: '20px',
    textAlign: 'left',
  },
  resultsTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  metricLabel: {
    padding: '8px',
    border: '1px solid #ccc',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  metricValue: {
    padding: '8px',
    border: '1px solid #ccc',
  },
  llmResponse: {
    whiteSpace: 'pre-wrap',
  },
};

export default SingleEval;
