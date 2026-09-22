import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const displayName = currentUser?.displayName || null;
  const email = currentUser?.email || '';

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-content">
        <div className="dashboard-container">

          {/* Welcome Banner */}
          <section className="welcome-banner">
            <div className="welcome-text-group">
              <div className="status-pill">
                <span className="status-dot"></span>
                <span>Authenticated</span>
              </div>
              <h1 className="welcome-heading">
                {displayName ? `Welcome, ${displayName}` : 'Welcome to City-Safe'}
              </h1>
              <p className="welcome-subtext">{email}</p>
            </div>
            <div className="welcome-actions">
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger"
                id="dashboard-logout-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Log Out</span>
              </button>
            </div>
          </section>

          {/* Empty State Workspace */}
          <section className="empty-state-card">
            <div className="empty-state-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2 className="empty-state-title">Your City-Safe workspace is ready.</h2>
            <p className="empty-state-desc">
              City-Safe safety features — live incident maps, community reports, emergency tools, and alerts — will appear here once they are built.
            </p>
            <div className="empty-state-placeholder-row">
              <div className="empty-slot">Live Safety Map</div>
              <div className="empty-slot">Community Reports</div>
              <div className="empty-slot">Emergency Assistance</div>
              <div className="empty-slot">Safety Alerts</div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
