import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const navItems = [
  { icon: 'bi-speedometer2', label: 'DASHBOARD', path: '/dashboard' },
  { icon: 'bi-clipboard-check', label: 'ATTENDANCE LOGS', path: '/attendance-logs' },
  { icon: 'bi-journal-text', label: 'NOTES', path: '/notes' },
  { icon: 'bi-people-fill', label: 'GROUP', path: '/group' },
  { icon: 'bi-box-arrow-right', label: 'LOGOUT', path: '/logout' },
];

const dropdownItemStyle = {
  padding: '10px 16px',
  cursor: 'pointer',
  fontSize: 15,
  color: '#23225c',
  fontWeight: 500,
  borderBottom: '1px solid #eee',
  background: '#fff',
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  fontSize: 16,
  borderRadius: 8,
  border: '1px solid #ccc',
  outline: 'none',
};

const buttonStyle = {
  color: '#fff',
  padding: '10px 18px',
  border: 'none',
  borderRadius: 6,
  fontWeight: 600,
  fontSize: 15,
  cursor: 'pointer',
};

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

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', fontFamily: 'Segoe UI, sans-serif', background: '#f4f6fb', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{ width: 290, background: '#201B51', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', boxShadow: '2px 0 16px rgba(44,44,84,0.08)', height: '100vh' }}>
        <img src={logo} alt="Logo" style={{ width: 300, height: 200, objectFit: 'contain', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', marginBottom: 60 }} />
        <nav style={{ width: '100%' }}>
          {navItems.map((item, idx) => (
            <SidebarItem key={item.label} icon={item.icon} label={item.label} path={item.path} isActive={location.pathname === item.path} isLast={idx === navItems.length - 1} onClick={() => handleNavigation(item.path)} />
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '48px 60px', height: '100vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: 36, color: '#23225c' }}>GROUP</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <i className="bi bi-bell-fill" style={{ fontSize: 22, color: '#23225c', cursor: 'pointer' }} onClick={() => setShowNotifications(!showNotifications)}></i>
              {showNotifications && (
                <div style={{ position: 'absolute', right: 0, top: '130%', background: '#fff', border: '1px solid #ccc', borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', zIndex: 100, minWidth: 250 }}>
                  {notificationItems.map((note, idx) => (
                    <div key={idx} style={{ padding: '10px 16px', fontSize: 14, color: '#23225c', borderBottom: '1px solid #eee' }}>{note}</div>
                  ))}
                </div>
              )}
            </div>
            <img src="https://i.abcnewsfe.com/a/0a1c6627-6fdd-4cc3-8edf-d80790509c5a/emoji-1-abc-221220_1671573538915_hpEmbed_1x1.jpg" alt="Profile" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
            <div onClick={() => setShowDropdown(!showDropdown)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', border: '1px solid #ccc', borderRadius: 20, background: 'black', cursor: 'pointer', fontWeight: 700, fontSize: 16, minWidth: 100, color: '#fff' }}>
              Student Name <i className="bi bi-caret-down-fill"></i>
            </div>
            {showDropdown && (
              <div style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', border: '1px solid #ccc', borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', zIndex: 99, minWidth: 180 }}>
                <div onClick={() => navigate('/profile')} style={dropdownItemStyle}>View Profile</div>
                <div onClick={() => alert('Settings')} style={dropdownItemStyle}>Settings</div>
              </div>
            )}
          </div>
        </div>

        {/* Add Note Button */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => setShowForm(true)} style={{ background: '#201B51', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 16 }}>
            + Add Note
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={{ background: '#fff', padding: 20, borderRadius: 12, marginBottom: 30, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: 12 }}><input name="topic" value={formData.topic} onChange={handleInputChange} placeholder="Topic" style={inputStyle} /></div>
            <div style={{ marginBottom: 12 }}><textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" rows={3} style={inputStyle} /></div>
            <div style={{ marginBottom: 12 }}><input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" style={inputStyle} /></div>
            <div style={{ marginBottom: 12 }}>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleAddNote} style={{ ...buttonStyle, background: '#28a745' }}>Save</button>
              <button onClick={() => setShowForm(false)} style={{ ...buttonStyle, background: '#dc3545' }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, marginBottom: 40 }}>
          {notes.map((note, idx) => (
            <div key={idx} onClick={() => toggleNoteExpansion(idx)} style={{ background: '#23225c', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(44,44,84,0.08)', minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ padding: '18px', color: '#fff', fontWeight: 700, fontSize: 20, letterSpacing: 1 }}>
                {note.topic}
                {expandedNoteIndex === idx && <div style={{ fontWeight: 400, fontSize: 14, marginTop: 10 }}>{note.description}</div>}
              </div>
              <div style={{ background: '#FFD600', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{note.subject}</span>
                <span style={{ fontSize: 13, color: '#23225c', fontWeight: 600 }}>{formatDate(note.date)}</span>
                <i className="bi bi-trash" onClick={(e) => { e.stopPropagation(); handleDeleteNote(idx); }} style={{ marginLeft: 10, cursor: 'pointer', color: '#23225c', fontSize: 18 }}></i>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
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

export default Notes;
