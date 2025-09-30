import React from 'react';
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
  const navigate = useNavigate();
  const handleConfirm = () => {
    // Simulate navigation to login
    console.log('Navigating to login...');
    alert('Account created successfully! Redirecting to login...');
    navigate('/confirm/login');
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white pt-0 relative box-border">
      <div 
        className="absolute top-[120px] left-1/2 -translate-x-1/2 text-2xl font-extrabold text-[#111]"
        style={{ letterSpacing: '0.6px', fontFamily: 'Segoe UI, Arial, sans-serif' }}
      >
        CREATE ACCOUNT
      </div>

      <button 
        aria-label="Go back" 
        onClick={handleBack} 
        className="absolute  top-[92px] left-[14%] text-black"
      >
        <span className="text-[40px]">←</span>
      </button>

      <div 
        className="w-[480px] max-w-[90vw] bg-[#1E1A50] rounded-2xl px-8 py-10 text-center text-white"
        style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}
      >
        <h3 
          className="text-base font-semibold mb-1 text-white"
          style={{ letterSpacing: '0.6px' }}
        >
          ACCOUNT CREATED
        </h3>
        <h1 
          className="text-[28px] font-extrabold mb-6 text-white"
          style={{ letterSpacing: '0.8px' }}
        >
          SUCCESSFULLY
        </h1>

        {/* Checkmark */}
        <div className="w-[120px] h-[120px] rounded-full bg-[#10b981] flex items-center justify-center mx-auto mb-8">
          <span className="text-[60px] font-bold text-[#111]">✔</span>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleConfirm} 
            className="px-6 py-2.5 rounded-[22px] border-none bg-[#10b981] text-[#111] italic font-medium cursor-pointer text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;