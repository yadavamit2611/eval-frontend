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
    "Response": selectedRow['gpt3_5_response'],
    "Composite Score": selectedRow['gpt3_composite_score'],
    "BLEU": selectedRow.gpt3_results?.bleu,
    "METEOR": selectedRow.gpt3_results?.meteor,
    "ROUGE": selectedRow.gpt3_results?.rouge,
    "PERPLEXITY": selectedRow.gpt3_results?.perplexity,
    "BERTSCORE": selectedRow.gpt3_results?.bert_score,
    "Factual": selectedRow.gpt3_results?.factual,
    "Semantic Similarity": selectedRow.gpt3_results?.semantic,
  };

  const gpt4Data = {
    "Response": selectedRow['gpt_4_response'],
    "Composite Score": selectedRow['gpt4_composite_score'],
    "BLEU": selectedRow.gpt4_results?.bleu,
    "METEOR": selectedRow.gpt4_results?.meteor,
    "ROUGE": selectedRow.gpt4_results?.rouge,
    "PERPLEXITY": selectedRow.gpt4_results?.perplexity,
    "BERTSCORE": selectedRow.gpt4_results?.bert_score,
    "Factual": selectedRow.gpt4_results?.factual,
    "Semantic Similarity": selectedRow.gpt4_results?.semantic,
  };

  // Function to handle displaying object-like metrics (e.g., ROUGE)
  const renderNestedMetric = (metric) => {
    if (typeof metric === 'object') {
      return (
        <div>
          {Object.keys(metric).map((key) => (
            <div key={key}>
              <strong>{key}:</strong> {metric[key].join(', ')}
            </div>
          ))}
        </div>
      );
    }
    return metric;
  };

  // Function to calculate the average of ROUGE sub-metrics
  const getRougeAverage = (rougeData) => {
    const totalValues = Object.keys(rougeData)
      .reduce((acc, key) => acc.concat(rougeData[key]), []); // Flatten all ROUGE arrays
    const sum = totalValues.reduce((sum, value) => sum + value, 0); // Sum all values
    return sum / totalValues.length; // Calculate average
  };

  // Updated getColorClass function with custom logic for ROUGE and Perplexity
  const getColorClass = (gpt3_5Value, gpt4Value, metricType) => {
    // Perplexity: closer to 0 is better
    if (metricType === 'PERPLEXITY') {
      if (gpt3_5Value < gpt4Value) {
        return 'higher-value'; // GPT-3.5 is better (closer to 0)
      } else if (gpt3_5Value > gpt4Value) {
        return 'lower-value'; // GPT-4 is better (closer to 0)
      }
      return 'equal-value';
    }

    // ROUGE: compare based on the average value
    if (metricType === 'ROUGE') {
      const gpt3_5Average = getRougeAverage(gpt3_5Value);
      const gpt4Average = getRougeAverage(gpt4Value);
      if (gpt3_5Average > gpt4Average) {
        return 'higher-value'; // GPT-3.5 has higher average ROUGE
      } else if (gpt3_5Average < gpt4Average) {
        return 'lower-value'; // GPT-4 has higher average ROUGE
      }
      return 'equal-value';
    }

    // Default comparison logic (higher is better)
    if (gpt3_5Value > gpt4Value) {
      return 'higher-value';
    } else if (gpt3_5Value < gpt4Value) {
      return 'lower-value';
    }
    return 'equal-value';
  };

  // Function to count green rows
  const countGreenRows = (gpt3_5Data, gpt4Data) => {
    let gpt3_5Wins = 0;
    let gpt4Wins = 0;

    Object.keys(gpt3_5Data).forEach((key) => {
      const gpt3_5Value = gpt3_5Data[key];
      const gpt4Value = gpt4Data[key];
      const colorClass = getColorClass(gpt3_5Value, gpt4Value, key);
      
      if (colorClass === 'higher-value') {
        gpt3_5Wins += 1; // GPT-3.5 wins
      } else if (colorClass === 'lower-value') {
        gpt4Wins += 1; // GPT-4 wins
      }
    });

    return { gpt3_5Wins, gpt4Wins };
  };

  // Get the number of green rows for each
  const { gpt3_5Wins, gpt4Wins } = countGreenRows(gpt3_5Data, gpt4Data);

  // Determine which response gets the green or red color based on wins
  const getResponseColor = (model) => {
    if (gpt3_5Wins > gpt4Wins && model === 'GPT-3.5') {
      return 'higher-value'; // GPT-3.5 gets green
    } else if (gpt4Wins > gpt3_5Wins && model === 'GPT-4') {
      return 'higher-value'; // GPT-4 gets green
    } else if (gpt3_5Wins > gpt4Wins && model === 'GPT-4') {
      return 'lower-value'; // GPT-4 gets red
    } else if (gpt4Wins > gpt3_5Wins && model === 'GPT-3.5') {
      return 'lower-value'; // GPT-3.5 gets red
    }
    return 'equal-value'; // No color if there's a tie
  };

  return (
    <div className="detail-container">
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

        {/* Comparison Table */}
        <div className="card-section">
          <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontStyle: 'italic' }}>
            GPT-3.5 vs GPT-4 Comparison
          </h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>GPT-3.5</th>
                <th>GPT-4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Response</td>
                <td className={getResponseColor('GPT-3.5')}>{gpt3_5Data['Response']}</td>
                <td className={getResponseColor('GPT-4')}>{gpt4Data['Response']}</td>
              </tr>
              {Object.keys(gpt3_5Data).map((key) => (
                key !== 'Response' && ( // Only process keys that are not 'Response'
                  <tr key={key}>
                    <td>{key}</td>
                    <td className={getColorClass(gpt3_5Data[key], gpt4Data[key], key)}>
                      {renderNestedMetric(gpt3_5Data[key])}
                    </td>
                    <td className={getColorClass(gpt4Data[key], gpt3_5Data[key], key)}>
                      {renderNestedMetric(gpt4Data[key])}
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => navigate('/evaluation-results')} className="back-button">
          Back to Table
        </button>
      </div>
    </div>
  );
};

export default DetailComponent;
