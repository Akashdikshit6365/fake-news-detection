import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-icon">FG</span>
            <span className="logo-text">FakeGuard</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#stats">Power</a>
            <button className="nav-cta" onClick={onStart}>Launch App</button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1" style={{ transform: `translateY(${scrollY * 0.5}px)` }}></div>
          <div className="gradient-orb orb-2" style={{ transform: `translateY(${scrollY * -0.3}px)` }}></div>
          <div className="gradient-orb orb-3" style={{ transform: `translateY(${scrollY * 0.4}px)` }}></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Stop Fake News
            <span className="highlight"> Before It Spreads</span>
          </h1>
          <p className="hero-subtitle">
            Detect misleading claims across text, URLs, and screenshots with a fast, elegant workflow designed for modern newsrooms and trust teams.
          </p>

          <div className="hero-features">
            <div className="feature-badge">AI-powered detection</div>
            <div className="feature-badge">Source-aware analysis</div>
            <div className="feature-badge">Mobile-first layout</div>
          </div>

          <button className="hero-cta" onClick={onStart}>
            <span>Start Detecting Fake News</span>
            <span className="arrow">Go</span>
          </button>

          <div className="hero-social">
            <span>Private by design. Fast to review. Built for real investigative workflows.</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-content">
              <span className="card-label">REAL</span>
              <span className="card-score">92%</span>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="card-content">
              <span className="card-label">FAKE</span>
              <span className="card-score">87%</span>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="card-content">
              <span className="card-label">ANALYSIS</span>
              <span className="card-score">2.3s</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats" id="stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">87%</div>
            <div className="stat-label">Accuracy Rate</div>
            <div className="stat-desc">Validated on 30K plus articles</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">30K+</div>
            <div className="stat-label">Articles Trained</div>
            <div className="stat-desc">English and Hindi support</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">&lt;500ms</div>
            <div className="stat-label">Fast Feedback</div>
            <div className="stat-desc">Designed for instant review</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3</div>
            <div className="stat-label">Input Methods</div>
            <div className="stat-desc">Text, URL, and image</div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Built for high-speed verification, editorial review, and trust analysis</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">Text</div>
            <h3>Text Analysis</h3>
            <p>Paste an article or claim to review credibility, confidence, and decision signals in seconds.</p>
            <ul className="feature-points">
              <li>Fast scoring</li>
              <li>Credibility summary</li>
              <li>Tap-friendly mobile input</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">URL</div>
            <h3>URL Analysis</h3>
            <p>Analyze published links with source-aware extraction, condensed summaries, and credibility scoring.</p>
            <ul className="feature-points">
              <li>Source review</li>
              <li>Clean result blocks</li>
              <li>Responsive presentation</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">Image</div>
            <h3>Image Analysis</h3>
            <p>Upload screenshots and scan embedded claims through OCR-assisted text extraction and risk analysis.</p>
            <ul className="feature-points">
              <li>Preview before submit</li>
              <li>Readable mobile cards</li>
              <li>OCR summary</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">AI</div>
            <h3>AI Chat Analyzer</h3>
            <p>Use conversational review to inspect verdicts, challenge claims, and uncover suspicious framing faster.</p>
            <ul className="feature-points">
              <li>Question-driven review</li>
              <li>Explanatory responses</li>
              <li>Integrated workflow</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">Risk</div>
            <h3>Risk Assessment</h3>
            <p>Highlight suspicious wording, missing evidence, and trust indicators in a format clients can scan quickly.</p>
            <ul className="feature-points">
              <li>Signal-based verdicts</li>
              <li>Human review support</li>
              <li>Consistent UX</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">Reports</div>
            <h3>Detailed Reports</h3>
            <p>Surface verdicts, metrics, and credibility patterns in a report-style interface teams can scan quickly.</p>
            <ul className="feature-points">
              <li>Presentation-grade UI</li>
              <li>Confidence visibility</li>
              <li>Stakeholder-friendly flow</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Simple three-step experience</p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Input Content</h3>
            <p>Paste text, provide a URL, or upload an image.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Analyze Signals</h3>
            <p>The platform evaluates language, sourcing, and credibility indicators.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Review Verdict</h3>
            <p>See REAL, FAKE, or UNSURE with confidence and a readable explanation.</p>
          </div>
        </div>
      </section>

      <section className="results">
        <div className="section-header">
          <h2>Model Performance</h2>
          <p>Performance metrics displayed in a clear operational layout</p>
        </div>

        <div className="metrics-grid">
          <div className="metric">
            <div className="metric-value">87.3%</div>
            <div className="metric-name">Precision</div>
            <div className="metric-bar"><div className="bar-fill" style={{ width: '87%' }}></div></div>
          </div>
          <div className="metric">
            <div className="metric-value">85.9%</div>
            <div className="metric-name">Recall</div>
            <div className="metric-bar"><div className="bar-fill" style={{ width: '86%' }}></div></div>
          </div>
          <div className="metric">
            <div className="metric-value">86.6%</div>
            <div className="metric-name">F1 Score</div>
            <div className="metric-bar"><div className="bar-fill" style={{ width: '87%' }}></div></div>
          </div>
          <div className="metric">
            <div className="metric-value">0.91</div>
            <div className="metric-name">ROC AUC</div>
            <div className="metric-bar"><div className="bar-fill" style={{ width: '91%' }}></div></div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to Strengthen Content Verification?</h2>
          <p>Launch the platform and start reviewing articles, links, images, and follow-up questions in one place.</p>
          <button className="cta-button" onClick={onStart}>
            Launch FakeGuard Now
          </button>
          <div className="cta-subtitle">Fast onboarding. Clean analysis. Built for trust and safety teams.</div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>FakeGuard</h4>
            <p>Advanced misinformation detection with a polished cross-device experience.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#stats">Performance</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#features">Documentation</a></li>
              <li><a href="#stats">API Reference</a></li>
              <li><a href="#how-it-works">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 FakeGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
