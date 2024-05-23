import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../src/components/dashboard';
import ManageVolunteers from '../src/components/volunteers';
import ManageStudents from '../src/components/students';
import Profile from '../src/components/profile';
import Requests from '../src/components/requests';
import Home from '../src/components/home';
import Category from '../src/components/category';
import Add_category from './components/add_category';
import Add_Student from './components/add_student';
import Add_Volunteer from './components/add_volunteer';
import EditStudent from './components/editstudent';
import AdminLogin from './components/login'; // Import your AdminLogin component
import Login from './components/login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    // Perform your authentication logic here
    // For example, setLoggedIn(true) if authentication is successful
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard/*" element={loggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="manage-volunteers" element={<ManageVolunteers />} />
        <Route path="manage-students" element={<ManageStudents />} />
        <Route path="profile" element={<Profile />} />
        <Route path="requests" element={<Requests />} />
        <Route path="category" element={<Category />} />
        <Route path="add_category" element={<Add_category />} />
        <Route path="add_student" element={<Add_Student />} />
        <Route path="add_volunteer" element={<Add_Volunteer />} />
        <Route path="edit_student/:id" element={<EditStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
