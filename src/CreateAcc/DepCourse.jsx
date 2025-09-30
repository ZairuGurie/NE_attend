import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate hook

const DepCourse = () => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const [firstName] = useState('John');
  const [lastName] = useState('Doe');
  const [email] = useState('john.doe@example.com');
  const [role] = useState('Student');
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');

  const handleBack = () => {
    navigate(-1); // ✅ use navigate instead of window.history.back()
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!department || !course) {
      alert('Please select both Department and Course.');
      return;
    }

    // Simulate saving and navigation
    console.log('Proceeding to next step with data:', {
      firstName,
      lastName,
      email,
      role,
      department,
      course,
    });

    alert(`Data saved:\nName: ${firstName} ${lastName}\nEmail: ${email}\nRole: ${role}\nDepartment: ${department}\nCourse: ${course}`);

    navigate('/dep-course/onlyid'); // ✅ navigation works now
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white pt-0 relative box-border">
      <div 
        className="absolute top-[200px] left-1/2 -translate-x-1/2 text-[28px] font-extrabold text-[#111]"
        style={{ letterSpacing: '0.6px', fontFamily: 'Segoe UI, Arial, sans-serif' }}
      >
        CREATE ACCOUNT
      </div>

      <button 
        aria-label="Go back" 
        onClick={handleBack} 
        className="absolute  top-[92px] left-[14%] text-black"
      >
        <span className="text-[50px]">←</span>
      </button>

      <div 
        className="w-[640px] max-w-[92vw] bg-[#201B51] rounded-2xl px-12 py-10 text-white"
        style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
      >
        <form onSubmit={handleNext} className="w-full">
          {/* Department Selection */}
          <div className="flex flex-col">
            <label className="text-sm italic text-[#d7d8ff] mb-2.5">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-[99%] h-12 rounded-[14px] border-none outline-none px-4 text-base bg-white text-[#111]"
              required
            >
              <option value="">-- Select Department --</option>
              <option value="Engineering">Engineering</option>
              <option value="Computer Studies">Computer Studies</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div className="h-[18px]" />

          {/* Course Selection */}
          <div className="flex flex-col">
            <label className="text-sm italic text-[#d7d8ff] mb-2.5">Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-[99%] h-12 rounded-[14px] border-none outline-none px-4 text-base bg-white text-[#111]"
              required
            >
              <option value="">-- Select Course --</option>
              <option value="BSIT">BS in Information Technology</option>
              <option value="BSCS">BS in Computer Science</option>
              <option value="BSECE">BS in Electronics Engineering</option>
              <option value="BSBA">BS in Business Administration</option>
              <option value="BSEd">Bachelor of Secondary Education</option>
            </select>
          </div>

          <div className="flex justify-end mt-7">
            <button 
              type="submit" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-[22px] border-none bg-black text-white font-bold cursor-pointer"
              style={{ letterSpacing: '0.4px', boxShadow: '0 6px 16px rgba(16,185,129,0.35)' }}
            >
              <span className="mr-3 font-bold">NEXT</span>
              <span className="text-lg">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepCourse;
