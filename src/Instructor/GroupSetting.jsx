import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const GroupSettings = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    groupName: 'IT ELECTIVE',
    timeSchedule: '09:00',
    day: 'monday',
    meetingLink: 'abc-defg-hijk',
    lateRuleTime: '15',
    section: 'IT3R10'
  });
  const [members] = useState([
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com'
  ]);

  const handleInputChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteGroup = () => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      navigate('/Group2');
    }
  };

  const handleInvite = () => {
    console.log('Inviting members');
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    // Add logic to save changes
    console.log('Saving changes:', formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-[16px] w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto px-10 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="mr-6 text-black cursor-pointer" onClick={() => navigate('/Group2')}>
            <i className="bi bi-arrow-left text-[24px]"></i>
          </div>
          <h2 className="m-0 text-[28px] font-extrabold text-black">GROUP SETTINGS</h2>
          <button 
            onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
            className={`ml-auto px-5 py-2 rounded-lg text-white text-[14px] font-semibold ${isEditing ? 'bg-[#7CFC00] text-black' : 'bg-[#23225c]'}`}
          >
            {isEditing ? 'Save Changes' : 'Edit Group'}
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-black">GROUP NAME</label>
            <input 
              type="text"
              name="groupName"
              value={formData.groupName}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`px-4 py-3 rounded-lg border border-[#ddd] text-[16px] ${isEditing ? 'bg-white cursor-text' : 'bg-[#f5f5f5] cursor-default'} text-black`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-black">TIME SCHEDULE</label>
            <input 
              type="time"
              name="timeSchedule"
              value={formData.timeSchedule}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`px-4 py-3 rounded-lg border border-[#ddd] text-[16px] ${isEditing ? 'bg-white cursor-text' : 'bg-[#f5f5f5] cursor-default'} text-black`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-black">DAY</label>
            <select 
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`px-4 py-3 rounded-lg border border-[#ddd] text-[16px] ${isEditing ? 'bg-white cursor-pointer' : 'bg-[#f5f5f5] cursor-default'} text-black`}
            >
              <option value="">Select Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-black">MEETING LINK</label>
            <input 
              type="text"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`px-4 py-3 rounded-lg border border-[#ddd] text-[16px] ${isEditing ? 'bg-white cursor-text' : 'bg-[#f5f5f5] cursor-default'} text-black`}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">LATE RULE TIME</label>
              <select 
                name="lateRuleTime"
                value={formData.lateRuleTime}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`px-4 py-3 rounded-lg border border-[#ddd] text-[16px] ${isEditing ? 'bg-white cursor-pointer' : 'bg-[#f5f5f5] cursor-default'} text-black`}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-black">SECTION</label>
              <input 
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`px-4 py-3 rounded-lg border border-[#ddd] text-[16px] ${isEditing ? 'bg-white cursor-text' : 'bg-[#f5f5f5] cursor-default'} text-black`}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <label className="text-[14px] font-semibold text-black">MEMBER</label>
              <button 
                type="button"
                onClick={handleInvite}
                disabled={!isEditing}
                className={`px-6 py-2 rounded-lg text-[15px] font-semibold ${isEditing ? 'bg-[#7CFC00] text-black cursor-pointer' : 'bg-[#7CFC00] text-black opacity-50 cursor-not-allowed'}`}
              >
                Invite
              </button>
            </div>
            <div className="border border-[#ddd] rounded-lg max-h-[200px] overflow-y-auto">
              {members.map((email, idx) => (
                <div key={idx} className="px-4 py-3 flex items-center gap-3 border-b border-[#eee]">
                  <div className="w-8 h-8 rounded-full bg-[#f0f0f0] flex items-center justify-center">
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <span className="text-[15px] text-black">{email}</span>
                  {isEditing && (
                    <button className="ml-auto text-[#ff4444] p-1">
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button 
              type="button"
              onClick={handleDeleteGroup}
              disabled={!isEditing}
              className={`px-6 py-3 rounded-lg text-white text-[15px] font-semibold w-[200px] ${isEditing ? 'bg-[#ff4444] cursor-pointer' : 'bg-[#ff4444] opacity-50 cursor-not-allowed'}`}
            >
              DELETE Group
            </button>
            <button
              type="button"
              onClick={() => navigate('/Group2')}
              className="px-6 py-3 rounded-lg bg-[#7CFC00] text-black text-[15px] font-semibold"
            >
              Start Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default GroupSettings;