import React from 'react';
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

const attendanceData = [
  { group: 'IT ELECTIVE', code: 'abc-defg-hjk', start: '7:00', end: '8:30', duration: '01:30:00', date: '6/2/25', status: 'Present' },
  { group: 'IT ELECTIVE', code: 'abc-defg-hjk', start: '7:00', end: '8:30', duration: '01:30:00', date: '6/2/25', status: 'Late' },
  { group: 'IT ELECTIVE', code: 'abc-defg-hjk', start: '7:00', end: '8:30', duration: '01:30:00', date: '6/4/25', status: 'Absent' },
  { group: 'IT ELECTIVE', code: 'abc-defg-hjk', start: '7:00', end: '8:30', duration: '01:30:00', date: '6/6/25', status: 'Present' },
  { group: 'IT ELECTIVE', code: 'abc-defg-hjk', start: '7:00', end: '8:30', duration: '00:30:34', date: '6/6/25', status: 'Present' },
  { group: 'IT ELECTIVE', code: 'abc-defg-hjk', start: '7:00', end: '8:30', duration: '01:30:00', date: '6/5/25', status: 'Late' },
  { group: 'IT ELECTIVE', code: 'abc-defg-hjk', start: '7:00', end: '8:30', duration: '01:30:00', date: '6/5/25', status: 'Absent' },
];

const AttendanceLogs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const handleNavigation = (path) => {
    if (path === '/logout') {
      // Clear any auth state here if needed, then route to login
      navigate('/login', { replace: true });
    } else {
      navigate(path);
    }
  };

  const dropdownItemStyle = {
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: 15,
    color: '#23225c',
    fontWeight: 500,
    borderBottom: '1px solid #eee',
    background: '#fff'
  };

  const notificationItems = [
    'New assignment added in IT Elective.',
    'Attendance marked successfully.',
    'Reminder: Meeting today at 3PM.',
  ];

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif', background: '#f4f6fb', overflow: 'hidden' }}>
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
      <main style={{ flex: 1, padding: '48px 60px', height: '100vh', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: 36, color: '#23225c' }}>ATTENDANCE LOGS</h2>
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

        {/* Filters and Table */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#555' }}>0 out of 20 selected</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <select style={filterSelectStyle}><option>Subject</option></select>
            <select style={filterSelectStyle}><option>Date</option></select>
            <select style={filterSelectStyle}><option>Status</option></select>
          </div>
        </div>

        {/* Attendance Table */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)', padding: 36 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 17 }}>
            <thead>
              <tr style={{ background: '#EFEFFB', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                <th style={thStyle}>GROUP</th>
                <th style={thStyle}>MEETING CODE</th>
                <th style={thStyle}>SESSION START TIME</th>
                <th style={thStyle}>SESSION END TIME</th>
                <th style={thStyle}>DURATION</th>
                <th style={thStyle}>DATE</th>
                <th style={thStyle}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((row, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #e0e0e0',
                  background: idx % 2 === 0 ? '#f9f9f9' : '#fff'
                }}>
                  <td style={tdStyle}>{row.group}</td>
                  <td style={tdStyle}>{row.code}</td>
                  <td style={tdStyle}>{row.start}</td>
                  <td style={tdStyle}>{row.end}</td>
                  <td style={tdStyle}>{row.duration}</td>
                  <td style={tdStyle}>{row.date}</td>
                  <td style={{ ...tdStyle, color: statusColor(row.status), fontWeight: 700 }}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export Record Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 30 }}>
          <button style={{ background: '#28a745', color: '#fff', padding: '12px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, boxShadow: '0 2px 8px rgba(40,167,69,0.2)' }}>
            Export Record
          </button>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, path, isActive, isLast, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '18px 38px',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 20,
        letterSpacing: 0.5,
        background: isActive ? '#35348a' : hover ? '#35348a' : 'transparent',
        marginBottom: isLast ? 0 : 12,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        transition: 'background 0.2s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <i className={`bi ${icon}`} style={{ fontSize: 26, color: '#fff', marginRight: 22 }}></i>
      <span style={{ fontStyle: 'italic', color: '#fff', letterSpacing: 1 }}>{label}</span>
    </div>
  );
};

const thStyle = {
  padding: '16px 20px',
  fontWeight: 800,
  fontSize: 18,
  letterSpacing: 0.5,
  background: '#EFEFFB',
  color: '#23225c',
  borderBottom: '2px solid #ddd',
};

const tdStyle = {
  padding: '16px 20px',
  fontWeight: 600,
  color: '#333',
  fontSize: 17,
  verticalAlign: 'middle',
};

const filterSelectStyle = {
  border: '1px solid #ccc',
  borderRadius: 8,
  padding: '8px 16px',
  fontSize: 16,
  fontWeight: 500,
  color: '#333',
  background: '#fff',
  cursor: 'pointer',
  outline: 'none',
};

function statusColor(status) {
  if (status === 'Present') return '#2ecc40';
  if (status === 'Absent') return '#ff4136';
  if (status === 'Late') return '#ffb700';
  return '#888';
}

export default AttendanceLogs;
