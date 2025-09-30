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

  const handleProfileAction = (action) => {
    switch (action) {
      case 'profile':
        navigate('/instructor-profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        navigate('/login');
        break;
      default:
        break;
    }
    setShowDropdown(false);
  };

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
          <h2 className="m-0 font-extrabold text-[36px] text-[#23225c]">NOTES</h2>
          <div className="flex items-center gap-[14px] relative">
            <div className="relative">
              <i 
                className="bi bi-bell-fill text-[22px] text-[#23225c] cursor-pointer" 
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {showNotifications && (
                <div className="absolute right-0 top-[130%] bg-white border border-[#ccc] rounded-[10px] shadow z-[100] min-w-[250px]">
                  {notificationItems.map((note, idx) => (
                    <div key={idx} className="px-4 py-2 text-sm text-[#23225c] border-b border-[#eee]">{note}</div>
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
                <div onClick={() => navigate('/I_Profile')} className="px-4 py-2 cursor-pointer text-[15px] text-[#23225c] font-medium border-b border-[#eee] bg-white">View Profile</div>
                <div onClick={() => alert('Settings')} className="px-4 py-2 cursor-pointer text-[15px] text-[#23225c] font-medium border-b border-[#eee] bg-white">Settings</div>
              </div>
            )}
          </div>
        </div>

        {/* Add Note Button */}
        <div className="mb-6 flex justify-end">
          <button 
            onClick={() => setShowForm(true)} 
            className="bg-[#7CFC00] text-[#23225c] px-6 py-3 rounded-lg font-bold text-[15px] flex items-center gap-2 shadow"
          >
            ADD NOTE <i className="bi bi-plus-lg"></i>
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-10 rounded-[16px] mb-[30px] shadow">
            <h3 className="m-0 mb-5 text-[#23225c] text-[20px] font-bold">Add New Note</h3>
            <div className="mb-4">
              <label className="block mb-2 text-[#23225c] font-semibold">Topic</label>
              <input name="topic" value={formData.topic} onChange={handleInputChange} placeholder="Enter topic" className="w-full px-4 py-2.5 border border-[#ddd] rounded-lg text-[16px] text-[#23225c]" />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-[#23225c] font-semibold">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Enter description" 
                rows={3} 
                className="w-full px-4 py-2.5 border border-[#ddd] rounded-lg text-[16px] text-[#23225c]" 
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-[#23225c] font-semibold">Subject</label>
              <input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Enter subject" className="w-full px-4 py-2.5 border border-[#ddd] rounded-lg text-[16px] text-[#23225c]" />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-[#23225c] font-semibold">Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-[#ddd] rounded-lg text-[16px] text-[#23225c]" />
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-lg text-[16px] font-semibold bg-[#ff4444] text-white">Cancel</button>
              <button onClick={handleAddNote} className="px-6 py-2.5 rounded-lg text-[16px] font-semibold bg-[#7CFC00] text-[#23225c]">Save</button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-10">
          {notes.map((note, idx) => (
            <div key={idx} onClick={() => toggleNoteExpansion(idx)} className="bg-[#23225c] rounded-[16px] overflow-hidden shadow cursor-pointer">
              <div className="p-5 text-white">
                <h3 className="m-0 text-[24px] font-extrabold">{note.topic}</h3>
                {expandedNoteIndex === idx && (
                  <p className="mt-3 text-[15px] leading-snug">{note.description}</p>
                )}
              </div>
              <div className="bg-[#FFD600] px-5 py-4 flex justify-between items-center">
                <span className="font-semibold text-[14px]">{note.subject}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] text-[#23225c] font-semibold">{formatDate(note.date)}</span>
                  <i 
                    className="bi bi-trash cursor-pointer text-[#23225c] text-[18px]" 
                    onClick={(e) => { e.stopPropagation(); handleDeleteNote(idx); }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Styles
// replaced inline style objects with Tailwind classes

const SidebarItem = ({ icon, label, path, isActive, isLast, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick} className={`${(isActive || hover) ? 'bg-[#35348a]' : 'bg-transparent'} flex items-center px-[38px] py-[18px] cursor-pointer font-semibold text-[20px] ${isLast ? '' : 'mb-3'} rounded-tl-[30px] rounded-bl-[30px] transition-colors`}>
      <i className={`bi ${icon} text-[26px] text-white mr-[22px]`}></i>
      <span className="italic text-white tracking-[1px]">{label}</span>
    </div>
  );
};

// dropdown item styles migrated to Tailwind inline classes

export default Notes;
