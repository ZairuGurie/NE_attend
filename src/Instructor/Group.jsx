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

const groupCards = [
  { section: 'IT3R9', instructor: 'Mr. Angelo Alejo', title: 'IT ELECTIVE', time: '12 pm today', members: 43 },
  { section: 'IT310', instructor: 'Mr. Angelo Alejo', title: 'IT ELECTIVE', time: '12 pm today', members: 43 },
  { section: 'IT311', instructor: 'Mr. Angelo Alejo', title: 'IT ELECTIVE', time: '12 pm today', members: 43 },
  { section: 'IT311', instructor: 'Mr. Angelo Alejo', title: 'IT ELECTIVE', time: '12 pm today', members: 43 },
  { section: 'IT3R3', instructor: 'Mr. Angelo Alejo', title: 'IT ELECTIVE', time: '12 pm today', members: 43 },
  { section: 'IT3R1', instructor: 'Mr. Angelo Alejo', title: 'IT ELECTIVE', time: '12 pm today', members: 43 },
];

const Group = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  const handleNavigation = (path) => {
    if (path === '/logout') {
      navigate('/login', { replace: true });
    } else {
      navigate(path);
    }
  };

  const handleGroupClick = (groupId) => {
    navigate(`/group-settings/${groupId}`);
  };

  const notificationItems = [
    'New student joined IT Elective class',
    'Section IT3R9 meeting scheduled',
    'Attendance report ready for IT311',
  ];

  // Filter groups based on search and filter
  const filteredGroups = groupCards.filter(card => {
    return card.section.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (!filterSubject || card.title === filterSubject);
  });

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
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: 36, color: '#23225c' }}>GROUP</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <i 
                className="bi bi-bell-fill" 
                style={{ fontSize: 22, color: '#23225c', cursor: 'pointer' }} 
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {showNotifications && (
                <div style={{ position: 'absolute', right: 0, top: '130%', background: '#fff', border: '1px solid #ccc', borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', zIndex: 100, minWidth: 250 }}>
                  {notificationItems.map((note, idx) => (
                    <div key={idx} style={{ padding: '10px 16px', fontSize: 14, color: '#23225c', borderBottom: '1px solid #eee' }}>{note}</div>
                  ))}
                </div>
              )}
            </div>
            <img 
              src="https://i.abcnewsfe.com/a/0a1c6627-6fdd-4cc3-8edf-d80790509c5a/emoji-1-abc-221220_1671573538915_hpEmbed_1x1.jpg" 
              alt="Profile" 
              style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} 
            />
            <div onClick={() => setShowDropdown(!showDropdown)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', border: '1px solid #ccc', borderRadius: 20, background: 'black', cursor: 'pointer', fontWeight: 700, fontSize: 16, minWidth: 100, color: '#fff' }}>
              Instructor Name <i className="bi bi-caret-down-fill" />
            </div>
            {showDropdown && (
              <div style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', border: '1px solid #ccc', borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', zIndex: 99, minWidth: 180 }}>
                <div onClick={() => navigate('/I_Profile')} style={dropdownItemStyle}>View Profile</div>
                <div onClick={() => alert('Settings')} style={dropdownItemStyle}>Settings</div>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 30,
          gap: 20 
        }}>
          <div style={{ flex: 1, maxWidth: 400 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              background: '#fff',
              borderRadius: 8,
              padding: '8px 16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <i className="bi bi-search" style={{ color: '#23225c', fontSize: 18 }}></i>
              <input
                type="text"
                placeholder="Search sections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  padding: '8px 12px',
                  fontSize: 16,
                  width: '100%',
                  color: '#000000',
                    background: 'transparent',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              style={{
                padding: '12px 20px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: 15,
                color: '#ffffff',
                background: '#23225c',
                cursor: 'pointer'
              }}
            >
              <option value="">All Subjects</option>
              <option value="IT ELECTIVE">IT ELECTIVE</option>
              <option value="PROGRAMMING">PROGRAMMING</option>
              <option value="DATABASE">DATABASE</option>
            </select>

            {/* Create Group Button */}
            <button
              onClick={() => navigate('/create-group')}  // Changed from setShowCreateModal(true)
              style={{
                background: '#7CFC00',
                color: '#23225c',
                border: 'none',
                padding: '12px 24px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 2px 8px rgba(124,252,0,0.3)'
              }}
            >
              CREATE GROUP <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div style={{ 
          display: 'flex', 
          gap: 20, 
          marginBottom: 40 
        }}>
          <StatCard icon="bi-people-fill" label="Total Students" value="258" color="#4CAF50" />
          <StatCard icon="bi-collection" label="Active Groups" value="6" color="#2196F3" />
          <StatCard icon="bi-clock-history" label="Classes Today" value="3" color="#FF9800" />
        </div>

        {/* Group Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 40 
        }}>
          {filteredGroups.map((card, idx) => (
            <GroupCard 
              key={idx} 
              {...card} 
              onViewDetails={() => {
                setSelectedGroup(card);
                setShowDetailsModal(true);
              }}
            />
          ))}
        </div>

        {/* Create Group Modal */}
        {showCreateModal && (
          <CreateGroupModal onClose={() => setShowCreateModal(false)} />
        )}

        {/* Group Details Modal */}
        {showDetailsModal && selectedGroup && (
          <GroupDetailsModal 
            group={selectedGroup} 
            onClose={() => setShowDetailsModal(false)} 
          />
        )}
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div style={{
    background: '#fff',
    borderRadius: 12,
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    flex: 1,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  }}>
    <div style={{
      width: 48,
      height: 48,
      borderRadius: 12,
      background: `${color}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <i className={`bi ${icon}`} style={{ fontSize: 24, color: color }}></i>
    </div>
    <div>
      <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: '#23225c' }}>{value}</div>
    </div>
  </div>
);

// Enhance GroupCard with more actions
const GroupCard = ({ section, instructor, title, time, members }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate(); // Add this hook

  return (
    <>
      <div style={{ 
        background: '#fff', 
        borderRadius: 16, 
        overflow: 'hidden', 
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        transition: 'transform 0.2s',
      }}>
        {/* Make header clickable to navigate to settings */}
        <div 
          onClick={() => navigate(`/group-settings/${section}`)}
          style={{ 
            background: '#23225c', 
            padding: '20px', 
            color: '#fff',
            cursor: 'pointer',
            transition: 'background 0.2s',
            ':hover': {
              background: '#2b2a6e'
            }
          }}
        >
          <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{section}</h3>
          <p style={{ margin: '8px 0 0 0', fontSize: 15 }}>{instructor}</p>
        </div>

        {/* Keep existing content section */}
        <div style={{ background: '#FFD600', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="bi bi-camera-video-fill" style={{ fontSize: 24, color: '#23225c' }}></i>
              <span style={{ fontWeight: 700, color: '#23225c', fontSize: 18 }}>{title}</span>
            </div>
            <div style={{ marginTop: 4, color: '#23225c', fontSize: 14 }}>{time}</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={actionButtonStyle}>
                <i className="bi bi-camera-video-fill"></i>
                Start
              </button>
              <button 
                style={actionButtonStyle}
                onClick={() => setShowDetails(true)}
              >
                <i className="bi bi-people-fill"></i>
                View
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <i className="bi bi-people-fill" style={{ fontSize: 20, color: '#23225c' }}></i>
              <span style={{ fontWeight: 700, color: '#23225c' }}>{members}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Keep existing modal */}
      {showDetails && (
        <GroupDetailsModal
          group={{ section, instructor, title, time, members }}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

const actionButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 12px',
  borderRadius: 6,
  border: 'none',
  background: 'rgba(35, 34, 92, 0.1)',
  color: '#23225c',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background 0.2s',
  ':hover': {
    background: 'rgba(35, 34, 92, 0.2)'
  }
};

const CreateGroupModal = ({ onClose }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
    <div style={{ background: '#fff', padding: 40, borderRadius: 16, width: '90%', maxWidth: 500 }}>
      <h2 style={{ margin: '0 0 24px 0', color: '#23225c', fontSize: 24, fontWeight: 800 }}>Create New Group</h2>
      <form>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#23225c', fontWeight: 600 }}>Section</label>
          <input type="text" style={inputStyle} placeholder="Enter section" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#23225c', fontWeight: 600 }}>Subject</label>
          <input type="text" style={inputStyle} placeholder="Enter subject" />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#23225c', fontWeight: 600 }}>Schedule</label>
          <input type="text" style={inputStyle} placeholder="Enter schedule" />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} style={{ ...buttonStyle, background: '#ff4444' }}>Cancel</button>
          <button type="submit" style={{ ...buttonStyle, background: '#7CFC00' }}>Create</button>
        </div>
      </form>
    </div>
  </div>
);

const GroupDetailsModal = ({ group, onClose }) => (
  <div style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    background: 'rgba(0,0,0,0.5)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 1000 
  }}>
    <div style={{ 
      background: '#fff', 
      padding: 40, 
      borderRadius: 16, 
      width: '90%', 
      maxWidth: 600,
      position: 'relative'
    }}>
      <button 
        onClick={onClose} 
        style={{ 
          position: 'absolute',
          top: 20,
          right: 20,
          background: 'transparent',
          border: 'none',
          fontSize: 24,
          color: '#23225c',
          cursor: 'pointer'
        }}
      >
        ×
      </button>

      <h2 style={{ 
        margin: '0 0 32px 0', 
        color: '#23225c', 
        fontSize: 32, 
        fontWeight: 800,
        borderBottom: '2px solid #23225c',
        paddingBottom: 8
      }}>
        DETAILS
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '16px 24px' }}>
        <DetailRow label="Group Name:" value={group.title} />
        <DetailRow label="Schedule:" value="Monday/Thursday | 9:00 - 10:00 AM" />
        <DetailRow label="Time Duration:" value="1 hour" />
        <DetailRow label="Date Created:" value="May 8, 2025" />
        <DetailRow label="Section:" value={group.section} />
        <DetailRow label="Subject ID:" value="123456789" />
      </div>

      <div style={{ 
        marginTop: 32, 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: 12 
      }}>
        <button
          onClick={onClose}
          style={{
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            background: '#23225c',
            color: '#fff',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <>
    <div style={{ 
      color: '#23225c', 
      fontSize: 16, 
      fontWeight: 600 
    }}>
      {label}
    </div>
    <div style={{ 
      color: '#23225c', 
      fontSize: 16
    }}>
      {value}
    </div>
  </>
);

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
  padding: '10px 16px',
  border: '1px solid #ddd',
  borderRadius: 8,
  fontSize: 16,
  color: '#23225c',
};

const buttonStyle = {
  padding: '10px 24px',
  border: 'none',
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 600,
  color: '#23225c',
  cursor: 'pointer',
};

export default Group;