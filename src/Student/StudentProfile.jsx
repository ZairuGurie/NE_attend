import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const pieData = [
  { label: 'Present', value: 62.5, color: '#7CFC00' },
  { label: 'Absent', value: 25, color: '#FF5A5A' },
  { label: 'Late', value: 12.5, color: '#FFE066' },
];

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: data.map(d => d.color),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-[320px] h-[320px]">
      <Pie data={chartData} options={options} />
    </div>
  );
};

const StudentProfile = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState({
    studentId: '20221223456',
    fullName: 'John Deck',
    email: 'john@gmail.com',
    department: 'CITC',
    section: 'IT1R10',
    course: 'BSIT',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    // Clear any auth state here if needed
    setIsDropdownOpen(false);
    navigate('/login', { replace: true });
  };

  const baseInputClass = 'w-full px-[14px] py-[10px] text-[17px] rounded-lg mb-[18px] box-border font-inherit border focus:outline-none';
  const readOnlyInputClass = `${baseInputClass} bg-[#f9fafd] text-[#232323] border-[#e0e0e0]`;
  const editableInputClass = `${baseInputClass} bg-white text-black border-[#23225c]`;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-[320px] bg-[linear-gradient(135deg,#23225c_60%,#1A1850_100%)] text-white flex flex-col items-center pt-8 shadow-[2px_0_16px_rgba(44,44,84,0.10)]">
        <div className="font-extrabold text-[26px] tracking-[1px] text-white self-start ml-8 mt-2 mb-8 font-sans">STUDENT PROFILE</div>
        <div className="w-[160px] h-[160px] rounded-full bg-[#D9D9D9] mb-0 flex items-center justify-center text-[54px] text-[#888] font-bold shadow">JD</div>
      </div>

      {/* Main Content Scrollable */}
      <div className="flex-1 overflow-y-auto bg-[#f4f6fb] relative">
        {/* Top Header */}
        <div className="absolute top-[42px] left-12 cursor-pointer text-[32px] text-[#232323]" onClick={() => navigate('/dashboard')}>
          <i className="bi bi-arrow-left"></i>
        </div>

        <div className="absolute top-8 right-12 z-[2]">
          <div className="relative">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsDropdownOpen((prev) => !prev)}>
              <div className="w-[42px] h-[42px] rounded-full bg-[#FFDE33] flex items-center justify-center text-[26px]"><span>😏</span></div>
              <div className="rounded-full px-5 py-2.5 flex items-center bg-black text-white shadow">
                <span className="font-bold text-[16px] tracking-[0.5px]">Student Name</span>
                <i className="bi bi-caret-down-fill ml-3 text-[14px]"></i>
              </div>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 bg-white rounded-[12px] shadow-[0_6px_20px_rgba(0,0,0,0.15)] min-w-[200px] overflow-hidden border border-[#e0e0e0]">
                <div className="px-5 py-3 cursor-pointer text-[16px] text-[#333] hover:bg-[#f8f9fa]" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-[800px] mx-auto px-6 pt-24 pb-12 flex flex-col gap-8">
          {/* Student Info */}
          <div className="bg-white rounded-[18px] shadow-[0_4px_24px_rgba(44,44,84,0.10)] px-10 py-9">
            <div className="flex justify-between items-center mb-6">
              <div className="font-bold text-[22px] text-[#23225c] tracking-[0.5px]">Student Information</div>
              <button className={`px-6 py-2 rounded-lg text-[15px] font-semibold text-white ${isEditing ? 'bg-[#28a745]' : 'bg-[#23225c]'}`} onClick={handleEditToggle}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
            <div className="grid [grid-template-columns:1fr_1fr] gap-7">
              <div>
                <div className="font-semibold text-[17px] mb-1.5 text-black">Student ID</div>
                <input name="studentId" className={isEditing ? editableInputClass : readOnlyInputClass} readOnly={!isEditing} value={studentData.studentId} onChange={handleInputChange} />
              </div>
              <div>
                <div className="font-semibold text-[17px] mb-1.5 text-black">Full Name</div>
                <input name="fullName" className={isEditing ? editableInputClass : readOnlyInputClass} readOnly={!isEditing} value={studentData.fullName} onChange={handleInputChange} />
              </div>
              <div>
                <div className="font-semibold text-[17px] mb-1.5 text-black">Email Address</div>
                <input name="email" className={isEditing ? editableInputClass : readOnlyInputClass} readOnly={!isEditing} value={studentData.email} onChange={handleInputChange} />
              </div>
              <div>
                <div className="font-semibold text-[17px] mb-1.5 text-black">Department</div>
                <input name="department" className={isEditing ? editableInputClass : readOnlyInputClass} readOnly={!isEditing} value={studentData.department} onChange={handleInputChange} />
              </div>
              <div>
                <div className="font-semibold text-[17px] mb-1.5 text-black">Section</div>
                <input name="section" className={isEditing ? editableInputClass : readOnlyInputClass} readOnly={!isEditing} value={studentData.section} onChange={handleInputChange} />
              </div>
              <div>
                <div className="font-semibold text-[17px] mb-1.5 text-black">Course</div>
                <input name="course" className={isEditing ? editableInputClass : readOnlyInputClass} readOnly={!isEditing} value={studentData.course} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-[18px] shadow-[0_4px_24px_rgba(44,44,84,0.10)] px-10 py-9">
            <div className="font-bold text-[22px] mb-4.5 text-[#23225c] tracking-[0.5px]">Your Performance</div>
            <div className="flex flex-row gap-8 items-center justify-center">
              <PieChart data={pieData} />
              <div className="flex flex-col gap-4.5 ml-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-[18px] h-[18px] rounded bg-[#7CFC00] border-[1.5px] border-[#c7e7b0]"></span>
                  <span className="font-semibold text-[#232323] text-[16px]">Present</span>
                  <span className="text-[#232323] text-[15px] ml-2">62.5%</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-[18px] h-[18px] rounded bg-[#FF5A5A] border-[1.5px] border-[#f7b0b0]"></span>
                  <span className="font-semibold text-[#232323] text-[16px]">Absent</span>
                  <span className="text-[#232323] text-[15px] ml-2">25%</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-[18px] h-[18px] rounded bg-[#FFE066] border-[1.5px] border-[#f7eeb0]"></span>
                  <span className="font-semibold text-[#232323] text-[16px]">Late</span>
                  <span className="text-[#232323] text-[15px] ml-2">12.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
