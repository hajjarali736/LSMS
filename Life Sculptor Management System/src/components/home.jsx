import React, { useEffect, useState } from 'react';
import './home.css'; // Make sure to import your CSS file
import axios from 'axios';

const Home = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdminRecords();
  }, []);

  const fetchAdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_record')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(error => {
        console.error('Error fetching admin records:', error);
        // Display error message to the user
        alert('Error fetching admin records. Please try again later.');
      });
  };
  
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-card admin-card">
          <h4 className="card-title">Admin</h4>
          <div className="card-total">
            <h5>Total: <span className="total-number">5</span></h5>
          </div>
        </div>

        <div className="home-card students-card">
          <h4 className="card-title">Students</h4>
          <div className="card-total">
            <h5>Total: <span className="total-number">120</span></h5>
          </div>
        </div>

        <div className="home-card volunteers-card">
          <h4 className="card-title">Volunteers</h4>
          <div className="card-total">
            <h5>Total: <span className="total-number">45</span></h5>
          </div>
        </div>

        <div className="home-card requests-card">
          <h4 className="card-title">Requests</h4>
          <div className="card-total">
            <h5>Total: <span className="total-number">30</span></h5>
          </div>
        </div>

        <div className="home-card certificates-card">
          <h4 className="card-title">Certificates Issued</h4>
          <div className="card-total">
            <h5>Total: <span className="total-number">15</span></h5>
          </div>
        </div>

        <div className="home-card complaints-card">
          <h4 className="card-title">Complaints</h4>
          <div className="card-total">
            <h5>Total: <span className="total-number">3</span></h5>
          </div>
        </div>
      </div>

      <div className='table-container mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td>{admin.email}</td>
                {/* Add action buttons */}
                <td className="action-buttons">
                  <button className="action-button delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
