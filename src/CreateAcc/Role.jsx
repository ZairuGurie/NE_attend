import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Role = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

const handleNext = async (e) => {
  e.preventDefault();
  if (!role) {
    alert('Please select a Role.');
    return;
  }

  try {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      alert("User ID is missing. Please restart the registration.");
      return;
    }

    const res = await fetch("http://localhost/NE_ATTEND/Backend/update_role.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, role }),
    });

    const data = await res.json();
    console.log(data);

    if (data.message) {
      navigate('/role/dep-course'); // proceed to next step
    } else {
      alert(data.error || "Something went wrong");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Server error");
  }
};


  return (
    <div style={styles.screen}>
      <div style={styles.title}>CREATE ACCOUNT</div>

      <button aria-label="Go back" onClick={handleBack} style={styles.backBtn}>
        <span style={{ fontSize: 50 }}>←</span>
      </button>

      <div style={styles.card}>
        <form onSubmit={handleNext} style={styles.form}>
          {/* Role Selection */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
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
    width: '99%',
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

export default Role;
