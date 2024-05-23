import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './students.css'; // Import your CSS file for custom styling

const Volunteers = () => {
  const [volunteer, setVolunteer] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(150); // Assuming 10 roles per page

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/auth/volunteer')
      .then(result => {
        if (result.data.Status) {
          setVolunteer(result.data.Result);
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => {
        console.error("Error fetching volunteers:", err);
        setError("An error occurred while fetching volunteers.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentVolunteers = volunteer.slice(indexOfFirstRole, indexOfLastRole);

  const filteredVolunteers = volunteer.filter(volunteer => {
    if (!searchTerm) return true;
    return (
      volunteer.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.emailaddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof volunteer.phonenumber === 'string' && volunteer.phonenumber.includes(searchTerm))
    );
  });
  

  return (
    <div>
      <div className='header'>
        <div className='header-content'>
          <h3>Volunteers List</h3>
          <Link to="/dashboard/add_volunteer" className='btn btn-add'>Add Volunteer</Link>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control search-input"
      />
      <div className='content'>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Volunteering Position</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVolunteers
                .slice(indexOfFirstRole, indexOfLastRole)
                .map((volunteer, index) => (
                  <tr key={index}>
                    <td>{volunteer.firstname}</td>
                    <td>{volunteer.lastname}</td>
                    <td>{volunteer.emailaddress}</td>
                    <td>{volunteer.volunteering}</td>
                    <td>{volunteer.phonenumber}</td>
                    <td>
                      <button className="btn btn-edit">Edit</button>
                      <button className="btn btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <nav className='pagination'>
          <ul className='pagination-list'>
            {volunteer.length > rolesPerPage && (
              Array.from({ length: Math.ceil(filteredVolunteers.length / rolesPerPage) }).map((_, index) => (
                <li key={index} className={index + 1 === currentPage ? 'pagination-item active' : 'pagination-item'}>
                  <button onClick={() => paginate(index + 1)} className='pagination-link'>
                    {index + 1}
                  </button>
                </li>
              ))
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Volunteers;
