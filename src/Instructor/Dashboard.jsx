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

// Mock data with Meet codes
const meetingData = [
  {
    group: 'IT ELECTIVE',
    studentId: '2025-001',
    name: 'Bacor, Zail Gray',
    date: '2025-09-25',
    codelink: 'abc-defg-hij',
    timeIn: '09:00 AM',
    timeOut: '10:30 AM',
    duration: '01:30:00',
    log: 'Present'
  },
  {
    group: 'IT ELECTIVE',
    studentId: '2025-002',
    name: 'Atillo, Sherly',
    date: '2025-09-25',
    codelink: 'abc-defg-hij',
    timeIn: '09:00 AM',
    timeOut: '10:30 AM',
    duration: '01:30:00',
    log: 'Present'
  },
  {
    group: 'IT ELECTIVE',
    studentId: '2025-003',
    name: 'Boneo, Trisha',
    date: '2025-09-25',
    codelink: 'abc-defg-hij',
    timeIn: '09:30 AM',
    timeOut: '10:30 AM',
    duration: '01:00:00',
    log: 'Late'
  },
];

const notificationItems = [
  'New student joined IT Elective class',
  'Attendance report generated',
  'Class schedule updated',
  'Meeting started in Room 301'
];

const Dashboard2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // filters
  const [filterDate, setFilterDate] = useState('');
  const [filterName, setFilterName] = useState('');

  const handleNavigation = (path) => {
    if (path === '/logout') {
      navigate('/login', { replace: true });
    } else {
      navigate(path);
    }
  };

  const filteredData = meetingData.filter((row) => {
    const matchesDate = filterDate ? row.date === filterDate : true;
    const matchesName = filterName
      ? row.name.toLowerCase().includes(filterName.toLowerCase())
      : true;
    return matchesDate && matchesName;
  });

  const dropdownItemStyle = {
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: 15,
    color: '#23225c',
    fontWeight: 500,
    borderBottom: '1px solid #eee',
    background: '#fff',
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

      {/* Main */}
      <main style={{ flex: 1, padding: '48px 60px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: 36, color: '#23225c' }}>DASHBOARD</h2>
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
                    <div
                      key={idx}
                      style={{
                        padding: '10px 16px',
                        fontSize: 14,
                        color: '#23225c',
                        borderBottom: '1px solid #eee'
                      }}
                    >
                      {note}
                    </div>
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

        {/* Table Section */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.06)', padding: 36, marginBottom: 30 }}>
          <h3 style={{ fontWeight: 800, fontSize: 26, marginBottom: 20, color: '#23225c' }}>REAL-TIME MEETING STATUS</h3>

          {/* Professional Filters */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 20, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>Filter by Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>Filter by Student</label>
              <input
                type="text"
                placeholder="Enter student name..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }}
              />
            </div>
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 17 }}>
            <thead>
              <tr style={{ background: '#EFEFFB', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                <th style={thStyle}>GROUP</th>
                <th style={thStyle}>DATE</th>
                <th style={thStyle}>CODELINK</th>
                <th style={thStyle}>STUDENT ID</th>
                <th style={thStyle}>STUDENT NAME</th>
                <th style={thStyle}>TIME IN</th>
                <th style={thStyle}>TIME OUT</th>
                <th style={thStyle}>DURATION</th>
                <th style={thStyle}>LOG</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e0e0e0', background: idx % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <td style={tdStyle}>{row.group}</td>
                    <td style={tdStyle}>{row.date}</td>
                    <td style={tdStyle}>{row.codelink}</td>
                    <td style={tdStyle}>{row.studentId}</td>
                    <td style={tdStyle}>{row.name}</td>
                    <td style={tdStyle}>{row.timeIn}</td>
                    <td style={tdStyle}>{row.timeOut}</td>
                    <td style={tdStyle}>{row.duration}</td>
                    <td style={{ ...tdStyle, color: statusColor(row.log), fontWeight: 700 }}>{row.log}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: 20, color: '#888' }}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Policy Section (below table) */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.06)', padding: 36 }}>
          <h3 style={{ fontWeight: 800, fontSize: 26, marginBottom: 20, color: '#23225c' }}>POLICY</h3>
          <ul style={{ paddingLeft: 22, fontSize: 18, marginBottom: 20, color: '#23225c' }}>
            <li>3 Lates = 1 Absent</li>
            <li>3 Consecutive Absents = D/F</li>
          </ul>
          <div style={{ fontStyle: 'italic', color: '#444', fontSize: 16 }}>
            Students must follow the rules. Participation will reflect their performance.
          </div>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, isActive, isLast, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '18px 38px',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 20,
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
      <span style={{ fontStyle: 'italic', color: '#fff' }}>{label}</span>
    </div>
  );
};

const thStyle = {
  padding: '16px 20px',
  fontWeight: 800,
  fontSize: 18,
  background: '#EFEFFB',
  color: '#23225c',
  borderBottom: '2px solid #ddd',
};

const tdStyle = {
  padding: '16px 20px',
  fontWeight: 600,
  color: '#333',
  fontSize: 17,
};

function statusColor(status) {
  if (status === 'Present') return '#2ecc40';
  if (status === 'Absent') return '#ff4136';
  if (status === 'Late') return '#ffb700';
  return '#888';
}

export default Dashboard2;
