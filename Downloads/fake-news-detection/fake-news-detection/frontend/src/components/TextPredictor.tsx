import React, { useState } from 'react';
import { apiClient, PredictionResponse } from '../services/api';
import './Predictor.css';

const sampleText =
  'Official health agency report confirms vaccine effectiveness after a multi-city study with named experts and published data.';

export const TextPredictor: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await apiClient.predictText(text);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predictor-container">
      <div className="predictor-header">
        <span className="predictor-kicker">Text</span>
        <h2>Article analysis</h2>
        <p>Analyze article text and inspect verdict strength, credibility score, and summary signals.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="sample-row">
          <button type="button" className="ghost-chip" onClick={() => setText(sampleText)}>Try example</button>
          <span className="helper-copy">{text.length}/1200 characters</span>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste news content here..."
          rows={6}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !text.trim()}>
          {loading ? 'Analyzing...' : 'Analyze Text'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result">
          <div className={`prediction ${result.prediction.toLowerCase()}`}>
            <h3>{result.prediction}</h3>
            <p>Confidence {result.confidence}%</p>
            <p>Credibility score {result.credibility_score}</p>
          </div>
          <div className="result-details">
            <h4>Analysis summary</h4>
            <p>{result.input_text.substring(0, 240)}...</p>
          </div>
        </div>
      )}
    </div>
  );
};
