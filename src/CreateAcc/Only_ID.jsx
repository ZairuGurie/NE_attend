import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Only_ID = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!userId) {
      alert('Please enter your User ID.');
      return;
    }
    // TODO: persist selections if needed
    navigate('/onlyid/concode'); // adjust route if different
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white relative box-border">
      <div className="absolute top-[200px] left-1/2 -translate-x-1/2 text-[28px] font-extrabold tracking-[0.6px] text-[#111] font-sans">CREATE ACCOUNT</div>

      <button 
        aria-label="Go back" 
        onClick={handleBack} 
        className="absolute  top-[92px] left-[14%] text-black"
      >
        <span className="text-[50px]">←</span>
      </button>

      <div className="w-[640px] max-w-[92vw] bg-[#201B51] rounded-[16px] px-12 py-10 shadow-[0_12px_32px_rgba(0,0,0,0.10)] text-white">
        <form onSubmit={handleNext} className="w-full">
          {/* User ID Input */}
          <div className="flex flex-col">
            <label className="text-[14px] italic text-[#d7d8ff] mb-[10px]">User ID</label>
            <input
              type="text"
              value={userId}
              placeholder="Enter your User ID"
              onChange={(e) => setUserId(e.target.value)}
              className="w-[100%] h-12 rounded-[14px] border-0 outline-none px-4 text-[16px] bg-white text-[#111]"
              required
            />
          </div>

          <div className="flex justify-end mt-7">
            <button type="submit" className="inline-flex items-center justify-center px-[22px] py-3 rounded-[22px] border-0 bg-black text-white font-bold tracking-[0.4px] shadow-[0_6px_16px_rgba(16,185,129,0.35)]">
              <span className="mr-3 font-bold">NEXT</span>
              <span className="text-[18px]">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default Only_ID;
