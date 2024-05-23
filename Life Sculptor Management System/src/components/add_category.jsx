import React, { useState } from 'react';
import './add_category.css'; // Import your CSS file for styling if you have one
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_category', { category })
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/category');
        } else {
          // Display a more meaningful error message
          alert(result.data.Error || "Failed to add category. Please try again.");
        }
      })
      .catch(err => {
        // Log the error for debugging purposes
        console.error("Error adding category:", err);
        // Display a generic error message to the user
        alert("An error occurred while adding the category. Please try again later.");
      });
  };

  return (
    <div className="add-category-container">
      <div className="add-category-form">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              autoComplete="off"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
