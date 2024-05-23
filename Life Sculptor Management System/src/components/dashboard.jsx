import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate(); // Corrected typo
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if (result.data.Status){
        navigate('/adminlogin');
      }
    })
    .catch(error => {
      // Handle errors properly
      console.error('Logout failed:', error);
    });
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Life Sculptor
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard" end>Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/requests">Requests</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout" onClick={handleLogout}>Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="row">
        <div className="col-md-3 col-lg-2 bg-dark text-white sidebar">
          <div className="sidebar-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link" end>
                  <i className="bi bi-speedometer2"></i> Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard/manage-volunteers" className="nav-link">
                  <i className="bi bi-people"></i> Manage Volunteers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard/manage-students" className="nav-link">
                  <i className="bi bi-person"></i> Manage Students
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard/requests" className="nav-link">
                  <i className="bi bi-file-earmark-text"></i> Requests
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard/category" className="nav-link">
                  <i className="bi bi-tags"></i> Category
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard/profile" className="nav-link">
                  <i className="bi bi-person-circle"></i> Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9 col-lg-10 ms-sm-auto px-md-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
