import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    groupName: '',
    timeSchedule: '',
    day: '',
    meetingLink: '',
    lateRuleTime: '15',
    section: ''
  });
  const [members, setMembers] = useState([
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com',
    'zailgray18@gmail.com'
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateGroup = () => {
    // Add your group creation logic here
    console.log('Creating group with data:', formData);
    console.log('Members:', members);
    navigate('/Group2'); // Navigate back to Groups page after creation
  };

  const handleInvite = () => {
    // Add your invite logic here
    console.log('Inviting members');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-[16px] w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto px-10 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="mr-6 text-[#23225c] cursor-pointer" onClick={() => navigate('/Group2')}>
            <i className="bi bi-arrow-left text-[24px]"></i>
          </div>
          <h2 className="m-0 text-[28px] font-extrabold text-[#23225c]">GROUP</h2>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#23225c]">GROUP NAME</label>
            <input 
              type="text"
              name="groupName"
              value={formData.groupName}
              onChange={handleInputChange}
              placeholder="IT ELECTIVE"
              className="px-4 py-3 rounded-lg border border-[#ddd] text-[16px] bg-white text-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#23225c]">TIME SCHEDULE</label>
            <input 
              type="time"
              name="timeSchedule"
              value={formData.timeSchedule}
              onChange={handleInputChange}
              className="px-4 py-3 rounded-lg border border-[#ddd] text-[16px] bg-white text-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#23225c]">DAY</label>
            <select 
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              className="px-4 py-3 rounded-lg border border-[#ddd] text-[16px] bg-white text-black"
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
            <label className="text-[14px] font-semibold text-[#23225c]">MEETING LINK</label>
            <input 
              type="text"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleInputChange}
              placeholder="abc-defg-hijk"
              className="px-4 py-3 rounded-lg border border-[#ddd] text-[16px] bg-white text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#23225c]">LATE RULE TIME</label>
              <select 
                name="lateRuleTime"
                value={formData.lateRuleTime}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-lg border border-[#ddd] text-[16px] bg-white text-black"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#23225c]">SECTION</label>
              <input 
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                placeholder="Section Name"
                className="px-4 py-3 rounded-lg border border-[#ddd] text-[16px] bg-white text-black"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <label className="text-[14px] font-semibold text-[#23225c]">MEMBER</label>
              <button 
                type="button"
                onClick={handleInvite}
                className="bg-[#7CFC00] text-[#23225c] border-0 px-6 py-2 rounded-lg text-[15px] font-semibold"
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
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="button"
              onClick={handleCreateGroup}
              className="px-6 py-3 bg-[#23225c] text-white rounded-lg text-[15px] font-semibold"
            >
              Create Group/Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CreateGroup;