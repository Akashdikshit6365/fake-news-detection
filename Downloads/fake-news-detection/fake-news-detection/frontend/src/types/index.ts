// User roles and permissions
export type UserRole = 'admin' | 'analyst' | 'reviewer' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  lastActive: Date;
}

// Predictions and analytics
export type PredictionLabel = 'REAL' | 'FAKE' | 'UNSURE';
export type ContentType = 'text' | 'url' | 'image';

export interface Prediction {
  id: string;
  contentType: ContentType;
  content: string;
  prediction: PredictionLabel;
  confidence: number;
  timestamp: Date;
  analyzedBy: string;
  verified?: boolean;
  flaggedReason?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface AnalyticsMetrics {
  totalPredictions: number;
  accuracy: number;
  falsePositiveRate: number;
  truePositiveRate: number;
  averageConfidence: number;
  realCount: number;
  fakeCount: number;
  unsureCount: number;
  weeklyTrend: number[]; // Last 7 days
}

export interface ModelPerformance {
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  trainedOnArticles: number;
  language: string[];
}

// Notifications
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    href: string;
  };
}

// Settings
export interface SystemSettings {
  confidenceThreshold: number;
  autoFlagThreshold: number;
  enableNotifications: boolean;
  maxUploadSize: number;
  allowedImageFormats: string[];
}
