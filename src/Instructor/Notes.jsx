import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Logologin.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const navItems = [
  { icon: 'bi-speedometer2', label: 'DASHBOARD', path: '/instructor-dashboard' },
  { icon: 'bi-clock-history', label: 'HISTORY', path: '/history' },
  { icon: 'bi-journal-text', label: 'NOTES', path: '/Note2' },
  { icon: 'bi-people-fill', label: 'GROUP', path: '/Group2' },
  { icon: 'bi-box-arrow-right', label: 'LOGOUT', path: '/logout' },
];

const Notes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [expandedNoteIndex, setExpandedNoteIndex] = useState(null);

  const [notes, setNotes] = useState([
    {
      topic: 'TOPIC',
      description: 'UI (User Interface) is the part of an app or website that the user sees and interacts with — like buttons, menus, and screens.',
      subject: 'SUBJECT',
      date: '2025-01-20',
    },
  ]);

  const [formData, setFormData] = useState({ topic: '', description: '', subject: '', date: '' });

  const handleNavigation = (path) => {
    if (path === '/logout') {
      // Clear any auth state here if needed, then route to login
      navigate('/login', { replace: true });
    } else {
      navigate(path);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddNote = () => {
    const { topic, description, subject, date } = formData;
    if (!topic || !description || !subject || !date) return alert('All fields are required.');
    setNotes([{ ...formData }, ...notes]);
    setFormData({ topic: '', description: '', subject: '', date: '' });
    setShowForm(false);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const toggleNoteExpansion = (index) => {
    setExpandedNoteIndex(expandedNoteIndex === index ? null : index);
  };

  const notificationItems = [
    'New assignment added in IT Elective.',
    'Attendance marked successfully.',
    'Reminder: Meeting today at 3PM.',
  ];

  const formatDate = (rawDate) =>
    new Date(rawDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleProfileAction = (action) => {
    switch (action) {
      case 'profile':
        navigate('/instructor-profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        navigate('/login');
        break;
      default:
        break;
    }
    setShowDropdown(false);
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#f4f6fb', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 290, background: '#201B51', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', boxShadow: '2px 0 16px rgba(44,44,84,0.08)', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 60 }}>
          <img src={logo} alt="Logo" style={{ width: 300, height: 200, objectFit: 'contain', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
        </div>
        <nav style={{ width: '100%' }}>
          {navItems.map((item, idx) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
              isLast={idx === navItems.length - 1}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '48px 60px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: 36, color: '#23225c' }}>NOTES</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <i 
                className="bi bi-bell-fill" 
                style={{ fontSize: 22, color: '#23225c', cursor: 'pointer' }} 
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {showNotifications && (
                <div style={{ 
                  position: 'absolute', 
                  right: 0, 
                  top: '130%', 
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: 10,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  zIndex: 100,
                  minWidth: 250 
                }}>
                  {notificationItems.map((note, idx) => (
                    <div key={idx} style={notificationItemStyle}>{note}</div>
                  ))}
                </div>
              )}
            </div>
            <img 
              src="https://i.abcnewsfe.com/a/0a1c6627-6fdd-4cc3-8edf-d80790509c5a/emoji-1-abc-221220_1671573538915_hpEmbed_1x1.jpg" 
              alt="Profile" 
              style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} 
            />
            <div 
              onClick={() => setShowDropdown(!showDropdown)} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 10, 
                padding: '8px 16px', 
                border: '1px solid #ccc', 
                borderRadius: 20, 
                background: 'black', 
                cursor: 'pointer', 
                fontWeight: 700, 
                fontSize: 16, 
                minWidth: 100, 
                color: '#fff' 
              }}
            >
              Instructor Name <i className="bi bi-caret-down-fill" />
            </div>
            {showDropdown && (
              <div style={{ 
                position: 'absolute', 
                top: '100%', 
                right: 0, 
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: 10,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                zIndex: 99,
                minWidth: 180 
              }}>
                <div onClick={() => navigate('/I_Profile')} style={dropdownItemStyle}>View Profile</div>
                <div onClick={() => alert('Settings')} style={dropdownItemStyle}>Settings</div>
              </div>
            )}
          </div>
        </div>

        {/* Add Note Button */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => setShowForm(true)} 
            style={{
              background: '#7CFC00',
              color: '#23225c',
              padding: '12px 24px',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 15,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 2px 8px rgba(124,252,0,0.3)'
            }}
          >
            ADD NOTE <i className="bi bi-plus-lg"></i>
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={formContainerStyle}>
            <h3 style={{ margin: '0 0 20px 0', color: '#23225c', fontSize: 20, fontWeight: 700 }}>Add New Note</h3>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Topic</label>
              <input name="topic" value={formData.topic} onChange={handleInputChange} placeholder="Enter topic" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Enter description" 
                rows={3} 
                style={inputStyle} 
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Subject</label>
              <input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Enter subject" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowForm(false)} style={{ ...buttonStyle, background: '#ff4444' }}>Cancel</button>
              <button onClick={handleAddNote} style={{ ...buttonStyle, background: '#7CFC00' }}>Save</button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 40 }}>
          {notes.map((note, idx) => (
            <div key={idx} onClick={() => toggleNoteExpansion(idx)} style={noteCardStyle}>
              <div style={{ padding: '20px', color: '#fff' }}>
                <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{note.topic}</h3>
                {expandedNoteIndex === idx && (
                  <p style={{ margin: '12px 0 0 0', fontSize: 15, lineHeight: 1.5 }}>{note.description}</p>
                )}
              </div>
              <div style={noteFooterStyle}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{note.subject}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 13, color: '#23225c', fontWeight: 600 }}>{formatDate(note.date)}</span>
                  <i 
                    className="bi bi-trash" 
                    onClick={(e) => { e.stopPropagation(); handleDeleteNote(idx); }} 
                    style={{ cursor: 'pointer', color: '#23225c', fontSize: 18 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Styles
const notificationDropdownStyle = {
  position: 'absolute',
  right: 0,
  top: '130%',
  background: '#fff',
  border: '1px solid #ccc',
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  zIndex: 100,
  minWidth: 250
};

const notificationItemStyle = {
  padding: '10px 16px',
  fontSize: 14,
  color: '#23225c',
  borderBottom: '1px solid #eee'
};

const profileImageStyle = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  objectFit: 'cover'
};

const profileButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '8px 16px',
  border: '1px solid #ccc',
  borderRadius: 20,
  background: 'black',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: 16,
  minWidth: 100,
  color: '#fff'
};

const dropdownContainerStyle = {
  position: 'absolute',
  top: '100%',
  right: 0,
  background: '#fff',
  border: '1px solid #ccc',
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  zIndex: 99,
  minWidth: 180
};

const formContainerStyle = {
  background: '#fff',
  padding: 40,
  borderRadius: 16,
  marginBottom: 30,
  boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
};

const labelStyle = {
  display: 'block',
  marginBottom: 8,
  color: '#23225c',
  fontWeight: 600
};

const inputStyle = {
  width: '100%',
  padding: '10px 16px',
  border: '1px solid #ddd',
  borderRadius: 8,
  fontSize: 16,
  color: '#23225c'
};

const buttonStyle = {
  padding: '10px 24px',
  border: 'none',
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 600,
  color: '#23225c',
  cursor: 'pointer'
};

const noteCardStyle = {
  background: '#23225c',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  ':hover': {
    transform: 'translateY(-4px)'
  }
};

const noteFooterStyle = {
  background: '#FFD600',
  padding: '16px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const SidebarItem = ({ icon, label, path, isActive, isLast, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick} style={{ display: 'flex', alignItems: 'center', padding: '18px 38px', cursor: 'pointer', fontWeight: 600, fontSize: 20, background: isActive ? '#35348a' : hover ? '#35348a' : 'transparent', marginBottom: isLast ? 0 : 12, borderTopLeftRadius: 30, borderBottomLeftRadius: 30, transition: 'background 0.2s' }}>
      <i className={`bi ${icon}`} style={{ fontSize: 26, color: '#fff', marginRight: 22 }}></i>
      <span style={{ fontStyle: 'italic', color: '#fff', letterSpacing: 1 }}>{label}</span>
    </div>
  );
};

const dropdownItemStyle = {
  padding: '10px 16px',
  cursor: 'pointer',
  fontSize: 15,
  color: '#23225c',
  fontWeight: 500,
  borderBottom: '1px solid #eee',
  background: '#fff',
};

const dropdownIconStyle = {
  fontSize: 18,
  marginRight: 12,
  color: '#23225c'
};

export default Notes;
