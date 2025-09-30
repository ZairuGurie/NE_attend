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

  const dropdownItemClass = 'px-4 py-2 cursor-pointer text-[15px] text-[#23225c] font-medium border-b border-[#eee] bg-white';

  const notificationItems = [
    'New assignment added in IT Elective.',
    'Attendance marked successfully.',
    'Reminder: Meeting today at 3PM.',
  ];

  return (
    <div className="flex w-screen h-screen font-sans bg-[#f4f6fb] overflow-hidden">
      <aside className="w-[290px] bg-[#201B51] text-white flex flex-col items-center py-10 shadow-[2px_0_16px_rgba(44,44,84,0.08)] h-screen">
        <img src={logo} alt="Logo" className="w-[300px] h-[200px] object-contain rounded-[18px] shadow mb-[60px]" />
        <nav className="w-full">
          {navItems.map((item, idx) => (
            <SidebarItem key={item.label} icon={item.icon} label={item.label} path={item.path} isActive={location.pathname === item.path} isLast={idx === navItems.length - 1} onClick={() => handleNavigation(item.path)} />
          ))}
        </nav>
      </aside>

      <main className="flex-1 px-[60px] py-12 h-screen overflow-y-auto bg-white">
        <div className="flex justify-between items-center mb-9">
          <h2 className="m-0 font-extrabold text-[36px] text-[#23225c]">GROUP</h2>
          <div className="flex items-center gap-[14px] relative">
            <div className="relative">
              <i className="bi bi-bell-fill text-[22px] text-[#23225c] cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}></i>
              {showNotifications && (
                <div className="absolute right-0 top-[130%] bg-white border border-[#ccc] rounded-[10px] shadow z-[100] min-w-[250px]">
                  {notificationItems.map((note, idx) => (
                    <div key={idx} className="px-4 py-2 text-sm text-[#23225c] border-b border-[#eee]">{note}</div>
                  ))}
                </div>
              )}
            </div>
            <img src="https://i.abcnewsfe.com/a/0a1c6627-6fdd-4cc3-8edf-d80790509c5a/emoji-1-abc-221220_1671573538915_hpEmbed_1x1.jpg" alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-[10px] px-4 py-2 border border-[#ccc] rounded-[20px] bg-black cursor-pointer font-bold text-[16px] min-w-[100px] text-white">
              Student Name <i className="bi bi-caret-down-fill"></i>
            </div>
            {showDropdown && (
              <div className="absolute top-full right-0 bg-white border border-[#ccc] rounded-[10px] shadow z-[99] min-w-[180px]">
                <div onClick={() => navigate('/profile')} className={dropdownItemClass}>View Profile</div>
                <div onClick={() => alert('Settings')} className={dropdownItemClass}>Settings</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mb-5">
          <button 
            onClick={() => setShowJoinModal(true)} 
            className="bg-[#7CFC00] text-[#23225c] font-bold text-[16px] px-7 py-2.5 rounded-lg shadow tracking-[1px] flex items-center gap-2"
          >
            REQUEST TO JOIN <span className="text-[22px] ml-1.5">+</span>
          </button>
        </div>

        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] gap-10">
          {groupCards.map((card, idx) => (
            <GroupCard key={idx} {...card} onDotsClick={() => setModalIdx(idx)} />
          ))}
        </div>
        {modalIdx !== null && (
          <GroupDetailsModal card={groupCards[modalIdx]} onClose={() => setModalIdx(null)} />
        )}

        {showJoinModal && (
          <div className="fixed inset-0 bg-black/25 z-[9999] flex items-center justify-center">
            <div className="bg-white rounded-[16px] p-9 w-[400px] max-w-[90vw] shadow-2xl relative">
              <button 
                onClick={() => setShowJoinModal(false)} 
                className="absolute top-[18px] right-[18px] bg-transparent border-none text-[28px] text-[#232323] cursor-pointer font-bold"
              >
                &times;
              </button>
              <h2 className="m-0 mb-6 text-[24px] font-bold text-black">
                Request to Join Group
              </h2>
              <form onSubmit={handleJoinRequest}>
                <div className="mb-6">
                  <label htmlFor="groupId" className="block mb-2 text-[15px] font-semibold text-black">Enter Group ID</label>
                  <input
                    id="groupId"
                    type="text"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    placeholder="abc-defg-hijk"
                    className="w-full px-4 py-3 text-[16px] border border-[#ddd] rounded-lg bg-white text-black"
                    required
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowJoinModal(false)}
                    className="px-6 py-2.5 rounded-lg text-[15px] font-semibold bg-[#ff4444] text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg text-[15px] font-semibold bg-[#7CFC00] text-[#23225c] cursor-pointer"
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
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick} className={`${(isActive || hover) ? 'bg-[#35348a]' : 'bg-transparent'} flex items-center px-[38px] py-[18px] cursor-pointer font-semibold text-[20px] ${isLast ? '' : 'mb-3'} rounded-tl-[30px] rounded-bl-[30px] transition-colors`}>
      <i className={`bi ${icon} text-[26px] text-white mr-[22px]`}></i>
      <span className="italic text-white tracking-[1px]">{label}</span>
    </div>
  );
};

const GroupCard = ({ title, instructor, time, members, onDotsClick }) => (
  <div className="bg-white rounded-[16px] overflow-hidden shadow min-h-[220px] flex flex-col justify-start w-full">
    <div className="bg-[#23225c] pt-5 px-[18px] pb-2.5 rounded-t-[16px]">
      <div className="text-white font-extrabold text-[22px] tracking-[1px] leading-none">{title}</div>
      <div className="font-normal text-[15px] text-white mt-1.5">{instructor}</div>
    </div>
    <div className="bg-[#FFD600] p-[18px] rounded-b-[16px] flex flex-col h-[120px] justify-between relative">
      <div className="flex items-start gap-3">
        <i className="bi bi-camera-video-fill text-[28px] text-[#23225c] mt-0.5"></i>
        <div className="flex flex-col justify-center">
          <span className="font-bold text-[16px] text-[#23225c] leading-none">{title}</span>
          <span className="font-medium text-[13px] text-[#23225c] mt-0.5">{time}</span>
        </div>
      </div>
      <div className="flex items-end justify-between w-full">
        <i className="bi bi-three-dots text-[24px] text-[#23225c] opacity-80 cursor-pointer" onClick={onDotsClick}></i>
        <div className="flex items-center gap-1.5">
          <i className="bi bi-people-fill text-[28px] text-[#23225c]"></i>
          <span className="font-bold text-[20px] text-[#23225c]">{members}</span>
        </div>
      </div>
    </div>
  </div>
);

const GroupDetailsModal = ({ card, onClose }) => (
  <div className="fixed inset-0 bg-black/25 z-[9999] flex items-center justify-center">
    <div className="bg-white border border-[#232323] rounded p-9 min-w-[420px] max-w-[600px] w-[90vw] shadow-2xl relative">
      <button onClick={onClose} className="absolute top-[18px] right-[18px] bg-transparent border-none text-[28px] text-[#232323] cursor-pointer font-bold">&times;</button>
      <div className="italic font-bold text-[32px] mb-[18px] text-black">DETAILS</div>
      <div className="grid [grid-template-columns:180px_1fr] gap-y-[14px] gap-x-[18px] text-[20px] mb-9 text-black">
        <div>Group Name:</div><div>{card.title}</div>
        <div>Schedule:</div><div>{card.time}</div>
        <div>Time Duration:</div><div>{card.duration || '1 hour'}</div>
        <div>Date Created:</div><div>{card.date || 'May 8, 2025'}</div>
        <div>Section:</div><div>{card.section || 'IT3R10'}</div>
        <div>SUBJECT ID:</div><div>{card.subjectId || '1234567889'}</div>
      </div>
      <div className="italic font-bold text-[24px] mb-2.5 text-black">Your Record</div>
      <div className="grid [grid-template-columns:120px_1fr] gap-y-2.5 text-[19px] text-black">
        <div>Present:</div><div>{card.present ?? 23}</div>
        <div>Absent:</div><div>{card.absent ?? 2}</div>
        <div>Late:</div><div>{card.late ?? 9}</div>
      </div>
    </div>
  </div>
);

export default Group;
