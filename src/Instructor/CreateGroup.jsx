import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    groupName: '',
    timeSchedule: '',
    day: '',
    meetingLink: '',
    lateRuleTime: '15',
    section: ''
  });
  const [members, setMembers] = useState([
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com'
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateGroup = () => {
    // Add your group creation logic here
    console.log('Creating group with data:', formData);
    console.log('Members:', members);
    navigate('/Group2'); // Navigate back to Groups page after creation
  };

  const handleInvite = () => {
    // Add your invite logic here
    console.log('Inviting members');
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.backButton} onClick={() => navigate('/Group2')}>
            <i className="bi bi-arrow-left" style={{ fontSize: 24 }}></i>
          </div>
          <h2 style={styles.title}>GROUP</h2>
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
              placeholder="IT ELECTIVE"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>TIME SCHEDULE</label>
            <input 
              type="time"
              name="timeSchedule"
              value={formData.timeSchedule}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>DAY</label>
            <select 
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              style={styles.input}
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
              placeholder="abc-defg-hijk"
              style={styles.input}
            />
          </div>

          <div style={styles.rowContainer}>
            <div style={styles.halfWidth}>
              <label style={styles.label}>LATE RULE TIME</label>
              <select 
                name="lateRuleTime"
                value={formData.lateRuleTime}
                onChange={handleInputChange}
                style={styles.select}
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
                placeholder="Section Name"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.memberHeader}>
              <label style={styles.label}>MEMBER</label>
              <button 
                type="button"
                onClick={handleInvite}
                style={styles.inviteButton}
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
                </div>
              ))}
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={handleCreateGroup}
              style={styles.saveButton}
            >
              Create Group/Save
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
    color: '#23225c'
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    color: '#23225c'
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
    color: '#23225c'
  },
  input: {
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid #ddd',
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000000' // Changed to black
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
    color: '#000000' // Changed to black
  },
  memberHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  inviteButton: {
    backgroundColor: '#7CFC00',
    color: '#23225c',
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
    color: '#000000' // Changed to black
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end', // Changed from space-between
    marginTop: 32
  },
  rightButtons: {
    display: 'flex',
    gap: 16
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
  }
};

export default CreateGroup;