import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailComponent.css';

const DetailComponent = ({ data }) => {
  const { id } = useParams(); // Gets the id from the URL
  const navigate = useNavigate();
  const selectedRow = data.find(row => row._id === id); // Finds the row by id

  if (!selectedRow) {
    return <div>Row not found</div>;
  }

  // Extract GPT-3.5 and GPT-4 data
  const gpt3_5Data = {
    "BLEU": selectedRow['BLEU GPT3.5'],
    "Composite Score": selectedRow['Composite Score GPT3.5'],
    "Contextual Relevance": selectedRow['Contextual Relevance GPT3.5 Response'],
    "Factual Verification": selectedRow['Factual Verification GPT3.5 Response'],
    "METEOR": selectedRow['METEOR GPT3.5'],
/*     "ROUGE": selectedRow['ROUGE GPT3.5'], */
    "Semantic Similarity": selectedRow['SemanticSimilarity GPT3.5 Response'],
    "Response Tokens": selectedRow['gpt3.5-turbo_response_tokens'],
  };

  const gpt4Data = {
    "BLEU": selectedRow['BLEU GPT4'],
    "Composite Score": selectedRow['Composite Score GPT4'],
    "Contextual Relevance": selectedRow['Contextual Relevance GPT4 Response'],
    "Factual Verification": selectedRow['Factual Verification GPT4 Response'],
    "METEOR": selectedRow['METEOR GPT4'],
/*     "ROUGE": selectedRow['ROUGE GPT4'], */
    "Semantic Similarity": selectedRow['SemanticSimilarity GPT4 Response'],
    "Response Tokens": selectedRow['gpt-4-turbo_response_tokens'],
  };

  // Function to determine the color based on comparison
  const getColorClass = (gpt3_5Value, gpt4Value) => {
    if (gpt3_5Value > gpt4Value) {
      return 'higher-value';
    } else if (gpt3_5Value < gpt4Value) {
      return 'lower-value';
    }
    return '';
  };

  return (
    <div className="detail-container">
      <h2>Comparison Card</h2>
      <div className="card">
        <div className="card-section">
          <h3>Sector</h3>
          <p>{selectedRow.Sector}</p>
        </div>
        <div className="card-section">
          <h3>Question</h3>
          <p>{selectedRow.Question}</p>
        </div>
        <div className="card-section">
          <h3>Answer</h3>
          <p>{selectedRow.Answer}</p>
        </div>
        <div className="card-section">
          <h3>Question Tokens</h3>
          <p>{selectedRow.Question_tokens}</p>
        </div>
        <div className="card-section">
          <h3>Answer Tokens</h3>
          <p>{selectedRow.Answer_tokens}</p>
        </div>
        {/* Comparison Table */}
        <div className="card-section">
          <h3 style={{display:'flex',justifyContent:'center',alignItems:'center',fontStyle:'italic'}}>GPT-3.5 vs GPT-4 Comparison</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>GPT-3.5</th>
                <th>GPT-4</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(gpt3_5Data).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td className={getColorClass(gpt3_5Data[key], gpt4Data[key])}>
                  {/* className={getColorClass(gpt4Data[key], gpt3_5Data[key])} */}
                    {Array.isArray(gpt3_5Data[key]) ? gpt3_5Data[key].join(', ') : gpt3_5Data[key]}
                  </td>
                  <td className={getColorClass(gpt4Data[key], gpt3_5Data[key])}>
                    {Array.isArray(gpt4Data[key]) ? gpt4Data[key].join(', ') : gpt4Data[key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => navigate('/')} className="back-button">
            Back to Table
        </button>
      </div>
    </div>
  );
};

export default DetailComponent;
