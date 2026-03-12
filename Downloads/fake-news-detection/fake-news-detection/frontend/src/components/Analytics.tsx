import React, { useState, useMemo } from 'react';
import { Prediction } from '../types';
import { mockPredictions, formatDate, getPredictionColor } from '../utils/mockData';
import './Analytics.css';

type SortKey = 'timestamp' | 'confidence' | 'prediction';
type SortOrder = 'asc' | 'desc';

export const Analytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPrediction, setFilterPrediction] = useState<'all' | 'REAL' | 'FAKE' | 'UNSURE'>('all');
  const [filterType, setFilterType] = useState<'all' | 'text' | 'url' | 'image'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('timestamp');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;

  // Filter and search
  const filtered = useMemo(() => {
    return mockPredictions.filter((pred) => {
      const matchSearch =
        pred.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pred.analyzedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pred.id.includes(searchTerm);

      const matchPrediction = filterPrediction === 'all' || pred.prediction === filterPrediction;
      const matchType = filterType === 'all' || pred.contentType === filterType;

      return matchSearch && matchPrediction && matchType;
    });
  }, [searchTerm, filterPrediction, filterType]);

  // Sort
  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let aVal: any = a[sortKey];
      let bVal: any = b[sortKey];

      if (aVal instanceof Date) aVal = aVal.getTime();
      if (bVal instanceof Date) bVal = bVal.getTime();

      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return copy;
  }, [filtered, sortKey, sortOrder]);

  // Paginate
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginatedData = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return '⇅';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="analytics">
      {/* Header */}
      <div className="analytics-header">
        <div className="header-content">
          <h1>Predictions History</h1>
          <p>View and analyze all model predictions</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">📥 Import Data</button>
          <button className="btn-secondary">📤 Export CSV</button>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-panel">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search predictions, users, IDs... (Cmd+K)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-btn"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="filter-group">
          <select
            value={filterPrediction}
            onChange={(e) => {
              setFilterPrediction(e.target.value as any);
              setCurrentPage(1);
            }}
            className="filter-select"
          >
            <option value="all">All Predictions</option>
            <option value="REAL">REAL</option>
            <option value="FAKE">FAKE</option>
            <option value="UNSURE">UNSURE</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value as any);
              setCurrentPage(1);
            }}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="text">Text</option>
            <option value="url">URL</option>
            <option value="image">Image</option>
          </select>
        </div>

        <div className="view-info">
          Showing {paginatedData.length} of {sorted.length} items
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="predictions-table">
          <thead>
            <tr>
              <th className="col-id">ID</th>
              <th className="col-type">Type</th>
              <th className="col-content">Content</th>
              <th className="col-prediction">
                <button
                  className="sort-btn"
                  onClick={() => handleSort('prediction')}
                >
                  Prediction {getSortIcon('prediction')}
                </button>
              </th>
              <th className="col-confidence">
                <button
                  className="sort-btn"
                  onClick={() => handleSort('confidence')}
                >
                  Confidence {getSortIcon('confidence')}
                </button>
              </th>
              <th className="col-timestamp">
                <button
                  className="sort-btn"
                  onClick={() => handleSort('timestamp')}
                >
                  Timestamp {getSortIcon('timestamp')}
                </button>
              </th>
              <th className="col-user">Analyzed By</th>
              <th className="col-status">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-state">
                  <div className="empty-icon">📭</div>
                  <p>No predictions found</p>
                  <span>Try adjusting your filters</span>
                </td>
              </tr>
            ) : (
              paginatedData.map((pred) => (
                <tr key={pred.id} className={`row-${pred.prediction.toLowerCase()}`}>
                  <td className="col-id">
                    <span className="id-badge">{pred.id}</span>
                  </td>
                  <td className="col-type">
                    <span className="type-badge">{pred.contentType === 'text' ? '📝' : pred.contentType === 'url' ? '🔗' : '🖼️'} {pred.contentType}</span>
                  </td>
                  <td className="col-content">
                    <span className="content-text" title={pred.content}>
                      {pred.content}
                    </span>
                  </td>
                  <td className="col-prediction">
                    <span
                      className="prediction-badge"
                      style={{ backgroundColor: getPredictionColor(pred.prediction) }}
                    >
                      {pred.prediction}
                    </span>
                  </td>
                  <td className="col-confidence">
                    <div className="confidence-cell">
                      <div className="confidence-bar">
                        <div
                          className="confidence-fill"
                          style={{
                            width: `${pred.confidence}%`,
                            backgroundColor: getPredictionColor(pred.prediction),
                          }}
                        />
                      </div>
                      <span className="confidence-text">{pred.confidence}%</span>
                    </div>
                  </td>
                  <td className="col-timestamp">
                    <span className="timestamp-text">{formatDate(pred.timestamp)}</span>
                  </td>
                  <td className="col-user">
                    <span className="user-text">{pred.analyzedBy}</span>
                  </td>
                  <td className="col-status">
                    {pred.verified ? (
                      <span className="status-verified" title="Verified">
                        ✓
                      </span>
                    ) : pred.flaggedReason ? (
                      <span className="status-flagged" title={pred.flaggedReason}>
                        ⚠️
                      </span>
                    ) : (
                      <span className="status-pending" title="Pending">
                        ◯
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            « First
          </button>
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ‹ Prev
          </button>

          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next ›
          </button>
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last »
          </button>
        </div>
      )}
    </div>
  );
};
