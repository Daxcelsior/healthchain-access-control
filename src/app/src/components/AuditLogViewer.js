import React, { useState, useEffect } from 'react';
import './AuditLogViewer.css';

const AuditLogViewer = ({ contract, account, patientID }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    actionType: '',
    providerSearch: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (contract && patientID) {
      fetchAuditLogs();
    }
  }, [contract, patientID]);

  const fetchAuditLogs = async () => {
    if (!contract || !patientID) return;
    
    setLoading(true);
    setError('');
    
    try {
      let result;
      
      if (filters.startDate && filters.endDate) {
        const startTime = Math.floor(new Date(filters.startDate).getTime() / 1000);
        const endTime = Math.floor(new Date(filters.endDate).getTime() / 1000);
        result = await contract.methods
          .getAccessHistoryByDateRange(patientID, startTime, endTime)
          .call();
      } else {
        result = await contract.methods
          .getPatientAuditTrail(patientID)
          .call();
      }
      
      const { timestamps, actors, actionTypes, successes, providers, details } = result;
      
      let auditLogs = timestamps.map((timestamp, index) => ({
        timestamp: parseInt(timestamp),
        actor: actors[index],
        actionType: actionTypes[index],
        success: successes[index],
        provider: providers[index],
        details: details[index]
      }));
      
      // Apply filters
      if (filters.actionType) {
        auditLogs = auditLogs.filter(log => 
          log.actionType.toLowerCase().includes(filters.actionType.toLowerCase())
        );
      }
      
      if (filters.providerSearch) {
        auditLogs = auditLogs.filter(log => 
          log.provider.toLowerCase().includes(filters.providerSearch.toLowerCase())
        );
      }
      
      // Sort by timestamp (newest first)
      auditLogs.sort((a, b) => b.timestamp - a.timestamp);
      
      setLogs(auditLogs);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
      setError('Failed to fetch audit logs. Make sure you have access to this patient.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleString();
  };

  const getActionTypeColor = (actionType) => {
    const colors = {
      'GRANT': '#4caf50',
      'REVOKE': '#f44336',
      'EMERGENCY_REQUEST': '#ff9800',
      'EMERGENCY_GRANTED': '#ff5722',
      'REGISTER': '#2196f3',
      'ACCESS_CHECK': '#9c27b0',
      'FILE_STORED': '#00bcd4'
    };
    return colors[actionType] || '#757575';
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    fetchAuditLogs();
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      actionType: '',
      providerSearch: ''
    });
    setCurrentPage(1);
    fetchAuditLogs();
  };

  // Pagination
  const totalPages = Math.ceil(logs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLogs = logs.slice(startIndex, endIndex);

  return (
    <div className="audit-log-viewer">
      <h3>Audit Log Viewer</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="filters-section">
        <div className="filter-row">
          <div className="filter-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label>Action Type:</label>
            <select
              name="actionType"
              value={filters.actionType}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="GRANT">Grant</option>
              <option value="REVOKE">Revoke</option>
              <option value="EMERGENCY_REQUEST">Emergency Request</option>
              <option value="EMERGENCY_GRANTED">Emergency Granted</option>
              <option value="REGISTER">Register</option>
              <option value="ACCESS_CHECK">Access Check</option>
              <option value="FILE_STORED">File Stored</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Provider Address:</label>
            <input
              type="text"
              name="providerSearch"
              value={filters.providerSearch}
              onChange={handleFilterChange}
              placeholder="Search provider..."
            />
          </div>
        </div>
        <div className="filter-actions">
          <button onClick={handleApplyFilters} className="filter-button">
            Apply Filters
          </button>
          <button onClick={handleClearFilters} className="filter-button secondary">
            Clear
          </button>
          <button onClick={fetchAuditLogs} className="filter-button">
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading audit logs...</div>
      ) : (
        <>
          <div className="audit-table-container">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>Provider Address</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No audit logs found
                    </td>
                  </tr>
                ) : (
                  paginatedLogs.map((log, index) => (
                    <tr key={index}>
                      <td>{formatTimestamp(log.timestamp)}</td>
                      <td>
                        <span
                          className="action-badge"
                          style={{ backgroundColor: getActionTypeColor(log.actionType) }}
                        >
                          {log.actionType}
                        </span>
                      </td>
                      <td className="address-cell">
                        {log.provider !== '0x0000000000000000000000000000000000000000' 
                          ? `${log.provider.substring(0, 6)}...${log.provider.substring(38)}`
                          : 'N/A'}
                      </td>
                      <td>
                        <span className={`status-badge ${log.success ? 'success' : 'failure'}`}>
                          {log.success ? 'Success' : 'Failed'}
                        </span>
                      </td>
                      <td className="details-cell">{log.details || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="page-button"
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages} ({logs.length} total logs)
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="page-button"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AuditLogViewer;

