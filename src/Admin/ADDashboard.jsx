import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logologin.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ADDashboard = () => {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState('STUDENT');

  const users = [
    { id: '202230556', name: 'First Name Last Name', role: 'Student', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Instructor', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Instructor', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Student', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Instructor', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Instructor', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Student', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Student', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Student', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Instructor', email: 'sample@gmail.com', department: 'CITC' },
  ];

  const handleLogout = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div style={styles.mainContainer}>
      {/* Header */}
      <div style={styles.header}>
        <img src={logo} alt="NE ATTEND Logo" style={styles.logo} />
        <div style={styles.adminControls}>
          <span style={styles.adminText}>ADMIN</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <i className="bi bi-box-arrow-right" style={{ marginRight: 8 }}></i>
            LOGOUT
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div style={styles.contentContainer}>
        {/* User Management Section */}
        <div style={styles.userManagementSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>User Management</h2>
            <select 
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
              style={styles.userTypeSelect}
            >
              <option value="STUDENT">STUDENT</option>
              <option value="INSTRUCTOR">INSTRUCTOR</option>
            </select>
          </div>

          {/* Users Table */}
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>User ID</th>
                  <th style={styles.th}>User Name</th>
                  <th style={styles.th}>User Role</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} style={styles.tr}>
                    <td style={styles.td}>{user.id}</td>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.role}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>{user.department}</td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button style={styles.editButton}>
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button style={styles.deleteButton}>
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rules Section */}
        <div style={styles.rulesSection}>
          <h3 style={styles.ruleTitle}>Set Rule</h3>
          
          <div style={styles.ruleForm}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Absent Rule</label>
              <select style={styles.select}>
                <option>3 consecutive absent = D/F</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Late Rule</label>
              <select style={styles.select}>
                <option>3 consecutive Late = 1 Absent</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>NOTIFY STUDENT</label>
              <div style={styles.notifyCheckbox}>
                <input type="checkbox" id="notifyStudent" />
                <label htmlFor="notifyStudent">Send notifications to students</label>
              </div>
            </div>

            <div style={styles.policyNote}>
              <h4 style={styles.policyTitle}>Policy note</h4>
              <div style={styles.policyList}>
                <p style={styles.policyText}>• 3 Lates = 1 Absent</p>
                <p style={styles.policyText}>• 3 Consecutive Absent = D/F</p>
                <p style={styles.policyText}>
                  Student must follow the rules. The participation will reflect their performance.
                </p>
              </div>
            </div>

            <button style={styles.postButton}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    minHeight: '100vh',
    width: '100vw',
    background: '#f4f6fb',
    fontFamily: 'Segoe UI, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden' // Keep this to prevent body scroll
  },
  header: {
    background: '#23225c',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  logo: {
    height: 60,
    width: 'auto'
  },
  adminControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 24
  },
  adminText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: 0.5
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    background: 'transparent',
    border: '2px solid #fff',
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  contentContainer: {
    padding: 40,
    display: 'flex',
    gap: 40,
    flex: 1,
    overflowY: 'auto', // Enable vertical scrolling
    height: 'calc(100vh - 100px)' // Subtract header height
  },
  userManagementSection: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0 // Allow flex shrinking
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#23225c',
    margin: 0,
    letterSpacing: 0.5
  },
  userTypeSelect: {
    padding: '10px 20px',
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    color: '#23225c',
    cursor: 'pointer'
  },
  tableWrapper: {
    background: '#fff',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    overflowX: 'auto', // Enable horizontal scroll for table if needed
    maxHeight: 'calc(100vh - 280px)', // Give space for header and other elements
    minHeight: '200px' // Minimum height for better appearance
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '800px' // Prevent table from becoming too narrow
  },
  th: {
    textAlign: 'left',
    padding: '16px 20px',
    background: '#f8f9fa',
    color: '#23225c',
    fontWeight: 700,
    fontSize: 15,
    borderBottom: '2px solid #eee'
  },
  tr: {
    borderBottom: '1px solid #eee',
    transition: 'background-color 0.2s ease'
  },
  td: {
    padding: '16px 20px',
    fontSize: 15,
    color: '#444'
  },
  actionButtons: {
    display: 'flex',
    gap: 8
  },
  editButton: {
    padding: '8px 12px',
    background: '#23225c',
    border: 'none',
    borderRadius: 6,
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  deleteButton: {
    padding: '8px 12px',
    background: '#ff4444',
    border: 'none',
    borderRadius: 6,
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  rulesSection: {
    flex: 1,
    background: '#fff',
    borderRadius: 16,
    padding: 28,
    height: 'fit-content',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    minWidth: '300px', // Minimum width for rules section
    maxHeight: 'calc(100vh - 180px)', // Maximum height
    overflowY: 'auto' // Enable vertical scrolling if needed
  },
  ruleTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#23225c',
    marginBottom: 24,
    letterSpacing: 0.5
  },
  ruleForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  label: {
    fontSize: 15,
    fontWeight: 600,
    color: '#23225c'
  },
  select: {
    padding: '12px 16px',
    fontSize: 15,
    borderRadius: 8,
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    color: '#23225c',
    cursor: 'pointer'
  },
  notifyCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#444'
  },
  policyNote: {
    background: '#f8f9fa',
    padding: 24,
    borderRadius: 12,
    border: '1px solid #eee'
  },
  policyTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: '#23225c',
    marginBottom: 16,
    letterSpacing: 0.5
  },
  policyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  policyText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 1.5,
    margin: 0
  },
  postButton: {
    padding: '12px 24px',
    background: '#23225c',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    alignSelf: 'flex-end',
    marginTop: 16,
    transition: 'transform 0.2s ease',
    boxShadow: '0 2px 8px rgba(35,34,92,0.2)'
  }
};

export default ADDashboard;