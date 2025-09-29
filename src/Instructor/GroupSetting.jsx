import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const GroupSettings = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    groupName: 'IT ELECTIVE',
    timeSchedule: '09:00',
    day: 'monday',
    meetingLink: 'abc-defg-hijk',
    lateRuleTime: '15',
    section: 'IT3R10'
  });
  const [members] = useState([
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com'
  ]);

  const handleInputChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteGroup = () => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      navigate('/Group2');
    }
  };

  const handleInvite = () => {
    console.log('Inviting members');
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    // Add logic to save changes
    console.log('Saving changes:', formData);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.backButton} onClick={() => navigate('/Group2')}>
            <i className="bi bi-arrow-left" style={{ fontSize: 24 }}></i>
          </div>
          <h2 style={styles.title}>GROUP SETTINGS</h2>
          <button 
            onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
            style={{
              ...styles.editButton,
              backgroundColor: isEditing ? '#7CFC00' : '#23225c'
            }}
          >
            {isEditing ? 'Save Changes' : 'Edit Group'}
          </button>
        </div>

        {/* Form */}
        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>GROUP NAME</label>
            <input 
              type="text"
              name="groupName"
              value={formData.groupName}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                backgroundColor: isEditing ? '#fff' : '#f5f5f5',
                cursor: isEditing ? 'text' : 'default'
              }}
              readOnly={!isEditing}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>TIME SCHEDULE</label>
            <input 
              type="time"
              name="timeSchedule"
              value={formData.timeSchedule}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                backgroundColor: isEditing ? '#fff' : '#f5f5f5',
                cursor: isEditing ? 'text' : 'default'
              }}
              readOnly={!isEditing}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>DAY</label>
            <select 
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              style={{
                ...styles.select,
                backgroundColor: isEditing ? '#fff' : '#f5f5f5',
                cursor: isEditing ? 'pointer' : 'default'
              }}
              disabled={!isEditing}
            >
              <option value="">Select Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>MEETING LINK</label>
            <input 
              type="text"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                backgroundColor: isEditing ? '#fff' : '#f5f5f5',
                cursor: isEditing ? 'text' : 'default'
              }}
              readOnly={!isEditing}
            />
          </div>

          <div style={styles.rowContainer}>
            <div style={styles.halfWidth}>
              <label style={styles.label}>LATE RULE TIME</label>
              <select 
                name="lateRuleTime"
                value={formData.lateRuleTime}
                onChange={handleInputChange}
                style={{
                  ...styles.select,
                  backgroundColor: isEditing ? '#fff' : '#f5f5f5',
                  cursor: isEditing ? 'pointer' : 'default'
                }}
                disabled={!isEditing}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
              </select>
            </div>
            <div style={styles.halfWidth}>
              <label style={styles.label}>SECTION</label>
              <input 
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                style={{
                  ...styles.input,
                  backgroundColor: isEditing ? '#fff' : '#f5f5f5',
                  cursor: isEditing ? 'text' : 'default'
                }}
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.memberHeader}>
              <label style={styles.label}>MEMBER</label>
              <button 
                type="button"
                onClick={handleInvite}
                style={{
                  ...styles.inviteButton,
                  opacity: isEditing ? 1 : 0.5,
                  cursor: isEditing ? 'pointer' : 'not-allowed'
                }}
                disabled={!isEditing}
              >
                Invite
              </button>
            </div>
            <div style={styles.memberList}>
              {members.map((email, idx) => (
                <div key={idx} style={styles.memberItem}>
                  <div style={styles.memberAvatar}>
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <span style={styles.memberEmail}>{email}</span>
                  {isEditing && (
                    <button style={styles.removeButton}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button 
              type="button"
              onClick={handleDeleteGroup}
              style={{
                ...styles.deleteButton,
                opacity: isEditing ? 1 : 0.5,
                cursor: isEditing ? 'pointer' : 'not-allowed'
              }}
              disabled={!isEditing}
            >
              DELETE Group
            </button>
            <button
              type="button"
              onClick={() => navigate('/Group2')}
              style={styles.startButton}
            >
              Start Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    maxWidth: 800,
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '32px 40px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 32
  },
  backButton: {
    cursor: 'pointer',
    marginRight: 24,
    color: 'black' // Changed from '#23225c'
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    color: 'black' // Changed from '#23225c'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: 'black' // Changed from '#23225c'
  },
  input: {
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid #ddd',
    fontSize: 16,
    color: 'black' // Added color
  },
  rowContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24
  },
  halfWidth: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  select: {
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid #ddd',
    fontSize: 16,
    backgroundColor: '#fff',
    color: 'black' // Added color
  },
  memberHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  inviteButton: {
    backgroundColor: '#7CFC00',
    color: 'black', // Changed from '#23225c'
    border: 'none',
    padding: '8px 24px',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer'
  },
  memberList: {
    border: '1px solid #ddd',
    borderRadius: 8,
    maxHeight: 200,
    overflowY: 'auto'
  },
  memberItem: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    borderBottom: '1px solid #eee'
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  memberEmail: {
    fontSize: 15,
    color: 'black' // Changed from '#333'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 32
  },
  rightButtons: {
    display: 'flex',
    gap: 16
  },
  deleteButton: {
    padding: '12px 24px',
    backgroundColor: '#ff4444',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    width: '200px'
  },
  saveButton: {
    padding: '12px 24px',
    backgroundColor: '#23225c',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer'
  },
  startButton: {
    padding: '12px 24px',
    backgroundColor: '#7CFC00',
    color: 'black', // Changed from '#23225c'
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer'
  },
  editButton: {
    padding: '8px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    marginLeft: 'auto'
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: '#ff4444',
    cursor: 'pointer',
    marginLeft: 'auto',
    padding: 4
  }
};

export default GroupSettings;