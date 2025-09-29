import React from 'react';
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Redirect user after confirmation
    navigate('/login'); // adjust route to where user should go next
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.screen}>
      <div style={styles.title}>CREATE ACCOUNT</div>

      <button aria-label="Go back" onClick={handleBack} style={styles.backBtn}>
        <span style={{ fontSize: 40 }}>←</span>
      </button>

      <div style={styles.card}>
        <h3 style={styles.subtitle}>ACCOUNT CREATED</h3>
        <h1 style={styles.success}>SUCCESSFULLY</h1>

        {/* Checkmark */}
        <div style={styles.checkCircle}>
          <span style={styles.checkMark}>✔</span>
        </div>

        <div style={styles.actionsRow}>
          <button onClick={handleConfirm} style={styles.confirmBtn}>
            Confirm
          </button>
        </div>
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
    top: 120,
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: 0.6,
    color: '#111',
    fontFamily: 'Segoe UI, Arial, sans-serif',
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
    width: 480,
    maxWidth: '90vw',
    background: '#1E1A50',
    borderRadius: 16,
    padding: '40px 30px',
    boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 4,
    color: '#fff',
    letterSpacing: 0.6,
  },
  success: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 24,
    color: '#fff',
    letterSpacing: 0.8,
  },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    background: '#10b981',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 30px auto',
  },
  checkMark: {
    fontSize: 60,
    fontWeight: 700,
    color: '#111',
  },
  actionsRow: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  confirmBtn: {
    padding: '10px 24px',
    borderRadius: 22,
    border: 'none',
    background: '#10b981',
    color: '#111',
    fontStyle: 'italic',
    fontWeight: 500,
    cursor: 'pointer',
    fontSize: 14,
  }
};

export default Confirm;
