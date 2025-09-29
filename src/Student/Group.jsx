import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/logo.png';

const navItems = [
  { icon: 'bi-speedometer2', label: 'DASHBOARD', path: '/dashboard' },
  { icon: 'bi-clipboard-check', label: 'ATTENDANCE LOGS', path: '/attendance-logs' },
  { icon: 'bi-journal-text', label: 'NOTES', path: '/notes' },
  { icon: 'bi-people-fill', label: 'GROUP', path: '/group' },
  { icon: 'bi-box-arrow-right', label: 'LOGOUT', path: '/logout' },
];

const groupCards = [
  { title: 'IT ELECTIVE', instructor: 'Mr. Angelo Alejo', time: 'Monday/Thursday | 9:00 - 10:00 AM', members: 43, duration: '1 hour', date: 'May 8, 2025', section: 'IT3R10', subjectId: '1234567889', present: 23, absent: 2, late: 9 },
  { title: 'IT ELECTIVE', instructor: 'Mr. Angelo Alejo', time: '12 pm today', members: 43 },
  { title: 'IT ELECTIVE', instructor: 'Mr. Angelo Alejo', time: '12 pm today', members: 43 },
  { title: 'IT ELECTIVE', instructor: 'Mr. Angelo Alejo', time: '12 pm today', members: 43 },
  { title: 'IT ELECTIVE', instructor: 'Mr. Angelo Alejo', time: '12 pm today', members: 43 },
  { title: 'IT ELECTIVE', instructor: 'Mr. Angelo Alejo', time: '12 pm today', members: 43 },
];

const Group = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [modalIdx, setModalIdx] = React.useState(null);
  const [showJoinModal, setShowJoinModal] = React.useState(false);
  const [groupId, setGroupId] = React.useState('');

  const handleNavigation = (path) => {
    if (path === '/logout') {
      // Clear any auth state here if needed, then route to login
      navigate('/login', { replace: true });
    } else {
      navigate(path);
    }
  };

  const handleJoinRequest = (e) => {
    e.preventDefault();
    // Add your join request logic here
    console.log('Requesting to join group:', groupId);
    setGroupId('');
    setShowJoinModal(false);
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
    <div style={{ display: 'flex', width: '100vw', height: '100vh', fontFamily: 'Segoe UI, sans-serif', background: '#f4f6fb', overflow: 'hidden' }}>
      <aside style={{ width: 290, background: '#201B51', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', boxShadow: '2px 0 16px rgba(44,44,84,0.08)', height: '100vh' }}>
        <img src={logo} alt="Logo" style={{ width: 300, height: 200, objectFit: 'contain', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', marginBottom: 60 }} />
        <nav style={{ width: '100%' }}>
          {navItems.map((item, idx) => (
            <SidebarItem key={item.label} icon={item.icon} label={item.label} path={item.path} isActive={location.pathname === item.path} isLast={idx === navItems.length - 1} onClick={() => handleNavigation(item.path)} />
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '48px 60px', height: '100vh', overflowY: 'auto', background: '#fff' }}>
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

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button 
            onClick={() => setShowJoinModal(true)} 
            style={{ 
              background: '#7CFC00', 
              color: '#23225c', 
              fontWeight: 700, 
              fontSize: 16, 
              padding: '10px 28px', 
              borderRadius: 8, 
              border: 'none', 
              cursor: 'pointer', 
              boxShadow: '0 2px 8px rgba(44,44,84,0.08)', 
              letterSpacing: 1, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8 
            }}
          >
            REQUEST TO JOIN <span style={{ fontSize: 22, marginLeft: 6 }}>+</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 40 }}>
          {groupCards.map((card, idx) => (
            <GroupCard key={idx} {...card} onDotsClick={() => setModalIdx(idx)} />
          ))}
        </div>
        {modalIdx !== null && (
          <GroupDetailsModal card={groupCards[modalIdx]} onClose={() => setModalIdx(null)} />
        )}

        {showJoinModal && (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: 'rgba(0,0,0,0.25)', 
            zIndex: 9999, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <div style={{ 
              background: '#fff', 
              borderRadius: 16, 
              padding: 36, 
              width: 400,
              maxWidth: '90vw',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              position: 'relative'
            }}>
              <button 
                onClick={() => setShowJoinModal(false)} 
                style={{ 
                  position: 'absolute', 
                  top: 18, 
                  right: 18, 
                  background: 'transparent', 
                  border: 'none', 
                  fontSize: 28, 
                  color: '#232323', 
                  cursor: 'pointer', 
                  fontWeight: 700 
                }}
              >
                &times;
              </button>
              <h2 style={{ 
                margin: '0 0 24px 0', 
                fontSize: 24, 
                fontWeight: 700, 
                color: 'black' 
              }}>
                Request to Join Group
              </h2>
              <form onSubmit={handleJoinRequest}>
                <div style={{ marginBottom: 24 }}>
                  <label 
                    htmlFor="groupId" 
                    style={{ 
                      display: 'block', 
                      marginBottom: 8, 
                      fontSize: 15, 
                      fontWeight: 600, 
                      color: 'black' 
                    }}
                  >
                    Enter Group ID
                  </label>
                  <input
                    id="groupId"
                    type="text"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    placeholder="abc-defg-hijk"
                    style={{
                      width: '85',
                      padding: '12px 16px',
                      fontSize: 16,
                      border: '1px solid #ddd',
                      borderRadius: 8,
                      background: '#fff',
                      color: 'black'
                    }}
                    required
                  />
                </div>
                <div style={{ 
                  display: 'flex', 
                  gap: 12, 
                  justifyContent: 'flex-end' 
                }}>
                  <button
                    type="button"
                    onClick={() => setShowJoinModal(false)}
                    style={{
                      padding: '10px 24px',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 600,
                      background: '#ff4444',
                      color: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 24px',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 600,
                      background: '#7CFC00',
                      color: '#23225c',
                      cursor: 'pointer'
                    }}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, path, isActive, isLast, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick} style={{ display: 'flex', alignItems: 'center', padding: '18px 38px', cursor: 'pointer', fontWeight: 600, fontSize: 20, background: isActive ? '#35348a' : hover ? '#35348a' : 'transparent', marginBottom: isLast ? 0 : 12, borderTopLeftRadius: 30, borderBottomLeftRadius: 30, transition: 'background 0.2s' }}>
      <i className={`bi ${icon}`} style={{ fontSize: 26, color: '#fff', marginRight: 22 }}></i>
      <span style={{ fontStyle: 'italic', color: '#fff', letterSpacing: 1 }}>{label}</span>
    </div>
  );
};

const GroupCard = ({ title, instructor, time, members, onDotsClick }) => (
  <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(44,44,84,0.08)', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
    <div style={{ background: '#23225c', padding: '20px 18px 10px 18px', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
      <div style={{ color: '#fff', fontWeight: 800, fontSize: 22, letterSpacing: 1, lineHeight: 1 }}>{title}</div>
      <div style={{ fontWeight: 400, fontSize: 15, color: '#fff', marginTop: 6 }}>{instructor}</div>
    </div>
    <div style={{ background: '#FFD600', padding: '18px', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, display: 'flex', flexDirection: 'column', height: 120, justifyContent: 'space-between', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <i className="bi bi-camera-video-fill" style={{ fontSize: 28, color: '#23225c', marginTop: 2 }}></i>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#23225c', lineHeight: 1 }}>{title}</span>
          <span style={{ fontWeight: 500, fontSize: 13, color: '#23225c', marginTop: 2 }}>{time}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
        <i className="bi bi-three-dots" style={{ fontSize: 24, color: '#23225c', opacity: 0.8, cursor: 'pointer' }} onClick={onDotsClick}></i>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <i className="bi bi-people-fill" style={{ fontSize: 28, color: '#23225c' }}></i>
          <span style={{ fontWeight: 700, fontSize: 20, color: '#23225c' }}>{members}</span>
        </div>
      </div>
    </div>
  </div>
);

const GroupDetailsModal = ({ card, onClose }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ background: '#fff', border: '1px solid #232323', borderRadius: 6, padding: 36, minWidth: 420, maxWidth: 600, width: '90vw', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', position: 'relative' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 18, background: 'transparent', border: 'none', fontSize: 28, color: '#232323', cursor: 'pointer', fontWeight: 700 }}>&times;</button>
      <div style={{ fontStyle: 'italic', fontWeight: 700, fontSize: 32, marginBottom: 18, color: 'black' }}>DETAILS</div>
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', rowGap: 14, columnGap: 18, fontSize: 20, marginBottom: 36, color: "Black" }}>
        <div>Group Name:</div><div>{card.title}</div>
        <div>Schedule:</div><div>{card.time}</div>
        <div>Time Duration:</div><div>{card.duration || '1 hour'}</div>
        <div>Date Created:</div><div>{card.date || 'May 8, 2025'}</div>
        <div>Section:</div><div>{card.section || 'IT3R10'}</div>
        <div>SUBJECT ID:</div><div>{card.subjectId || '1234567889'}</div>
      </div>
      <div style={{ fontStyle: 'italic', fontWeight: 700, fontSize: 24, marginBottom: 10, color: 'black' }}>Your Record</div>
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: 10, fontSize: 19, color: 'black' }}>
        <div>Present:</div><div>{card.present ?? 23}</div>
        <div>Absent:</div><div>{card.absent ?? 2}</div>
        <div>Late:</div><div>{card.late ?? 9}</div>
      </div>
    </div>
  </div>
);

export default Group;
