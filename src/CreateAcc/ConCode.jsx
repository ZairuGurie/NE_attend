import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ConCode = () => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const navigate = useNavigate();

  const handleBack = () => {

    alert('Back button clicked');
    navigate(-1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!confirmationCode) {
      alert('Please enter the confirmation code.');
      return;
    }
    navigate('/concode/confirm', { state: { confirmationCode } });
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white pt-0 relative box-border">
      <div className="absolute left-1/2 text-3xl font-extrabold text-gray-900" style={{ top: 200, transform: 'translateX(-50%)', letterSpacing: 0.6, fontFamily: 'Segoe UI, Arial, sans-serif' }}>
        CREATE ACCOUNT
      </div>

      <button 
        aria-label="Go back" 
        onClick={handleBack} 
        className="absolute left-[14%] rounded-lg border-0 bg-transparent text-gray-900 cursor-pointer"
        style={{ top: 92 }}
      >
        <span className="text-5xl">←</span>
      </button>

      <div className="w-[640px] max-w-[92vw] rounded-2xl px-12 py-10 text-white" style={{ background: '#201B51', boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}>
        <div className="w-full">
          <div className="flex flex-col">
            <label className="text-sm italic mb-2.5" style={{ color: '#d7d8ff' }}>
              CONFIRMATION CODE (Check your Email)
            </label>
            <input
              type="text"
              value={confirmationCode}
              placeholder="Enter your confirmation code"
              onChange={(e) => setConfirmationCode(e.target.value)}
              className="w-[100%] h-12 rounded-2xl border-0 outline-none px-4 text-base bg-white text-gray-900"
              required
            />
          </div>

          <div className="flex justify-end mt-7">
            <button 
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center px-5 py-3 rounded-3xl border-0 bg-black text-white font-bold cursor-pointer"
              style={{ letterSpacing: 0.4, boxShadow: '0 6px 16px rgba(0, 0, 0, 0.35)' }}
            >
              <span className="mr-3 font-bold">NEXT</span>
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConCode;