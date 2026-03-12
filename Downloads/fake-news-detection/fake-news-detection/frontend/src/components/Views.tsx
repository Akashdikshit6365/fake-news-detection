import React from 'react';

export const ContentReview: React.FC = () => {
  return (
    <div className="view-container">
      <div className="view-header">
        <h1>📋 Content Review</h1>
        <p>Manually review and verify predictions</p>
      </div>
      <div style={{
        padding: '60px 40px',
        textAlign: 'center',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        color: 'var(--color-text-secondary)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔄</div>
        <p style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'var(--color-text-primary)' }}>Content Review Module</p>
        <span>Coming Soon - Review and verify flagged predictions manually</span>
      </div>
    </div>
  );
};

export const Users: React.FC = () => {
  return (
    <div className="view-container">
      <div className="view-header">
        <h1>👥 Team Members</h1>
        <p>Manage users and permissions</p>
      </div>
      <div style={{
        padding: '60px 40px',
        textAlign: 'center',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        color: 'var(--color-text-secondary)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>👥</div>
        <p style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'var(--color-text-primary)' }}>Team Management</p>
        <span>Coming Soon - Manage team members and role-based access</span>
      </div>
    </div>
  );
};

export const Reports: React.FC = () => {
  return (
    <div className="view-container">
      <div className="view-header">
        <h1>📄 Reports</h1>
        <p>Generate and download reports</p>
      </div>
      <div style={{
        padding: '60px 40px',
        textAlign: 'center',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        color: 'var(--color-text-secondary)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
        <p style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'var(--color-text-primary)' }}>Reports Management</p>
        <span>Coming Soon - Export and generate detailed reports</span>
      </div>
    </div>
  );
};

export const SystemSettings: React.FC = () => {
  return (
    <div className="view-container">
      <div className="view-header">
        <h1>⚙️ System Settings</h1>
        <p>Configure system parameters</p>
      </div>
      <div style={{
        padding: '60px 40px',
        textAlign: 'center',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        color: 'var(--color-text-secondary)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚙️</div>
        <p style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'var(--color-text-primary)' }}>System Configuration</p>
        <span>Coming Soon - Configure system settings and parameters</span>
      </div>
    </div>
  );
};

export const ModelConfig: React.FC = () => {
  return (
    <div className="view-container">
      <div className="view-header">
        <h1>🤖 Model Configuration</h1>
        <p>Manage model parameters and thresholds</p>
      </div>
      <div style={{
        padding: '60px 40px',
        textAlign: 'center',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        color: 'var(--color-text-secondary)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🤖</div>
        <p style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'var(--color-text-primary)' }}>Model Settings</p>
        <span>Coming Soon - Configure model thresholds and parameters</span>
      </div>
    </div>
  );
};

export const Predictions: React.FC = () => {
  return (
    <div className="view-container">
      <div className="view-header">
        <h1>🔍 New Predictions</h1>
        <p>Make predictions on new content</p>
      </div>
      <div style={{
        padding: '60px 40px',
        textAlign: 'center',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        color: 'var(--color-text-secondary)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
        <p style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'var(--color-text-primary)' }}>Make Predictions</p>
        <span>Test the model on new text, URL, or image content</span>
      </div>
    </div>
  );
};
