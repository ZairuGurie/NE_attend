import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Email = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    navigate('/email/role', { state: { email } });
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white pt-0 relative box-border">
      <div className="absolute left-1/2 text-3xl font-extrabold tracking-wide text-gray-900" style={{ top: 200, transform: 'translateX(-50%)' }}>
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
              Emails
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-[100%] h-12 rounded-2xl border-0 outline-none px-4 text-base bg-white text-gray-900"
              required
            />
          </div>

          <div className="flex justify-end mt-7">
            <button 
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center px-5 py-3 rounded-3xl border-0 bg-black text-white font-bold tracking-wide cursor-pointer"
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

export default Email;