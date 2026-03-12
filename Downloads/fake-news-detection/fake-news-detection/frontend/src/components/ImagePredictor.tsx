import React, { useState } from 'react';
import { apiClient, PredictionResponse } from '../services/api';
import './Predictor.css';

export const ImagePredictor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await apiClient.predictImage(file);
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
        <span className="predictor-kicker">Image</span>
        <h2>Headline screenshot scan</h2>
        <p>Upload screenshots to extract text, evaluate claim quality, and review credibility indicators.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          disabled={loading}
        />
        {preview && <img src={preview} alt="Preview" className="image-preview" />}
        <button type="submit" disabled={loading || !file}>
          {loading ? 'Analyzing...' : 'Analyze Image'}
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
            <p><strong>File:</strong> {result.filename}</p>
            <h4>Extracted text summary</h4>
            <p>{result.input_text.substring(0, 300)}...</p>
          </div>
        </div>
      )}
    </div>
  );
};
