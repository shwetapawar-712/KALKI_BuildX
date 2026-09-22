import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const getInitials = (name, email) => {
    if (name && name.trim()) {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return 'CS';
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/dashboard" className="brand-link">
          <div className="brand-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className="brand-text-group">
            <span className="brand-title">City-Safe</span>
            <span className="brand-badge">Civic Defense</span>
          </div>
        </Link>

        {currentUser && (
          <div className="navbar-actions">
            <div className="user-profile-chip" title={currentUser.email || ''}>
              <div className="user-avatar">
                {getInitials(currentUser.displayName, currentUser.email)}
              </div>
              <div className="user-details">
                <span className="user-name">{currentUser.displayName || 'Authorized Agent'}</span>
                <span className="user-email">{currentUser.email}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary btn-sm logout-btn"
              id="logout-btn"
              title="Sign out of City-Safe"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
