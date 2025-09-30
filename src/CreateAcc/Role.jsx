import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Role = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, email } = location.state || {};
  const [role, setRole] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!role) {
      alert('Please select a Role.');
      return;
    }

    // No backend — just navigate and carry forward the data
    navigate('/role/dep-course', {
      state: { firstName, lastName, email, role },
    });
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white relative box-border">
      <div className="absolute top-[200px] left-1/2 -translate-x-1/2 text-[28px]">
        CREATE ACCOUNT
      </div>

      <button 
        aria-label="Go back" 
        onClick={handleBack} 
        className="absolute  top-[92px] left-[14%] text-black"
      >
        <span className="text-[50px]">←</span>
      </button>

      <div className="w-[640px] max-w-[92vw] bg-[#201B51] rounded-[16px] px-12 py-10 shadow-[0_12px_32px_rgba(0,0,0,0.10)] text-white">
        <form onSubmit={handleNext} className="w-full">
          {/* Role Selection */}
          <div className="flex flex-col">
            <label className="text-[14px] italic text-[#d7d8ff] mb-[10px]">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-[99%] h-12 rounded-[14px] border-0 outline-none px-4 text-[16px] bg-white text-[#111]"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end mt-7">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-[22px] py-3 rounded-[22px] border-0 bg-black text-white font-bold tracking-[0.4px] shadow-[0_6px_16px_rgba(16,185,129,0.35)]"
            >
              <span className="mr-3 font-bold">NEXT</span>
              <span className="text-[18px]">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Role;
