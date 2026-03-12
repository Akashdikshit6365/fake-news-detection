import React, { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  unreadNotifications: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  unreadNotifications,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>('main');

  const toggleExpanded = () => setExpanded(!expanded);
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const navItems = [
    {
      section: 'main',
      label: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'predictions', label: 'Predictions', icon: '🔍' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
      ],
    },
    {
      section: 'management',
      label: 'Management',
      items: [
        { id: 'content-review', label: 'Content Review', icon: '📋' },
        { id: 'users', label: 'Team Members', icon: '👥' },
        { id: 'reports', label: 'Reports', icon: '📄' },
      ],
    },
    {
      section: 'settings',
      label: 'Settings',
      items: [
        { id: 'system-settings', label: 'System', icon: '⚙️' },
        { id: 'model-config', label: 'Model Config', icon: '🤖' },
      ],
    },
  ];

  return (
    <div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          {expanded && <span className="logo">🔍 FakeGuard</span>}
          <button className="toggle-btn" onClick={toggleExpanded} title="Toggle sidebar">
            {expanded ? '←' : '→'}
          </button>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((section) => (
          <div key={section.section} className="nav-section">
            {expanded && (
              <button
                className={`section-header ${expandedSection === section.section ? 'active' : ''}`}
                onClick={() => toggleSection(section.section)}
              >
                <span className="section-label">{section.label}</span>
                <span className="section-toggle">{expandedSection === section.section ? '−' : '+'}</span>
              </button>
            )}

            <div className={`nav-items ${expandedSection === section.section || !expanded ? 'visible' : ''}`}>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                  onClick={() => onNavigate(item.id)}
                  title={item.label}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {expanded && <span className="nav-label">{item.label}</span>}
                  {expanded && item.id === 'predictions' && unreadNotifications > 0 && (
                    <span className="badge">{unreadNotifications}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        {expanded && (
          <div className="user-info">
            <div className="user-avatar">👩‍💼</div>
            <div className="user-details">
              <div className="user-name">Sarah Chen</div>
              <div className="user-role">Admin</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
