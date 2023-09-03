// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';
import AdminDashboard from './Dashboards/AdminDashboard';
import SubAdminDashboard from './Dashboards/SubAdminDashboard';
import UserDashboard from './Dashboards/UserDashboard';
import VideoPlayer from './Components/VideoPlayer.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/video" element={<VideoPlayer/>} />
        <Route  path="/login" element={<LoginForm/>} />
        <Route  path="/dashboard" element={<Dashboard/>} />
        <Route  path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route  path="/subadmin-dashboard" element={<SubAdminDashboard/>} />
        <Route  path="/user-dashboard" element={<UserDashboard/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
