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

const dropdownItemClass = 'px-4 py-2 cursor-pointer text-[15px] text-[#23225c] font-medium border-b border-[#eee] bg-white';

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
    <div className="flex w-screen h-screen font-sans bg-[#f4f6fb] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[290px] bg-[#201B51] text-white flex flex-col items-center py-10 shadow-[2px_0_16px_rgba(44,44,84,0.08)] h-screen">
        <img src={logo} alt="Logo" className="w-[300px] h-[200px] object-contain rounded-[18px] shadow mb-[60px]" />
        <nav className="w-full">
          {navItems.map((item, idx) => (
            <SidebarItem key={item.label} icon={item.icon} label={item.label} path={item.path} isActive={location.pathname === item.path} isLast={idx === navItems.length - 1} onClick={() => handleNavigation(item.path)} />
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 px-[60px] py-12 h-screen overflow-y-auto">
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

        {/* Add Note Button */}
        <div className="mb-6 flex justify-end">
          <button onClick={() => setShowForm(true)} className="bg-[#201B51] text-white px-5 py-2.5 rounded-lg cursor-pointer font-semibold text-[16px]">
            + Add Note
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-5 rounded-[12px] mb-[30px] shadow">
            <div className="mb-3"><input name="topic" value={formData.topic} onChange={handleInputChange} placeholder="Topic" className="w-full px-3.5 py-2.5 text-[16px] rounded-lg border border-[#ccc] outline-none" /></div>
            <div className="mb-3"><textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" rows={3} className="w-full px-3.5 py-2.5 text-[16px] rounded-lg border border-[#ccc] outline-none" /></div>
            <div className="mb-3"><input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" className="w-full px-3.5 py-2.5 text-[16px] rounded-lg border border-[#ccc] outline-none" /></div>
            <div className="mb-3">
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-3.5 py-2.5 text-[16px] rounded-lg border border-[#ccc] outline-none" />
            </div>
            <div className="flex gap-2.5">
              <button onClick={handleAddNote} className="text-white px-4 py-2.5 rounded-md font-semibold text-[15px] bg-[#28a745]">Save</button>
              <button onClick={() => setShowForm(false)} className="text-white px-4 py-2.5 rounded-md font-semibold text-[15px] bg-[#dc3545]">Cancel</button>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] gap-6 mb-10">
          {notes.map((note, idx) => (
            <div key={idx} onClick={() => toggleNoteExpansion(idx)} className="bg-[#23225c] rounded-[14px] overflow-hidden shadow min-h-[180px] flex flex-col justify-between cursor-pointer">
              <div className="p-[18px] text-white font-bold text-[20px] tracking-[1px]">
                {note.topic}
                {expandedNoteIndex === idx && <div className="font-normal text-[14px] mt-2.5">{note.description}</div>}
              </div>
              <div className="bg-[#FFD600] px-[18px] py-4 flex justify-between items-center rounded-bl-[14px] rounded-br-[14px]">
                <span className="font-semibold text-[14px]">{note.subject}</span>
                <span className="text-[13px] text-[#23225c] font-semibold">{formatDate(note.date)}</span>
                <i className="bi bi-trash ml-2.5 cursor-pointer text-[#23225c] text-[18px]" onClick={(e) => { e.stopPropagation(); handleDeleteNote(idx); }}></i>
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
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick} className={`${(isActive || hover) ? 'bg-[#35348a]' : 'bg-transparent'} flex items-center px-[38px] py-[18px] cursor-pointer font-semibold text-[20px] ${isLast ? '' : 'mb-3'} rounded-tl-[30px] rounded-bl-[30px] transition-colors`}>
      <i className={`bi ${icon} text-[26px] text-white mr-[22px]`}></i>
      <span className="italic text-white tracking-[1px]">{label}</span>
    </div>
  );
};

export default Notes;
