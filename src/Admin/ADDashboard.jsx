import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logologin.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ADDashboard = () => {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState('STUDENT');

  const users = [
    { id: '202230556', name: 'First Name Last Name', role: 'Student', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Instructor', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Instructor', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Student', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Instructor', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Instructor', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Student', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Student', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Student', email: 'sample@gmail.com', department: 'CITC' },
    { id: '202230556', name: 'First Name Last Name', role: 'Instructor', email: 'sample@gmail.com', department: 'CITC' },
  ];

  const handleLogout = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen w-screen bg-[#f4f6fb] font-sans flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[#23225c] px-10 py-5 flex justify-between items-center shadow">
        <img src={logo} alt="NE ATTEND Logo" className="h-[60px] w-auto" />
        <div className="flex items-center gap-6">
          <span className="text-white text-[24px] font-bold tracking-[0.5px]">ADMIN</span>
          <button onClick={handleLogout} className="flex items-center px-5 py-2 bg-transparent border-2 border-white rounded-lg text-white text-[16px] font-semibold">
            <i className="bi bi-box-arrow-right mr-2"></i>
            LOGOUT
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-10 flex gap-10 flex-1 overflow-y-auto h-[calc(100vh-100px)]">
        {/* User Management Section */}
        <div className="flex-2 flex flex-col min-w-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[24px] font-bold text-[#23225c] m-0 tracking-[0.5px]">User Management</h2>
            <select 
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
              className="px-5 py-2 text-[16px] rounded-lg border border-[#ddd] bg-white text-[#23225c] cursor-pointer"
            >
              <option value="STUDENT">STUDENT</option>
              <option value="INSTRUCTOR">INSTRUCTOR</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-[16px] p-6 shadow overflow-x-auto max-h-[calc(100vh-280px)] min-h-[200px]">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#f8f9fa] text-[#23225c] border-b-2 border-[#eee]">
                  <th className="text-left px-5 py-4 font-bold text-[15px]">User ID</th>
                  <th className="text-left px-5 py-4 font-bold text-[15px]">User Name</th>
                  <th className="text-left px-5 py-4 font-bold text-[15px]">User Role</th>
                  <th className="text-left px-5 py-4 font-bold text-[15px]">Email</th>
                  <th className="text-left px-5 py-4 font-bold text-[15px]">Department</th>
                  <th className="text-left px-5 py-4 font-bold text-[15px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b border-[#eee]">
                    <td className="px-5 py-4 text-[15px] text-[#444]">{user.id}</td>
                    <td className="px-5 py-4 text-[15px] text-[#444]">{user.name}</td>
                    <td className="px-5 py-4 text-[15px] text-[#444]">{user.role}</td>
                    <td className="px-5 py-4 text-[15px] text-[#444]">{user.email}</td>
                    <td className="px-5 py-4 text-[15px] text-[#444]">{user.department}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-2 bg-[#23225c] text-white rounded"> 
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button className="px-3 py-2 bg-[#ff4444] text-white rounded">
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rules Section */}
        <div className="flex-1 bg-white rounded-[16px] p-7 h-fit shadow min-w-[300px] max-h-[calc(100vh-180px)] overflow-y-auto">
          <h3 className="text-[20px] font-bold text-[#23225c] mb-6 tracking-[0.5px]">Set Rule</h3>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[15px] font-semibold text-[#23225c]">Absent Rule</label>
              <select className="px-4 py-3 text-[15px] rounded-lg border border-[#ddd] bg-white text-[#23225c] cursor-pointer">
                <option>3 consecutive absent = D/F</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] font-semibold text-[#23225c]">Late Rule</label>
              <select className="px-4 py-3 text-[15px] rounded-lg border border-[#ddd] bg-white text-[#23225c] cursor-pointer">
                <option>3 consecutive Late = 1 Absent</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] font-semibold text-[#23225c]">NOTIFY STUDENT</label>
              <label className="flex items-center gap-2 text-[#444]"><input type="checkbox" id="notifyStudent" />Send notifications to students</label>
            </div>

            <div className="bg-[#f8f9fa] p-6 rounded-[12px] border border-[#eee]">
              <h4 className="text-[17px] font-bold text-[#23225c] mb-4 tracking-[0.5px]">Policy note</h4>
              <div className="flex flex-col gap-3">
                <p className="text-[15px] text-[#444] m-0">• 3 Lates = 1 Absent</p>
                <p className="text-[15px] text-[#444] m-0">• 3 Consecutive Absent = D/F</p>
                <p className="text-[15px] text-[#444] m-0">Student must follow the rules. The participation will reflect their performance.</p>
              </div>
            </div>

            <button className="px-6 py-3 bg-[#23225c] text-white rounded-lg text-[16px] font-semibold self-end mt-4 shadow">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    minHeight: '100vh',
    width: '100vw',
    background: '#f4f6fb',
    fontFamily: 'Segoe UI, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden' // Keep this to prevent body scroll
  },
  header: {
    background: '#23225c',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  logo: {
    height: 60,
    width: 'auto'
  },
  adminControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 24
  },
  adminText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: 0.5
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    background: 'transparent',
    border: '2px solid #fff',
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  contentContainer: {
    padding: 40,
    display: 'flex',
    gap: 40,
    flex: 1,
    overflowY: 'auto', // Enable vertical scrolling
    height: 'calc(100vh - 100px)' // Subtract header height
  },
  userManagementSection: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0 // Allow flex shrinking
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#23225c',
    margin: 0,
    letterSpacing: 0.5
  },
  userTypeSelect: {
    padding: '10px 20px',
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    color: '#23225c',
    cursor: 'pointer'
  },
  tableWrapper: {
    background: '#fff',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    overflowX: 'auto', // Enable horizontal scroll for table if needed
    maxHeight: 'calc(100vh - 280px)', // Give space for header and other elements
    minHeight: '200px' // Minimum height for better appearance
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '800px' // Prevent table from becoming too narrow
  },
  th: {
    textAlign: 'left',
    padding: '16px 20px',
    background: '#f8f9fa',
    color: '#23225c',
    fontWeight: 700,
    fontSize: 15,
    borderBottom: '2px solid #eee'
  },
  tr: {
    borderBottom: '1px solid #eee',
    transition: 'background-color 0.2s ease'
  },
  td: {
    padding: '16px 20px',
    fontSize: 15,
    color: '#444'
  },
  actionButtons: {
    display: 'flex',
    gap: 8
  },
  editButton: {
    padding: '8px 12px',
    background: '#23225c',
    border: 'none',
    borderRadius: 6,
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  deleteButton: {
    padding: '8px 12px',
    background: '#ff4444',
    border: 'none',
    borderRadius: 6,
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  rulesSection: {
    flex: 1,
    background: '#fff',
    borderRadius: 16,
    padding: 28,
    height: 'fit-content',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    minWidth: '300px', // Minimum width for rules section
    maxHeight: 'calc(100vh - 180px)', // Maximum height
    overflowY: 'auto' // Enable vertical scrolling if needed
  },
  ruleTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#23225c',
    marginBottom: 24,
    letterSpacing: 0.5
  },
  ruleForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  label: {
    fontSize: 15,
    fontWeight: 600,
    color: '#23225c'
  },
  select: {
    padding: '12px 16px',
    fontSize: 15,
    borderRadius: 8,
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    color: '#23225c',
    cursor: 'pointer'
  },
  notifyCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#444'
  },
  policyNote: {
    background: '#f8f9fa',
    padding: 24,
    borderRadius: 12,
    border: '1px solid #eee'
  },
  policyTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: '#23225c',
    marginBottom: 16,
    letterSpacing: 0.5
  },
  policyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  policyText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 1.5,
    margin: 0
  },
  postButton: {
    padding: '12px 24px',
    background: '#23225c',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    alignSelf: 'flex-end',
    marginTop: 16,
    transition: 'transform 0.2s ease',
    boxShadow: '0 2px 8px rgba(35,34,92,0.2)'
  }
};

export default ADDashboard;