import React, { useState } from 'react';
import { Notification } from '../types';
import { mockNotifications } from '../utils/mockData';
import './Notifications.css';

interface NotificationsProps {
  unread: number;
  onDismiss?: (id: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ unread, onDismiss }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    onDismiss?.(id);
  };

  return (
    <div className="notifications-container">
      <button
        className="notifications-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications"
      >
        🔔
        {unread > 0 && <span className="notifications-badge">{unread}</span>}
      </button>

      {isOpen && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close notifications"
            >
              ✕
            </button>
          </div>

          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="empty-notifications">
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📭</div>
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`notification-item notification-${notif.type} ${notif.read ? 'read' : 'unread'}`}
                >
                  <div className="notif-icon">
                    {notif.type === 'info' && '✓'}
                    {notif.type === 'success' && '✓'}
                    {notif.type === 'warning' && '⚠'}
                    {notif.type === 'error' && '✕'}
                  </div>
                  <div className="notif-content">
                    <div className="notif-title">{notif.title}</div>
                    <div className="notif-message">{notif.message}</div>
                    {notif.action && (
                      <a href={notif.action.href} className="notif-action">
                        {notif.action.label} →
                      </a>
                    )}
                  </div>
                  <button
                    className="notif-close"
                    onClick={() => handleDismiss(notif.id)}
                    aria-label="Dismiss notification"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="notifications-footer">
              <button className="clear-all-btn">Clear All</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
