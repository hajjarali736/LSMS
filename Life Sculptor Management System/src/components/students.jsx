import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './students.css'; // Import your CSS file for custom styling

const Students = () => {
  const [student, setStudent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(150); // Assuming 10 roles per page

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/auth/student')
      .then(result => {
        if (result.data.Status) {
          setStudent(result.data.Result);
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => {
        console.error("Error fetching students:", err);
        setError("An error occurred while fetching students.");
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
  const currentStudents = student.slice(indexOfFirstRole, indexOfLastRole);

  const filteredStudents = student.filter(student => {
    if (!searchTerm) return true;
    return (
      student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.emailaddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof student.phonenumber === 'string' && student.phonenumber.includes(searchTerm))
    );
  });
  

  return (
    <div>
      <div className='header'>
        <div className='header-content'>
          <h3>Students List</h3>
          <Link to="/dashboard/add_student" className='btn btn-add'>Add Student</Link>
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
                <th>School</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents
                .slice(indexOfFirstRole, indexOfLastRole)
                .map((student, index) => (
                  <tr key={index}>
                    <td>{student.firstname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.emailaddress}</td>
                    <td>{student.school}</td>
                    <td>{student.phonenumber}</td>
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
            {student.length > rolesPerPage && (
              Array.from({ length: Math.ceil(filteredStudents.length / rolesPerPage) }).map((_, index) => (
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

export default Students;
