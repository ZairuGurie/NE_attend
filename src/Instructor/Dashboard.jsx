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

  const dropdownItemClass = 'px-4 py-2 cursor-pointer text-[15px] text-[#23225c] font-medium border-b border-[#eee] bg-white';

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

      {/* Main */}
      <main className="flex-1 px-[60px] py-12 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-9">
          <h2 className="m-0 font-extrabold text-[36px] text-[#23225c]">DASHBOARD</h2>
          <div className="flex items-center gap-[14px] relative">
            <div className="relative">
              <i
                className="bi bi-bell-fill text-[22px] text-[#23225c] cursor-pointer"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {showNotifications && (
                <div className="absolute right-0 top-[130%] bg-white border border-[#ccc] rounded-[10px] shadow z-[100] min-w-[250px]">
                  {notificationItems.map((note, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 text-sm text-[#23225c] border-b border-[#eee]"
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
              className="w-10 h-10 rounded-full object-cover"
            />
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-[10px] px-4 py-2 border border-[#ccc] rounded-[20px] bg-black cursor-pointer font-bold text-[16px] min-w-[100px] text-white"
            >
              Instructor Name <i className="bi bi-caret-down-fill" />
            </div>
            {showDropdown && (
              <div className="absolute top-full right-0 bg-white border border-[#ccc] rounded-[10px] shadow z-[99] min-w-[180px]">
                <div onClick={() => navigate('/I_Profile')} className={dropdownItemClass}>View Profile</div>
                <div onClick={() => alert('Settings')} className={dropdownItemClass}>Settings</div>
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-[16px] shadow p-9 mb-[30px]">
          <h3 className="font-extrabold text-[26px] mb-5 text-[#23225c]">REAL-TIME MEETING STATUS</h3>

          {/* Professional Filters */}
          <div className="flex gap-5 mb-5 items-center">
            <div className="flex flex-col">
              <label className="font-semibold text-[14px] mb-1.5 text-[#23225c]">Filter by Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 rounded border border-[#ccc] text-[15px] text-[#23225c]"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-[14px] mb-1.5 text-[#23225c]">Filter by Student</label>
              <input
                type="text"
                placeholder="Enter student name..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="px-3 py-2 rounded border border-[#ccc] text-[15px] text-[#23225c]"
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse text-[17px]">
            <thead>
              <tr className="bg-[#EFEFFB] text-left border-b-2 border-[#ddd]">
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">GROUP</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">DATE</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">CODELINK</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">STUDENT ID</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">STUDENT NAME</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">TIME IN</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">TIME OUT</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">DURATION</th>
                <th className="px-5 py-4 font-extrabold text-[18px] text-[#23225c]">LOG</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr key={idx} className="border-b border-[#e0e0e0] odd:bg-[#f9f9f9]">
                    <td className="px-5 py-4 font-semibold text-[#333]">{row.group}</td>
                    <td className="px-5 py-4 font-semibold text-[#333]">{row.date}</td>
                    <td className="px-5 py-4 font-semibold text-[#333]">{row.codelink}</td>
                    <td className="px-5 py-4 font-semibold text-[#333]">{row.studentId}</td>
                    <td className="px-5 py-4 font-semibold text-[#333]">{row.name}</td>
                    <td className="px-5 py-4 font-semibold text-[#333]">{row.timeIn}</td>
                    <td className="px-5 py-4 font-semibold text-[#333]">{row.timeOut}</td>
                    <td className="px-5 py-4 font-semibold text-[#333]">{row.duration}</td>
                    <td className={`px-5 py-4 font-bold ${statusClass(row.log)}`}>{row.log}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-5 text-[#888]">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Policy Section (below table) */}
        <div className="bg-white rounded-[16px] shadow p-9">
          <h3 className="font-extrabold text-[26px] mb-5 text-[#23225c]">POLICY</h3>
          <ul className="pl-[22px] text-[18px] mb-5 text-[#23225c] list-disc">
            <li>3 Lates = 1 Absent</li>
            <li>3 Consecutive Absents = D/F</li>
          </ul>
          <div className="italic text-[#444] text-[16px]">Students must follow the rules. Participation will reflect their performance.</div>
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

function statusClass(status) {
  if (status === 'Present') return 'text-[#2ecc40]';
  if (status === 'Absent') return 'text-[#ff4136]';
  if (status === 'Late') return 'text-[#ffb700]';
  return 'text-[#888]';
}

export default Dashboard2;
