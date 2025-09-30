import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
    <div className="w-80 h-80">
      <Pie data={chartData} options={options} />
    </div>
  );
};

const courseData = {
  BSIT: {
    subjects: [
      'IT ELECTIVE 1',
      'IT ELECTIVE 2',
      'IT ELECTIVE 3',
      'DATABASE MANAGEMENT',
      'WEB DEVELOPMENT',
      'MOBILE DEVELOPMENT',
      'NETWORKING',
      'PROGRAMMING'
    ],
    sections: {
      'IT3': ['IT3R1', 'IT3R2', 'IT3R3', 'IT3R4', 'IT3R5'],
      'IT2': ['IT2R1', 'IT2R2', 'IT2R3', 'IT2R4', 'IT2R5'],
      'IT1': ['IT1R1', 'IT1R2', 'IT1R3', 'IT1R4', 'IT1R5']
    }
  },
  BSCS: {
    subjects: [
      'ALGORITHMS',
      'DATA STRUCTURES',
      'COMPUTER ARCHITECTURE',
      'ARTIFICIAL INTELLIGENCE',
      'MACHINE LEARNING',
      'SOFTWARE ENGINEERING',
      'OPERATING SYSTEMS'
    ],
    sections: {
      'CS3': ['CS3R1', 'CS3R2', 'CS3R3', 'CS3R4'],
      'CS2': ['CS2R1', 'CS2R2', 'CS2R3', 'CS2R4'],
      'CS1': ['CS1R1', 'CS1R2', 'CS1R3', 'CS1R4']
    }
  }
};

const InstructorProfile = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [instructorData, setInstructorData] = useState({
    instructorId: '20221223456',
    fullName: 'Mr. Angelo Alejo',
    email: 'angelo.alejo@gmail.com',
    department: 'CITC',
    course: 'BSIT',
    subjects: ['IT ELECTIVE 1', 'DATABASE MANAGEMENT'],
    sections: ['IT3R1', 'IT3R2']
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstructorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      console.log('Saving changes:', instructorData);
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel */}
      <div className="w-80 pt-8 flex flex-col items-center shadow-lg" style={{
        background: 'linear-gradient(135deg, #23225c 60%, #1A1850 100%)'
      }}>
        <div className="self-start ml-4 mt-2 mb-8 text-white font-extrabold text-2xl tracking-wider">
          INSTRUCTOR PROFILE
        </div>

        <div className="w-50 h-50 rounded-full bg-gray-300 flex items-center justify-center text-5xl text-gray-600 font-bold shadow-md mb-10 ml-0">
          I-Profile
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 relative">
        {/* Back Button */}
        <div 
          className="absolute top-11 left-12 cursor-pointer text-3xl text-gray-800"
          onClick={() => navigate('/instructor-dashboard')}
        >
          <i className="bi bi-arrow-left"></i>
        </div>

        {/* Profile Dropdown */}
        <div className="absolute top-8 right-12 z-10">
          <div className="relative">
            <div 
              className="rounded-full py-2.5 px-5 flex items-center bg-black text-white cursor-pointer shadow-md"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="font-bold text-base tracking-wide">
                Instructor
              </span>
              <i className="bi bi-caret-down-fill ml-3 text-sm"></i>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 bg-white rounded-xl shadow-xl min-w-[200px]">
                <div 
                  className="py-3 px-5 cursor-pointer text-base text-gray-800 hover:bg-gray-50"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-12 flex flex-col gap-8">
          {/* Instructor Info */}
          <div className="bg-white rounded-2xl shadow-lg p-9">
            <div className="flex justify-between items-center mb-6">
              <div className="font-bold text-xl tracking-wide" style={{ color: '#23225c' }}>
                Instructor Information
              </div>
              <button 
                className={`py-2 px-6 text-sm font-semibold rounded-lg cursor-pointer border-0 text-white transition-colors ${
                  isEditing ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-opacity-90'
                }`}
                style={{ background: isEditing ? '#28a745' : '#23225c' }}
                onClick={handleEditToggle}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-7">
              {/* Instructor ID */}
              <div>
                <div className="font-semibold text-base mb-1.5 text-black">
                  Instructor ID
                </div>
                <input
                  name="instructorId"
                  className={`w-full py-2.5 px-3.5 text-base border rounded-lg mb-4.5 transition-all ${
                    isEditing 
                      ? 'bg-white border-[#23225c] text-black' 
                      : 'bg-[#f9fafd] border-gray-200 text-gray-800'
                  }`}
                  readOnly={!isEditing}
                  value={instructorData.instructorId}
                  onChange={handleInputChange}
                />
              </div>

              {/* Full Name */}
              <div>
                <div className="font-semibold text-base mb-1.5 text-black">
                  Full Name
                </div>
                <input
                  name="fullName"
                  className={`w-full py-2.5 px-3.5 text-base border rounded-lg mb-4.5 transition-all ${
                    isEditing 
                      ? 'bg-white border-[#23225c] text-black' 
                      : 'bg-[#f9fafd] border-gray-200 text-gray-800'
                  }`}
                  readOnly={!isEditing}
                  value={instructorData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email Address */}
              <div>
                <div className="font-semibold text-base mb-1.5 text-black">
                  Email Address
                </div>
                <input
                  name="email"
                  className={`w-full py-2.5 px-3.5 text-base border rounded-lg mb-4.5 transition-all ${
                    isEditing 
                      ? 'bg-white border-[#23225c] text-black' 
                      : 'bg-[#f9fafd] border-gray-200 text-gray-800'
                  }`}
                  readOnly={!isEditing}
                  value={instructorData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Department */}
              <div>
                <div className="font-semibold text-base mb-1.5 text-black">
                  Department
                </div>
                <select
                  name="department"
                  className={`w-full py-2.5 px-3.5 text-base border rounded-lg mb-4.5 transition-all ${
                    isEditing 
                      ? 'bg-white border-[#23225c] text-black' 
                      : 'bg-[#f9fafd] border-gray-200 text-gray-800'
                  }`}
                  disabled={!isEditing}
                  value={instructorData.department}
                  onChange={handleInputChange}
                >
                  <option value="CITC">CITC</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              {/* Course */}
              <div>
                <div className="font-semibold text-base mb-1.5 text-black">
                  Course
                </div>
                <select
                  name="course"
                  className={`w-full py-2.5 px-3.5 text-base border rounded-lg mb-4.5 transition-all ${
                    isEditing 
                      ? 'bg-white border-[#23225c] text-black' 
                      : 'bg-[#f9fafd] border-gray-200 text-gray-800'
                  }`}
                  disabled={!isEditing}
                  value={instructorData.course}
                  onChange={handleInputChange}
                >
                  <option value="BSIT">BS Information Technology</option>
                  <option value="BSCS">BS Computer Science</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <div className="font-semibold text-base mb-1.5 text-black">
                  Subject
                </div>
                <div className={`border border-gray-200 rounded-lg max-h-52 overflow-auto ${
                  isEditing ? 'bg-white' : 'bg-[#f9fafd]'
                }`}>
                  {courseData[instructorData.course]?.subjects.map((subject) => (
                    <div 
                      key={subject}
                      className={`py-2.5 px-3.5 flex items-center gap-2.5 border-b border-gray-200 ${
                        isEditing ? 'cursor-pointer' : 'cursor-default'
                      } ${instructorData.subjects.includes(subject) ? 'bg-blue-50' : ''}`}
                      onClick={() => {
                        if (!isEditing) return;
                        setInstructorData(prev => ({
                          ...prev,
                          subjects: prev.subjects.includes(subject) 
                            ? prev.subjects.filter(s => s !== subject)
                            : [...prev.subjects, subject]
                        }));
                      }}
                    >
                      <input 
                        type="checkbox"
                        checked={instructorData.subjects.includes(subject)}
                        onChange={() => {}}
                        disabled={!isEditing}
                        className={isEditing ? 'cursor-pointer' : 'cursor-default'}
                      />
                      <span className="text-gray-800 flex-1">{subject}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Click subjects to select/deselect
                </div>
              </div>

              {/* Section */}
              <div>
                <div className="font-semibold text-base mb-1.5 text-black">
                  Section
                </div>
                <div className="flex flex-col gap-3">
                  {Object.entries(courseData[instructorData.course]?.sections || {}).map(([year, sections]) => (
                    <div key={year}>
                      <div className="font-semibold text-sm text-gray-600 mb-1 border-b border-gray-200 pb-1">
                        {year}
                      </div>
                      <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
                        {sections.map((section) => (
                          <div
                            key={section}
                            className={`py-2 px-3 rounded-md border border-gray-200 text-sm flex items-center gap-2 ${
                              isEditing ? 'cursor-pointer' : 'cursor-default'
                            } ${
                              instructorData.sections.includes(section) 
                                ? 'bg-blue-50' 
                                : isEditing ? 'bg-white' : 'bg-[#f9fafd]'
                            }`}
                            onClick={() => {
                              if (!isEditing) return;
                              setInstructorData(prev => ({
                                ...prev,
                                sections: prev.sections.includes(section)
                                  ? prev.sections.filter(s => s !== section)
                                  : [...prev.sections, section]
                              }));
                            }}
                          >
                            <input 
                              type="checkbox"
                              checked={instructorData.sections.includes(section)}
                              onChange={() => {}}
                              disabled={!isEditing}
                              className={isEditing ? 'cursor-pointer' : 'cursor-default'}
                            />
                            <span className="text-gray-800">{section}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Click sections to select/deselect
                </div>
              </div>
            </div>
          </div>

          {/* Performance Section */}
          <div className="bg-white rounded-2xl shadow-lg p-9">
            <div className="font-bold text-xl mb-4.5 tracking-wide" style={{ color: '#23225c' }}>
              Class Performance
            </div>
            <div className="flex flex-row gap-8 items-center justify-center">
              <PieChart data={pieData} />
              <div className="flex flex-col gap-4.5 ml-3">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <span 
                      className="w-4.5 h-4.5 rounded"
                      style={{
                        background: item.color,
                        border: `1.5px solid ${item.color}99`
                      }}
                    ></span>
                    <span className="font-semibold text-gray-800 text-base">
                      {item.label}
                    </span>
                    <span className="text-gray-800 text-sm ml-2">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;