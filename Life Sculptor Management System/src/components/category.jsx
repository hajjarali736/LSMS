import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './category.css';
import axios from "axios";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
        setError("An error occurred while fetching categories.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = category.slice(indexOfFirstRole, indexOfLastRole);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Category List</h3>
        <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
      </div>
      <input
        type="text"
        placeholder="Search Category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mt-3"
      />
      <div className='mt-3'>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {currentRoles.filter((c) => {
                if (searchTerm === "") {
                  return c;
                } else if (c.category.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return c;
                }
              }).map((c, index) => (
                <tr key={index}>
                  <td>{c.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <nav className='pagination mt-3'>
          <ul className='pagination'>
            {category.length > rolesPerPage && (
              Array.from({ length: Math.ceil(category.length / rolesPerPage) }).map((_, index) => (
                <li key={index} className={index + 1 === currentPage ? 'page-item active' : 'page-item'}>
                  <button onClick={() => paginate(index + 1)} className='page-link'>
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

export default Category;
