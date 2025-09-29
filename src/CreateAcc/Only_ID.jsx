import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Only_ID = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!userId) {
      alert('Please enter your User ID.');
      return;
    }
    // TODO: persist selections if needed
    navigate('/onlyid/concode'); // adjust route if different
  };

  return (
    <div style={styles.screen}>
      <div style={styles.title}>CREATE ACCOUNT</div>

      <button aria-label="Go back" onClick={handleBack} style={styles.backBtn}>
        <span style={{ fontSize: 50 }}>←</span>
      </button>

      <div style={styles.card}>
        <form onSubmit={handleNext} style={styles.form}>
          {/* User ID Input */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>User ID</label>
            <input
              type="text"
              value={userId}
              placeholder="Enter your User ID"
              onChange={(e) => setUserId(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.actionsRow}>
            <button type="submit" style={styles.nextBtn}>
              <span style={{ marginRight: 12, fontWeight: 700 }}>NEXT</span>
              <span style={{ fontSize: 18 }}>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  screen: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff',
    paddingTop: 0,
    position: 'relative',
    boxSizing: 'border-box'
  },
  title: {
    position: 'absolute',
    top: 200,
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: 0.6,
    color: '#111',
    fontFamily: 'Segoe UI, Arial, sans-serif'
  },
  backBtn: {
    position: 'absolute',
    top: 92,
    left: '14%',
    borderRadius: 8,
    border: 'none',
    background: 'transparent',
    color: '#111',
    cursor: 'pointer',
  },
  card: {
    width: 640,
    maxWidth: '92vw',
    background: '#201B51',
    borderRadius: 16,
    padding: '40px 48px',
    boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
    color: '#fff'
  },
  form: {
    width: '100%'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#d7d8ff',
    marginBottom: 10
  },
  input: {
    width: '95%',
    height: 48,
    borderRadius: 14,
    border: 'none',
    outline: 'none',
    padding: '0 16px',
    fontSize: 16,
    background: '#ffffff',
    color: '#111'
  },
  actionsRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 28
  },
  nextBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 22px',
    borderRadius: 22,
    border: 'none',
    background: '#10b981',
    color: '#ffffff',
    fontWeight: 700,
    letterSpacing: 0.4,
    cursor: 'pointer',
    boxShadow: '0 6px 16px rgba(16,185,129,0.35)',
  }
};

export default Only_ID;
