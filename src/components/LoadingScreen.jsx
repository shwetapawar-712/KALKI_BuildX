import React from 'react';

export default function LoadingScreen({ message = 'Loading City-Safe...' }) {
  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="loading-logo-wrapper">
          <div className="loading-brand-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className="spinner-ring"></div>
        </div>
        <div className="loading-text">{message}</div>
      </div>
    </div>
  );
}
