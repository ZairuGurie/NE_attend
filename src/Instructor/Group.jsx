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

  const filteredGroups = groupCards.filter(card => {
    return card.section.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (!filterSubject || card.title === filterSubject);
  });

  return (
    <div className="flex w-screen h-screen bg-[#f4f6fb] font-sans">
      {/* Sidebar */}
      <aside className="w-[290px] bg-[#201B51] text-white flex flex-col items-center py-10 shadow-[2px_0_16px_rgba(44,44,84,0.08)] h-screen">
        <div className="flex flex-col items-center mb-15">
          <img src={logo} alt="Logo" className="w-[300px] h-[200px] object-contain rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.10)]" />
        </div>
        <nav className="w-full">
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
      <main className="flex-1 p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-9">
          <h2 className="m-0 font-extrabold text-4xl text-[#23225c]">GROUP</h2>
          <div className="flex items-center gap-3.5 relative">
            <div className="relative">
              <i 
                className="bi bi-bell-fill text-[22px] text-[#23225c] cursor-pointer" 
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {showNotifications && (
                <div className="absolute right-0 top-[130%] bg-white border border-gray-300 rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] z-[100] min-w-[250px]">
                  {notificationItems.map((note, idx) => (
                    <div key={idx} className="py-2.5 px-4 text-sm text-[#23225c] border-b border-gray-200">{note}</div>
                  ))}
                </div>
              )}
            </div>
            <img 
              src="https://i.abcnewsfe.com/a/0a1c6627-6fdd-4cc3-8edf-d80790509c5a/emoji-1-abc-221220_1671573538915_hpEmbed_1x1.jpg" 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover" 
            />
            <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2.5 py-2 px-4 border border-gray-300 rounded-[20px] bg-black cursor-pointer font-bold text-base min-w-[100px] text-white">
              Instructor Name <i className="bi bi-caret-down-fill" />
            </div>
            {showDropdown && (
              <div className="absolute top-full right-0 bg-white border border-gray-300 rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] z-[99] min-w-[180px]">
                <div onClick={() => navigate('/I_Profile')} className="py-2.5 px-4 cursor-pointer text-[15px] text-[#23225c] font-medium border-b border-gray-200 bg-white">View Profile</div>
                <div onClick={() => alert('Settings')} className="py-2.5 px-4 cursor-pointer text-[15px] text-[#23225c] font-medium border-b border-gray-200 bg-white">Settings</div>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex justify-between items-center mb-[30px] gap-5">
          <div className="flex-1 max-w-[400px]">
            <div className="flex items-center bg-white rounded-lg py-2 px-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <i className="bi bi-search text-[#23225c] text-lg"></i>
              <input
                type="text"
                placeholder="Search sections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-none outline-none py-2 px-3 text-base w-full text-black bg-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="py-3 px-5 rounded-lg border border-gray-300 text-[15px] text-white bg-[#23225c] cursor-pointer"
            >
              <option value="">All Subjects</option>
              <option value="IT ELECTIVE">IT ELECTIVE</option>
              <option value="PROGRAMMING">PROGRAMMING</option>
              <option value="DATABASE">DATABASE</option>
            </select>

            <button
              onClick={() => navigate('/create-group')}
              className="bg-[#7CFC00] text-[#23225c] border-none py-3 px-6 rounded-lg text-[15px] font-bold cursor-pointer flex items-center gap-2 shadow-[0_2px_8px_rgba(124,252,0,0.3)]"
            >
              CREATE GROUP <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="flex gap-5 mb-10">
          <StatCard icon="bi-people-fill" label="Total Students" value="258" color="#4CAF50" />
          <StatCard icon="bi-collection" label="Active Groups" value="6" color="#2196F3" />
          <StatCard icon="bi-clock-history" label="Classes Today" value="3" color="#FF9800" />
        </div>

        {/* Group Cards Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-10">
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
  <div className="bg-white rounded-xl py-5 px-6 flex items-center gap-4 flex-1 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
    <div 
      className="w-12 h-12 rounded-xl flex items-center justify-center"
      style={{ background: `${color}15` }}
    >
      <i className={`bi ${icon} text-2xl`} style={{ color: color }}></i>
    </div>
    <div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-[#23225c]">{value}</div>
    </div>
  </div>
);

const GroupCard = ({ section, instructor, title, time, members }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:scale-[1.02]">
        <div 
          onClick={() => navigate(`/group-settings/${section}`)}
          className="bg-[#23225c] p-5 text-white cursor-pointer transition-colors duration-200 hover:bg-[#2b2a6e]"
        >
          <h3 className="m-0 text-2xl font-extrabold">{section}</h3>
          <p className="mt-2 mb-0 text-[15px]">{instructor}</p>
        </div>

        <div className="bg-[#FFD600] p-6 flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2">
              <i className="bi bi-camera-video-fill text-2xl text-[#23225c]"></i>
              <span className="font-bold text-[#23225c] text-lg">{title}</span>
            </div>
            <div className="mt-1 text-[#23225c] text-sm">{time}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-md border-none bg-[rgba(35,34,92,0.1)] text-[#23225c] text-sm font-semibold cursor-pointer transition-colors duration-200 hover:bg-[rgba(35,34,92,0.2)]">
                <i className="bi bi-camera-video-fill"></i>
                Start
              </button>
              <button 
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-md border-none bg-[rgba(35,34,92,0.1)] text-[#23225c] text-sm font-semibold cursor-pointer transition-colors duration-200 hover:bg-[rgba(35,34,92,0.2)]"
                onClick={() => setShowDetails(true)}
              >
                <i className="bi bi-people-fill"></i>
                View
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="bi bi-people-fill text-xl text-[#23225c]"></i>
              <span className="font-bold text-[#23225c]">{members}</span>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <GroupDetailsModal
          group={{ section, instructor, title, time, members }}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

const CreateGroupModal = ({ onClose }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[1000]">
    <div className="bg-white p-10 rounded-2xl w-[90%] max-w-[500px]">
      <h2 className="m-0 mb-6 text-[#23225c] text-2xl font-extrabold">Create New Group</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2 text-[#23225c] font-semibold">Section</label>
          <input type="text" className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-base text-[#23225c]" placeholder="Enter section" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-[#23225c] font-semibold">Subject</label>
          <input type="text" className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-base text-[#23225c]" placeholder="Enter subject" />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-[#23225c] font-semibold">Schedule</label>
          <input type="text" className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-base text-[#23225c]" placeholder="Enter schedule" />
        </div>
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onClose} className="py-2.5 px-6 border-none rounded-lg text-base font-semibold text-[#23225c] cursor-pointer bg-[#ff4444]">Cancel</button>
          <button type="submit" className="py-2.5 px-6 border-none rounded-lg text-base font-semibold text-[#23225c] cursor-pointer bg-[#7CFC00]">Create</button>
        </div>
      </form>
    </div>
  </div>
);

const GroupDetailsModal = ({ group, onClose }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[1000]">
    <div className="bg-white p-10 rounded-2xl w-[90%] max-w-[600px] relative">
      <button 
        onClick={onClose} 
        className="absolute top-5 right-5 bg-transparent border-none text-2xl text-[#23225c] cursor-pointer"
      >
        ×
      </button>

      <h2 className="m-0 mb-8 text-[#23225c] text-[32px] font-extrabold border-b-2 border-[#23225c] pb-2">
        DETAILS
      </h2>

      <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-4">
        <DetailRow label="Group Name:" value={group.title} />
        <DetailRow label="Schedule:" value="Monday/Thursday | 9:00 - 10:00 AM" />
        <DetailRow label="Time Duration:" value="1 hour" />
        <DetailRow label="Date Created:" value="May 8, 2025" />
        <DetailRow label="Section:" value={group.section} />
        <DetailRow label="Subject ID:" value="123456789" />
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="py-2.5 px-6 rounded-lg border-none bg-[#23225c] text-white text-[15px] font-semibold cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <>
    <div className="text-[#23225c] text-base font-semibold">
      {label}
    </div>
    <div className="text-[#23225c] text-base">
      {value}
    </div>
  </>
);

const SidebarItem = ({ icon, label, isActive, isLast, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`flex items-center py-[18px] px-[38px] cursor-pointer font-semibold text-xl rounded-tl-[30px] rounded-bl-[30px] transition-colors duration-200 ${
        isActive ? 'bg-[#35348a]' : hover ? 'bg-[#35348a]' : 'bg-transparent'
      } ${isLast ? 'mb-0' : 'mb-3'}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <i className={`bi ${icon} text-[26px] text-white mr-[22px]`}></i>
      <span className="italic text-white">{label}</span>
    </div>
  );
};

export default Group;