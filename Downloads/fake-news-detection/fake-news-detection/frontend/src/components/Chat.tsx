import React, { useState } from 'react';
import { apiClient } from '../services/api';
import './Chat.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chat: React.FC = () => {
  const [newsContent, setNewsContent] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Paste a news article, analyze it, and ask follow-up questions about credibility, sourcing, and risk.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyzeNews = async () => {
    if (!newsContent.trim()) {
      alert('Please enter news content first');
      return;
    }

    setLoading(true);
    try {
      const data = await apiClient.analyzeChatContent(newsContent);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Analysis complete\nVerdict: ${data.prediction}\nConfidence: ${data.confidence}%\nReasoning: ${data.reasoning}\nRisk factors: ${data.risk_factors.length > 0 ? data.risk_factors.join(', ') : 'None detected'}\nTrust indicators: ${data.trust_indicators.length > 0 ? data.trust_indicators.join(', ') : 'None detected'}\nYou can now continue with follow-up questions.`,
        },
      ]);

      setAnalyzed(true);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Analysis failed: ${error}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || !analyzed) {
      alert('Please analyze news content first');
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const data = await apiClient.chatAboutContent(newsContent, input);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${error}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI News Fact-Checker</h2>
        <p>Conversational review for article credibility, risk signals, and sourcing questions</p>
      </div>

      <div className="chat-content">
        <div className="news-input-section">
          <label>Paste news article</label>
          <textarea
            value={newsContent}
            onChange={(e) => setNewsContent(e.target.value)}
            placeholder="Paste the news article or text you want to analyze..."
            className="news-textarea"
            disabled={analyzed}
          />
          <button
            onClick={handleAnalyzeNews}
            disabled={loading || analyzed}
            className="analyze-btn"
          >
            {loading ? 'Analyzing...' : analyzed ? 'Analyzed' : 'Analyze Article'}
          </button>
          {analyzed && (
            <button
              onClick={() => {
                setNewsContent('');
                setMessages([
                  {
                    role: 'assistant',
                    content: 'Paste a new news article to analyze.',
                  },
                ]);
                setAnalyzed(false);
              }}
              className="reset-btn"
            >
              Analyze New Content
            </button>
          )}
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-avatar">{msg.role === 'user' ? 'You' : 'AI'}</div>
              <div className="message-content">
                {msg.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {loading && <div className="loading">AI is preparing the next response...</div>}
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={analyzed ? 'Ask a follow-up question...' : 'Analyze news first...'}
          disabled={!analyzed || loading}
          className="chat-input"
        />
        <button type="submit" disabled={!analyzed || loading} className="send-btn">
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chat;
