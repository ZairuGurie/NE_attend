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
    <div style={{ width: 320, height: 320 }}>
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
      {/* Sidebar */}
      <div
        style={{
          width: 320,
          background: 'linear-gradient(135deg, #23225c 60%, #1A1850 100%)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 32,
          boxShadow: '2px 0 16px rgba(44,44,84,0.10)',
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: 1,
            color: '#fff',
            alignSelf: 'flex-start',
            marginLeft: 32,
            marginTop: 8,
            marginBottom: 32,
            fontFamily: 'Segoe UI, sans-serif',
          }}
        >
          STUDENT PROFILE
        </div>

        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: '#D9D9D9',
            marginBottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 54,
            color: '#888',
            fontWeight: 700,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          JD
        </div>
      </div>

      {/* Main Content Scrollable */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          background: '#f4f6fb',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            position: 'absolute',
            top: 42,
            left: 48,
            cursor: 'pointer',
            fontSize: 32,
            color: '#232323',
          }}
          onClick={() => navigate('/dashboard')}
        >
          <i className="bi bi-arrow-left"></i>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 32,
            right: 48,
            zIndex: 2,
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
              }}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: '#FFDE33',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                }}
              >
                <span>😏</span>
              </div>
              <div
                style={{
                  borderRadius: 50,
                  padding: '10px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  background: '#000000',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    letterSpacing: '0.5px',
                  }}
                >
                  Student Name
                </span>
                <i
                  className="bi bi-caret-down-fill"
                  style={{ marginLeft: 12, fontSize: 14 }}
                ></i>
              </div>
            </div>

            {isDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 12,
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  minWidth: 200,
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0',
                }}
              >
                <div
                  style={{
                    padding: '12px 20px',
                    cursor: 'pointer',
                    fontSize: 16,
                    color: '#333',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            padding: '96px 24px 48px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          {/* Student Info */}
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 4px 24px rgba(44,44,84,0.10)',
              padding: '36px 40px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  color: '#23225c',
                  letterSpacing: 0.5,
                }}
              >
                Student Information
              </div>
              <button style={buttonStyle} onClick={handleEditToggle}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 28,
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 17,
                    marginBottom: 6,
                    color: 'black',
                  }}
                >
                  Student ID
                </div>
                <input name="studentId" style={isEditing ? editableInputStyle : inputStyle} readOnly={!isEditing} value={studentData.studentId} onChange={handleInputChange} />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 17,
                    marginBottom: 6,
                    color: 'black',
                  }}
                >
                  Full Name
                </div>
                <input name="fullName" style={isEditing ? editableInputStyle : inputStyle} readOnly={!isEditing} value={studentData.fullName} onChange={handleInputChange} />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 17,
                    marginBottom: 6,
                    color: 'black',
                  }}
                >
                  Email Address
                </div>
                <input name="email" style={isEditing ? editableInputStyle : inputStyle} readOnly={!isEditing} value={studentData.email} onChange={handleInputChange} />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 17,
                    marginBottom: 6,
                    color: 'black',
                  }}
                >
                  Department
                </div>
                <input name="department" style={isEditing ? editableInputStyle : inputStyle} readOnly={!isEditing} value={studentData.department} onChange={handleInputChange} />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 17,
                    marginBottom: 6,
                    color: 'black',
                  }}
                >
                  Section
                </div>
                <input name="section" style={isEditing ? editableInputStyle : inputStyle} readOnly={!isEditing} value={studentData.section} onChange={handleInputChange} />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 17,
                    marginBottom: 6,
                    color: 'black',
                  }}
                >
                  Course
                </div>
                <input name="course" style={isEditing ? editableInputStyle : inputStyle} readOnly={!isEditing} value={studentData.course} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* Performance */}
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 4px 24px rgba(44,44,84,0.10)',
              padding: '36px 40px',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 18,
                color: '#23225c',
                letterSpacing: 0.5,
              }}
            >
              Your Performance
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PieChart data={pieData} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                  marginLeft: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      background: '#7CFC00',
                      border: '1.5px solid #c7e7b0',
                    }}
                  ></span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: '#232323',
                      fontSize: 16,
                    }}
                  >
                    Present
                  </span>
                  <span
                    style={{
                      color: '#232323',
                      fontSize: 15,
                      marginLeft: 8,
                    }}
                  >
                    62.5%
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      background: '#FF5A5A',
                      border: '1.5px solid #f7b0b0',
                    }}
                  ></span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: '#232323',
                      fontSize: 16,
                    }}
                  >
                    Absent
                  </span>
                  <span
                    style={{
                      color: '#232323',
                      fontSize: 15,
                      marginLeft: 8,
                    }}
                  >
                    25%
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      background: '#FFE066',
                      border: '1.5px solid #f7eeb0',
                    }}
                  ></span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: '#232323',
                      fontSize: 16,
                    }}
                  >
                    Late
                  </span>
                  <span
                    style={{
                      color: '#232323',
                      fontSize: 15,
                      marginLeft: 8,
                    }}
                  >
                    12.5%
                  </span>
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
