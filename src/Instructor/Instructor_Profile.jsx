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
    <div style={{ width: 320, height: 320 }}>
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
      // Save changes
      console.log('Saving changes:', instructorData);
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    navigate('/login', { replace: true });
  };

  const handleSubjectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setInstructorData(prev => ({
      ...prev,
      subjects: selectedOptions
    }));
  };

  const handleSectionChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setInstructorData(prev => ({
      ...prev,
      sections: selectedOptions
    }));
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    fontSize: 17,
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    marginBottom: 18,
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    background: '#f9fafd',
    color: '#232323',
    transition: 'border 0.2s, background 0.2s',
  };

  const editableInputStyle = {
    ...inputStyle,
    background: '#fff',
    border: '1px solid #23225c',
    color: '#000',
  };

  const buttonStyle = {
    padding: '8px 24px',
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 8,
    cursor: 'pointer',
    border: 'none',
    background: isEditing ? '#28a745' : '#23225c',
    color: '#fff',
    transition: 'background 0.2s',
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left Panel */}
      <div style={{
        width: 320,
        background: 'linear-gradient(135deg, #23225c 60%, #1A1850 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 32,
        boxShadow: '2px 0 16px rgba(44,44,84,0.10)',
      }}>
        <div style={{
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: 1,
          color: '#fff',
          alignSelf: 'flex-start',
          marginLeft: 32,
          marginTop: 8,
          marginBottom: 32,
          fontFamily: 'Segoe UI, sans-serif',
        }}>
          INSTRUCTOR PROFILE
        </div>

        <div style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: '#D9D9D9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 48,
          color: '#666',
          fontWeight: 700,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          marginBottom: 40,
        }}>
          AA
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        background: '#f4f6fb',
        position: 'relative',
      }}>
        {/* Back Button */}
        <div style={{
          position: 'absolute',
          top: 42,
          left: 48,
          cursor: 'pointer',
          fontSize: 32,
          color: '#232323',
        }} onClick={() => navigate('/instructor-dashboard')}>
          <i className="bi bi-arrow-left"></i>
        </div>

        {/* Profile Dropdown */}
        <div style={{
          position: 'absolute',
          top: 32,
          right: 48,
          zIndex: 2,
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 50,
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              background: '#000000',
              color: '#ffffff',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <span style={{
                fontWeight: 'bold',
                fontSize: '16px',
                letterSpacing: '0.5px',
              }}>
                Instructor
              </span>
              <i className="bi bi-caret-down-fill" style={{ marginLeft: 12, fontSize: 14 }}></i>
            </div>

            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 12,
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                minWidth: 200,
              }}>
                <div style={{
                  padding: '12px 20px',
                  cursor: 'pointer',
                  fontSize: 16,
                  color: '#333',
                }} onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '96px 24px 48px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}>
          {/* Instructor Info */}
          <div style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 4px 24px rgba(44,44,84,0.10)',
            padding: '36px 40px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{
                fontWeight: 700,
                fontSize: 22,
                color: '#23225c',
                letterSpacing: 0.5,
              }}>
                Instructor Information
              </div>
              <button style={buttonStyle} onClick={handleEditToggle}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 28,
            }}>
              {/* Form Fields */}
              <div>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, color: 'black' }}>
                  Instructor ID
                </div>
                <input
                  name="instructorId"
                  style={isEditing ? editableInputStyle : inputStyle}
                  readOnly={!isEditing}
                  value={instructorData.instructorId}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, color: 'black' }}>
                  Full Name
                </div>
                <input
                  name="fullName"
                  style={isEditing ? editableInputStyle : inputStyle}
                  readOnly={!isEditing}
                  value={instructorData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, color: 'black' }}>
                  Email Address
                </div>
                <input
                  name="email"
                  style={isEditing ? editableInputStyle : inputStyle}
                  readOnly={!isEditing}
                  value={instructorData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, color: 'black' }}>
                  Department
                </div>
                <select
                  name="department"
                  style={isEditing ? editableInputStyle : inputStyle}
                  disabled={!isEditing}
                  value={instructorData.department}
                  onChange={handleInputChange}
                >
                  <option value="CITC">CITC</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, color: 'black' }}>
                  Course
                </div>
                <select
                  name="course"
                  style={isEditing ? editableInputStyle : inputStyle}
                  disabled={!isEditing}
                  value={instructorData.course}
                  onChange={handleInputChange}
                >
                  <option value="BSIT">BS Information Technology</option>
                  <option value="BSCS">BS Computer Science</option>
                </select>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, color: 'black' }}>
                  Subject
                </div>
                <div style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  maxHeight: 200,
                  overflow: 'auto',
                  background: isEditing ? '#fff' : '#f9fafd'
                }}>
                  {courseData[instructorData.course]?.subjects.map((subject) => (
                    <div 
                      key={subject}
                      style={{
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        borderBottom: '1px solid #e0e0e0',
                        cursor: isEditing ? 'pointer' : 'default',
                        background: instructorData.subjects.includes(subject) ? '#f0f9ff' : 'transparent'
                      }}
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
                        style={{ cursor: isEditing ? 'pointer' : 'default' }}
                      />
                      <span style={{ color: '#232323', flex: 1 }}>{subject}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                  Click subjects to select/deselect
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, color: 'black' }}>
                  Section
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {Object.entries(courseData[instructorData.course]?.sections || {}).map(([year, sections]) => (
                    <div key={year}>
                      <div style={{ 
                        fontWeight: 600, 
                        fontSize: 14, 
                        color: '#666', 
                        marginBottom: 4,
                        borderBottom: '1px solid #eee',
                        paddingBottom: 4
                      }}>
                        {year}
                      </div>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: 8
                      }}>
                        {sections.map((section) => (
                          <div
                            key={section}
                            style={{
                              padding: '8px 12px',
                              borderRadius: 6,
                              border: '1px solid #e0e0e0',
                              cursor: isEditing ? 'pointer' : 'default',
                              background: instructorData.sections.includes(section) 
                                ? '#f0f9ff' 
                                : isEditing ? '#fff' : '#f9fafd',
                              color: '#232323',
                              fontSize: 14,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8
                            }}
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
                              style={{ cursor: isEditing ? 'pointer' : 'default' }}
                            />
                            {section}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                  Click sections to select/deselect
                </div>
              </div>
            </div>
          </div>

          {/* Performance Section */}
          <div style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 4px 24px rgba(44,44,84,0.10)',
            padding: '36px 40px',
          }}>
            <div style={{
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 18,
              color: '#23225c',
              letterSpacing: 0.5,
            }}>
              Class Performance
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <PieChart data={pieData} />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                marginLeft: 12,
              }}>
                {pieData.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                    <span style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      background: item.color,
                      border: `1.5px solid ${item.color}99`,
                    }}></span>
                    <span style={{
                      fontWeight: 600,
                      color: '#232323',
                      fontSize: 16,
                    }}>
                      {item.label}
                    </span>
                    <span style={{
                      color: '#232323',
                      fontSize: 15,
                      marginLeft: 8,
                    }}>
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
