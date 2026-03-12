import React from 'react';
import './Dashboard.css';
import { mockAnalyticsMetrics, mockModelPerformance } from '../utils/mockData';

export const Dashboard: React.FC = () => {
  // Calculate weekly trend data for chart
  const maxValue = Math.max(...mockAnalyticsMetrics.weeklyTrend);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard</h1>
          <p>Real-time analytics and system overview</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">📊 Export Report</button>
          <button className="btn-secondary">⏱️ Last 24h</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-icon">📊</span>
            <span className="kpi-title">Total Predictions</span>
          </div>
          <div className="kpi-value">{mockAnalyticsMetrics.totalPredictions.toLocaleString()}</div>
          <div className="kpi-meta">
            <span className="trend trend-up">↑ +12.5% today</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-icon">✅</span>
            <span className="kpi-title">Accuracy</span>
          </div>
          <div className="kpi-value">{mockAnalyticsMetrics.accuracy.toFixed(1)}%</div>
          <div className="kpi-meta">
            <span className="badge-success">Excellent</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-icon">🎯</span>
            <span className="kpi-title">Avg Confidence</span>
          </div>
          <div className="kpi-value">{mockAnalyticsMetrics.averageConfidence.toFixed(1)}%</div>
          <div className="kpi-meta">
            <span className="trend trend-stable">→ Stable</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-icon">⚠️</span>
            <span className="kpi-title">False Positive Rate</span>
          </div>
          <div className="kpi-value">{mockAnalyticsMetrics.falsePositiveRate.toFixed(1)}%</div>
          <div className="kpi-meta">
            <span className="trend trend-down">↓ -2.1% week</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Weekly Trend */}
        <div className="chart-card">
          <div className="chart-header">
            <h2>Predictions Trend</h2>
            <span className="chart-period">Last 7 Days</span>
          </div>
          <div className="chart-container">
            <div className="bar-chart">
              {mockAnalyticsMetrics.weeklyTrend.map((value, idx) => {
                const height = (value / maxValue) * 100;
                return (
                  <div key={idx} className="bar-wrapper">
                    <div className="bar-label">{value}</div>
                    <div className="bar" style={{ height: `${height}%` }} title={`${days[idx]}: ${value}`} />
                    <div className="bar-day">{days[idx]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Prediction Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h2>Prediction Distribution</h2>
            <span className="chart-period">Total Sample</span>
          </div>
          <div className="chart-container">
            <div className="pie-chart">
              <div className="pie-segment" style={{
                background: 'conic-gradient(#10b981 0deg, #10b981 193deg, #ef4444 193deg, #ef4444 319deg, #f59e0b 319deg, #f59e0b 360deg)',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                margin: '0 auto',
              }} />
              <div className="pie-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#10b981' }} />
                  <span>REAL: {mockAnalyticsMetrics.realCount.toLocaleString()} ({((mockAnalyticsMetrics.realCount / mockAnalyticsMetrics.totalPredictions) * 100).toFixed(1)}%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#ef4444' }} />
                  <span>FAKE: {mockAnalyticsMetrics.fakeCount.toLocaleString()} ({((mockAnalyticsMetrics.fakeCount / mockAnalyticsMetrics.totalPredictions) * 100).toFixed(1)}%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#f59e0b' }} />
                  <span>UNSURE: {mockAnalyticsMetrics.unsureCount.toLocaleString()} ({((mockAnalyticsMetrics.unsureCount / mockAnalyticsMetrics.totalPredictions) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="performance-card">
        <div className="performance-header">
          <h2>Model Performance</h2>
          <span className="badge-info">Latest: Sentence-BERT v1.2</span>
        </div>
        <div className="metrics-grid">
          <div className="metric">
            <div className="metric-label">Precision</div>
            <div className="metric-value">{mockModelPerformance.precision.toFixed(1)}%</div>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: `${mockModelPerformance.precision}%` }} />
            </div>
          </div>
          <div className="metric">
            <div className="metric-label">Recall</div>
            <div className="metric-value">{mockModelPerformance.recall.toFixed(1)}%</div>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: `${mockModelPerformance.recall}%` }} />
            </div>
          </div>
          <div className="metric">
            <div className="metric-label">F1 Score</div>
            <div className="metric-value">{mockModelPerformance.f1Score.toFixed(1)}%</div>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: `${mockModelPerformance.f1Score}%` }} />
            </div>
          </div>
          <div className="metric">
            <div className="metric-label">ROC-AUC</div>
            <div className="metric-value">{mockModelPerformance.rocAuc.toFixed(2)}</div>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: `${mockModelPerformance.rocAuc * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="performance-meta">
          <div className="meta-item">
            <span className="meta-label">Trained on</span>
            <span className="meta-value">{mockModelPerformance.trainedOnArticles.toLocaleString()} articles</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Languages</span>
            <span className="meta-value">{mockModelPerformance.language.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
