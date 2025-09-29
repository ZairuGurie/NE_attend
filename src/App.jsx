import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import FirstnameLastname from './CreateAcc/FirstnameLastname';
import Email from './CreateAcc/Email';
import Dashboard from './Student/Dashboard';
import AttendanceLogs from './Student/AttendanceLogs';
import Notes from './Student/Notes';
import Group from './Student/Group';
import StudentProfile from './Student/StudentProfile';
import InstructorDashboard from './Instructor/Dashboard';
import './App.css';
import DepCourse from './CreateAcc/DepCourse';
import Role from './CreateAcc/Role';
import Only_ID from './CreateAcc/Only_ID';
import ConCode from './CreateAcc/ConCode';
import Confirm from './CreateAcc/Confirm';
import Dashboard2 from './Instructor/Dashboard';
import History from './Instructor/History';
import Group2 from './Instructor/Group';
import Note2 from './Instructor/Notes';
import CreateGroup from './Instructor/CreateGroup';
import GroupSettings from './Instructor/GroupSetting';
import Intructor_Profile from './Instructor/Instructor_Profile';
import ADDashboard from './Admin/ADDashboard';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route: Login page */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instructor-dashboard" element={<Dashboard2 />} />
          <Route path="/Note2" element={<Note2 />} />
          <Route path="/Group2" element={<Group2 />} />
          <Route path="/history" element={<History />} />
          <Route path="/create-account" element={<FirstnameLastname />} />
          <Route path="/create-account/email" element={<Email />} />
          <Route path="/email/role" element={<Role />} />
          <Route path="/concode/confirm" element={<Confirm />} />
          <Route path="/onlyid/concode" element={<ConCode />} />
          <Route path="/dep-course/onlyid" element={<Only_ID />} />
          <Route path="/role/dep-course" element={<DepCourse />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance-logs" element={<AttendanceLogs />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/group" element={<Group />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/group-settings/:id" element={<GroupSettings />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/I_Profile" element={<Intructor_Profile />} />
          <Route path="/adminD" element={<ADDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
