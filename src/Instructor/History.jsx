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

const historyData = [
  { group: 'IT ELECTIVE', code: 'abc-defg-hjk', start: '7:00', end: '8:30', duration: '01:30:00', date: '6/2/25', status: 'Present' },
  { group: 'IT ELECTIVE', code: 'abc-defg-hjk', start: '7:00', end: '8:30', duration: '01:30:00', date: '6/3/25', status: 'Late' },
  { group: 'IT ELECTIVE', code: 'abc-defg-hjk', start: '7:00', end: '8:30', duration: '01:30:00', date: '6/4/25', status: 'Absent' },
  { group: 'IT ELECTIVE', code: 'abc-defg-hjk', start: '7:00', end: '8:30', duration: '01:30:00', date: '6/5/25', status: 'Present' },
];

const History = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Filters
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleNavigation = (path) => {
    if (path === '/logout') {
      navigate('/login', { replace: true });
    } else {
      navigate(path);
    }
  };

  const handleExportAttendance = (code) => {
    console.log(`Exporting attendance for session ${code}`);
  };

  // Apply filters
  const filteredData = historyData.filter((row) => {
    return (
      (selectedGroup === '' || row.group === selectedGroup) &&
      (selectedDate === '' || row.date === selectedDate) &&
      (selectedStatus === '' || row.status === selectedStatus)
    );
  });

  const notificationItems = [
    'New student joined IT Elective class',
    'Attendance report generated',
    'Class schedule updated',
    'Meeting started in Room 301',
  ];

  return (
    <div className="flex w-screen h-screen bg-[#f4f6fb] font-sans">
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
      <main className="flex-1 px-[60px] py-12 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-9">
          <h2 className="m-0 font-extrabold text-[36px] text-[#23225c]">HISTORY</h2>
          <div className="flex items-center gap-[14px] relative">
            {/* Notifications */}
            <div className="relative">
              <i className="bi bi-bell-fill text-[22px] text-[#23225c] cursor-pointer" onClick={() => setShowNotifications(!showNotifications)} />
              {showNotifications && (
                <div className="absolute right-0 top-[130%] bg-white border border-[#ccc] rounded-[10px] shadow z-[100] min-w-[250px]">
                  {notificationItems.map((note, idx) => (
                    <div key={idx} className="px-4 py-2 text-sm text-[#23225c] border-b border-[#eee]">{note}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Section */}
            <img src="https://i.abcnewsfe.com/a/0a1c6627-6fdd-4cc3-8edf-d80790509c5a/emoji-1-abc-221220_1671573538915_hpEmbed_1x1.jpg" alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-[10px] px-4 py-2 border border-[#ccc] rounded-[20px] bg-black cursor-pointer font-bold text-[16px] min-w-[100px] text-white">
              Instructor Name <i className="bi bi-caret-down-fill" />
            </div>
            {showDropdown && (
              <div className="absolute top-full right-0 bg-white border border-[#ccc] rounded-[10px] shadow z-[99] min-w-[180px]">
                <div onClick={() => navigate('/I_Profile')} className="px-4 py-2 cursor-pointer text-[15px] text-[#23225c] font-medium border-b border-[#eee] bg-white">View Profile</div>
                <div onClick={() => alert('Settings')} className="px-4 py-2 cursor-pointer text-[15px] text-[#23225c] font-medium border-b border-[#eee] bg-white">Settings</div>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-[#555] text-[18px] font-semibold">{filteredData.length} out of {historyData.length} records shown</div>
          <div className="flex gap-3">
            <select className="px-4 py-2 rounded-lg border border-[#ddd] text-[16px] text-[#23225c] bg-white cursor-pointer" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
              <option value="">All Groups</option>
              <option value="IT ELECTIVE">IT ELECTIVE</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-[#ddd] text-[16px] text-[#23225c] bg-white cursor-pointer" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
              <option value="">All Dates</option>
              {historyData.map((row, idx) => (
                <option key={idx} value={row.date}>{row.date}</option>
              ))}
            </select>
            <select className="px-4 py-2 rounded-lg border border-[#ddd] text-[16px] text-[#23225c] bg-white cursor-pointer" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-[16px] shadow p-9">
          <table className="w-full border-collapse text-[17px]">
            <thead>
              <tr className="bg-[#EFEFFB] text-left">
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">GROUP</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">MEETING CODE</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">SESSION START TIME</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">SESSION END TIME</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">DURATION</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">DATE</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">STATUS</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">VIEW</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr key={idx} className="border-b border-[#e0e0e0] odd:bg-[#f9f9f9]">
                  <td className="px-5 py-4 font-semibold text-[#333]">{row.group}</td>
                  <td className="px-5 py-4 font-semibold text-[#333]">{row.code}</td>
                  <td className="px-5 py-4 font-semibold text-[#333]">{row.start}</td>
                  <td className="px-5 py-4 font-semibold text-[#333]">{row.end}</td>
                  <td className="px-5 py-4 font-semibold text-[#333]">{row.duration}</td>
                  <td className="px-5 py-4 font-semibold text-[#333]">{row.date}</td>
                  <td className={`px-5 py-4 font-bold ${row.status === 'Present' ? 'text-green-600' : row.status === 'Late' ? 'text-orange-500' : 'text-red-500'}`}>
                    {row.status}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleExportAttendance(row.code)}
                      className="bg-[#23225c] text-white px-4 py-2 rounded font-semibold text-[14px]"
                    >
                      Export Attendance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, isActive, isLast, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`${(isActive || hover) ? 'bg-[#35348a]' : 'bg-transparent'} flex items-center px-[38px] py-[18px] cursor-pointer font-semibold text-[20px] ${isLast ? '' : 'mb-3'} rounded-tl-[30px] rounded-bl-[30px] transition-colors`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <i className={`bi ${icon} text-[26px] text-white mr-[22px]`}></i>
      <span className="italic text-white">{label}</span>
    </div>
  );
};

// removed inline style objects in favor of Tailwind classes

export default History;
