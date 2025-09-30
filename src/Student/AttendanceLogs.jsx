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

  const dropdownItemClass =
    'px-4 py-2 cursor-pointer text-[15px] text-[#23225c] font-medium border-b border-[#eee] bg-white';

  const notificationItems = [
    'New assignment added in IT Elective.',
    'Attendance marked successfully.',
    'Reminder: Meeting today at 3PM.',
  ];

  return (
    <div className="flex w-screen h-screen min-w-screen min-h-screen font-sans bg-[#f4f6fb] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[290px] bg-[#201B51] text-white flex flex-col items-center py-10 shadow-[2px_0_16px_rgba(44,44,84,0.08)] h-screen">
        <div className="flex flex-col items-center mb-[60px]">
          <img src={logo} alt="Logo" className="w-[300px] h-[200px] object-contain rounded-[18px] shadow" />
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
      <main className="flex-1 px-[60px] py-12 h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-9">
          <h2 className="m-0 font-extrabold text-[36px] text-[#23225c]">ATTENDANCE LOGS</h2>
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

        {/* Filters and Table */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-[18px] font-semibold text-[#555]">0 out of 20 selected</div>
          <div className="flex gap-3">
            <select className="border border-[#ccc] rounded-[8px] px-4 py-2 text-[16px] font-medium text-[#333] bg-white cursor-pointer outline-none"><option>Subject</option></select>
            <select className="border border-[#ccc] rounded-[8px] px-4 py-2 text-[16px] font-medium text-[#333] bg-white cursor-pointer outline-none"><option>Date</option></select>
            <select className="border border-[#ccc] rounded-[8px] px-4 py-2 text-[16px] font-medium text-[#333] bg-white cursor-pointer outline-none"><option>Status</option></select>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-[16px] shadow p-9">
          <table className="w-full border-collapse text-[17px]">
            <thead>
              <tr className="bg-[#EFEFFB] text-left border-b-2 border-[#ddd]">
                <th className="px-5 py-4 font-extrabold text-[18px] tracking-[0.5px] text-[#23225c]">GROUP</th>
                <th className="px-5 py-4 font-extrabold text-[18px] tracking-[0.5px] text-[#23225c]">MEETING CODE</th>
                <th className="px-5 py-4 font-extrabold text-[18px] tracking-[0.5px] text-[#23225c]">SESSION START TIME</th>
                <th className="px-5 py-4 font-extrabold text-[18px] tracking-[0.5px] text-[#23225c]">SESSION END TIME</th>
                <th className="px-5 py-4 font-extrabold text-[18px] tracking-[0.5px] text-[#23225c]">DURATION</th>
                <th className="px-5 py-4 font-extrabold text-[18px] tracking-[0.5px] text-[#23225c]">DATE</th>
                <th className="px-5 py-4 font-extrabold text-[18px] tracking-[0.5px] text-[#23225c]">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((row, idx) => (
                <tr key={idx} className="border-b border-[#e0e0e0] odd:bg-[#f9f9f9]">
                  <td className="px-5 py-4 font-semibold text-[#333] align-middle">{row.group}</td>
                  <td className="px-5 py-4 font-semibold text-[#333] align-middle">{row.code}</td>
                  <td className="px-5 py-4 font-semibold text-[#333] align-middle">{row.start}</td>
                  <td className="px-5 py-4 font-semibold text-[#333] align-middle">{row.end}</td>
                  <td className="px-5 py-4 font-semibold text-[#333] align-middle">{row.duration}</td>
                  <td className="px-5 py-4 font-semibold text-[#333] align-middle">{row.date}</td>
                  <td className={`px-5 py-4 font-bold align-middle ${statusClass(row.status)}`}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export Record Button */}
        <div className="flex justify-end mt-[30px]">
          <button className="bg-[#28a745] text-white px-6 py-3 rounded shadow hover:shadow-md text-[16px] font-semibold">
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
      className={`${(isActive || hover) ? 'bg-[#35348a]' : 'bg-transparent'} flex items-center px-[38px] py-[18px] cursor-pointer font-semibold text-[20px] tracking-[0.5px] ${isLast ? '' : 'mb-3'} rounded-tl-[30px] rounded-bl-[30px] transition-colors duration-200`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <i className={`bi ${icon} text-[26px] text-white mr-[22px]`}></i>
      <span className="italic text-white tracking-[1px]">{label}</span>
    </div>
  );
};

function statusClass(status) {
  if (status === 'Present') return 'text-[#2ecc40]';
  if (status === 'Absent') return 'text-[#ff4136]';
  if (status === 'Late') return 'text-[#ffb700]';
  return 'text-[#888]';
}

export default AttendanceLogs;
