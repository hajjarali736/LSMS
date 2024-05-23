import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddVolunteer = () => {
  const [volunteer, setVolunteer] = useState({
    firstname: '',
    lastname: '',
    emailaddress: '',
    volunteering: '',
    phonenumber: ''
  });

  // Define state variables for category and loading
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteer(prevVolunteer => ({
      ...prevVolunteer,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_volunteer', volunteer)
      .then(result => console.log(result.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="add-category-container">
      <div className="add-category-form">
        <h2>Add Volunteer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstname"
              autoComplete="off"
              placeholder="Enter First Name"
              value={volunteer.firstname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastname"
              autoComplete="off"
              placeholder="Enter Last Name"
              value={volunteer.lastname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="emailaddress"
              autoComplete="off"
              placeholder="Enter Email Address"
              value={volunteer.emailaddress}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="school">Volunteering Position</label>
            <input
              type="text"
              id="school"
              name="volunteering"
              autoComplete="off"
              placeholder="Enter your Volunteering"
              value={volunteer.volunteering}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phonenumber"
              autoComplete="off"
              placeholder="Enter Phone Number"
              value={volunteer.phonenumber}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">
            Add Volunteer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVolunteer;
