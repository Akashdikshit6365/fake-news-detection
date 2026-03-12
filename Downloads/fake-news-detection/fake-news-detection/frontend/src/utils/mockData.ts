import { User, Prediction, AnalyticsMetrics, Notification, ModelPerformance } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'admin',
    avatar: '👩‍💼',
    lastActive: new Date(Date.now() - 5 * 60000), // 5 minutes ago
  },
  {
    id: 'user-002',
    name: 'Marcus Johnson',
    email: 'marcus.j@company.com',
    role: 'analyst',
    avatar: '👨‍💻',
    lastActive: new Date(Date.now() - 25 * 60000), // 25 minutes ago
  },
  {
    id: 'user-003',
    name: 'Elena Rodriguez',
    email: 'elena.r@company.com',
    role: 'reviewer',
    avatar: '👩‍🔬',
    lastActive: new Date(Date.now() - 2 * 3600000), // 2 hours ago
  },
  {
    id: 'user-004',
    name: 'James Wilson',
    email: 'james.w@company.com',
    role: 'viewer',
    avatar: '👨‍📊',
    lastActive: new Date(Date.now() - 8 * 3600000), // 8 hours ago
  },
];

// Mock Predictions with realistic data
const contentSamples = [
  { text: 'Breaking: New AI breakthrough announced at tech conference...', type: 'text' as const },
  { text: 'https://bbc.com/news/technology', type: 'url' as const },
  { text: 'WHO confirms new vaccine effectiveness...', type: 'text' as const },
  { text: 'SHOCKING: Celebrities HATE this one weird trick...', type: 'text' as const },
  { text: 'https://reuters.com/health', type: 'url' as const },
  { text: 'Market analysis: Tech stocks show quarterly growth...', type: 'text' as const },
  { text: 'Government cover-up EXPOSED (no proof)...', type: 'text' as const },
  { text: 'https://techcrunch.com/2026/03', type: 'url' as const },
];

const generateMockPrediction = (index: number): Prediction => {
  const content = contentSamples[index % contentSamples.length];
  const predictions: Array<'REAL' | 'FAKE' | 'UNSURE'> = ['REAL', 'FAKE', 'UNSURE'];
  const prediction = predictions[Math.floor(Math.random() * predictions.length)];
  const confidence = Math.floor(Math.random() * 45) + (prediction === 'UNSURE' ? 0 : 65);

  return {
    id: `pred-${String(index + 1).padStart(5, '0')}`,
    contentType: content.type,
    content: content.text.substring(0, 60) + (content.text.length > 60 ? '...' : ''),
    prediction,
    confidence,
    timestamp: new Date(Date.now() - Math.random() * 24 * 3600000),
    analyzedBy: mockUsers[Math.floor(Math.random() * mockUsers.length)].name,
    verified: Math.random() > 0.7,
    flaggedReason: Math.random() > 0.8 ? 'Manual review required' : undefined,
    trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as any,
  };
};

export const mockPredictions: Prediction[] = Array.from(
  { length: 28 },
  (_, i) => generateMockPrediction(i)
).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

// Mock Analytics Metrics
export const mockAnalyticsMetrics: AnalyticsMetrics = {
  totalPredictions: 2847,
  accuracy: 87.3,
  falsePositiveRate: 8.2,
  truePositiveRate: 91.5,
  averageConfidence: 78.4,
  realCount: 1562,
  fakeCount: 1045,
  unsureCount: 240,
  weeklyTrend: [245, 312, 287, 401, 378, 356, 288], // Last 7 days
};

// Mock Model Performance
export const mockModelPerformance: ModelPerformance = {
  precision: 87.3,
  recall: 85.9,
  f1Score: 86.6,
  rocAuc: 0.91,
  trainedOnArticles: 30000,
  language: ['English', 'Hindi'],
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'warning',
    title: 'Unusual detection pattern',
    message: 'Spike in FAKE predictions detected in political content (34% increase)',
    timestamp: new Date(Date.now() - 15 * 60000),
    read: false,
    action: { label: 'View Analysis', href: '/analytics' },
  },
  {
    id: 'notif-002',
    type: 'info',
    title: 'Daily report ready',
    message: 'Your daily prediction summary is ready for download',
    timestamp: new Date(Date.now() - 2 * 3600000),
    read: false,
    action: { label: 'Download', href: '/reports' },
  },
  {
    id: 'notif-003',
    type: 'success',
    title: 'Model updated',
    message: 'Sentence-BERT encoder updated to latest version',
    timestamp: new Date(Date.now() - 5 * 3600000),
    read: true,
  },
  {
    id: 'notif-004',
    type: 'error',
    title: 'API latency high',
    message: 'Average prediction latency increased to 450ms',
    timestamp: new Date(Date.now() - 12 * 3600000),
    read: true,
  },
];

// Helper functions
export const getPredictionColor = (prediction: 'REAL' | 'FAKE' | 'UNSURE'): string => {
  switch (prediction) {
    case 'REAL': return '#10b981'; // emerald
    case 'FAKE': return '#ef4444'; // red
    case 'UNSURE': return '#f59e0b'; // amber
  }
};

export const getConfidenceLabel = (confidence: number): string => {
  if (confidence >= 85) return 'Very High';
  if (confidence >= 75) return 'High';
  if (confidence >= 65) return 'Medium';
  return 'Low';
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
