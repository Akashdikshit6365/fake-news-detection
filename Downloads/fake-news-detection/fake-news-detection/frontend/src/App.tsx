import React, { useEffect, useState } from 'react';
import { ImagePredictor } from './components/ImagePredictor';
import LandingPage from './components/LandingPage';
import Chat from './components/Chat';
import { TextPredictor } from './components/TextPredictor';
import { UrlPredictor } from './components/UrlPredictor';
import { DEMO_MODE, apiClient } from './services/api';
import './App.css';

function App() {
  const [isHealthy, setIsHealthy] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'predictors' | 'groq'>('predictors');
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await apiClient.checkHealth();
        setIsHealthy(true);
        setError('');
      } catch (err) {
        setIsHealthy(false);
        setError(err instanceof Error ? err.message : 'Service unavailable');
      }
    };

    checkHealth();

    if (!DEMO_MODE) {
      const interval = window.setInterval(checkHealth, 30000);
      return () => window.clearInterval(interval);
    }

    return undefined;
  }, []);

  if (!showApp) {
    return <LandingPage onStart={() => setShowApp(true)} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-top">
            <button className="back-btn" onClick={() => setShowApp(false)}>Back</button>
            <h1>FakeGuard</h1>
          </div>
          <p className="subtitle">Real-time misinformation detection across articles, links, images, and conversational review</p>
          <div className={`status ${isHealthy || DEMO_MODE ? 'healthy' : 'unhealthy'}`}>
            <span className="status-dot"></span>
            {isHealthy || DEMO_MODE ? 'System online' : 'Service offline'}
          </div>
        </div>
      </header>

      <main className="app-main">
        {error && !DEMO_MODE && <div className="banner-error">{error}</div>}

        <div className="hero-section">
          <div className="hero-text">
            <span className="eyebrow">Trusted News Intelligence</span>
            <h2>Verify fast-moving stories before they shape public opinion.</h2>
            <p>
              Detect credibility signals, inspect suspicious claims, and review source quality in a clean workflow built
              for desktop and mobile teams.
            </p>
            <div className="hero-actions">
              <button className="primary-cta" onClick={() => setActiveTab('predictors')}>Start Analysis</button>
              <button className="secondary-cta" onClick={() => setActiveTab('groq')}>Open Insight Chat</button>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Monitoring</span>
            </div>
            <div className="stat">
              <span className="stat-value">4</span>
              <span className="stat-label">Analysis Modes</span>
            </div>
            <div className="stat">
              <span className="stat-value">&lt;1s</span>
              <span className="stat-label">Response Time</span>
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <button
            className={`tab-button ${activeTab === 'predictors' ? 'active' : ''}`}
            onClick={() => setActiveTab('predictors')}
          >
            Quick Analysis
          </button>
          <button
            className={`tab-button ${activeTab === 'groq' ? 'active' : ''}`}
            onClick={() => setActiveTab('groq')}
          >
            AI Chat Analyzer
          </button>
        </div>

        {activeTab === 'predictors' ? (
          <>
            <section className="predictors-section">
              <div className="section-header">
                <h2>Analysis Workspace</h2>
                <p>Run article, link, and image checks with clear verdicts and readable confidence summaries.</p>
              </div>

              <div className="predictors-grid">
                <TextPredictor />
                <UrlPredictor />
                <ImagePredictor />
              </div>
            </section>

            <section className="info-section">
              <div className="info-card">
                <h3>Detection Pipeline</h3>
                <ol>
                  <li><strong>Ingest:</strong> Submit article text, a public link, or a screenshot.</li>
                  <li><strong>Extract:</strong> The system isolates claims, tone, and source cues.</li>
                  <li><strong>Score:</strong> Each submission receives a verdict and confidence range.</li>
                  <li><strong>Review:</strong> Analysts can inspect summaries and follow-up insights.</li>
                </ol>
              </div>

              <div className="info-card">
                <h3>Verdict Guide</h3>
                <ul>
                  <li><span className="badge real">REAL</span> Source integrity and supporting evidence appear strong.</li>
                  <li><span className="badge fake">FAKE</span> Risk indicators outweigh trustworthy signals.</li>
                  <li><span className="badge unsure">UNSURE</span> The content needs additional editorial review.</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>Platform Strengths</h3>
                <ul>
                  <li>Fast results for text, links, screenshots, and guided review.</li>
                  <li>Tap-friendly controls designed for mobile investigation workflows.</li>
                  <li>High-contrast reading surfaces for long-form analysis.</li>
                  <li>Consistent verdict presentation across every input type.</li>
                </ul>
              </div>
            </section>
          </>
        ) : (
          <div className="groq-section">
            <Chat />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2026 FakeGuard intelligence platform</p>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">Process</a>
            <a href="#stats">Performance</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
