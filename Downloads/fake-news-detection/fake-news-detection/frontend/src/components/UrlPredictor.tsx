import React, { useState } from 'react';
import { apiClient, PredictionResponse } from '../services/api';
import './Predictor.css';

const sampleUrl = 'https://www.reuters.com/world/sample-public-health-report';

export const UrlPredictor: React.FC = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await apiClient.predictUrl(url);
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
        <span className="predictor-kicker">URL</span>
        <h2>Link verification</h2>
        <p>Inspect published links with extracted article summaries, source cues, and confidence scoring.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="sample-row">
          <button type="button" className="ghost-chip" onClick={() => setUrl(sampleUrl)}>Try example</button>
        </div>

        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter article URL..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !url.trim()}>
          {loading ? 'Analyzing...' : 'Analyze URL'}
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
            <p><strong>URL:</strong> <a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a></p>
            <h4>Extracted content summary</h4>
            <p>{result.input_text.substring(0, 300)}...</p>
          </div>
        </div>
      )}
    </div>
  );
};
