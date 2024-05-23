import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [student, setStudent] = useState({
    firstname: '',
    lastname: '',
    emailaddress: '',
    school: '',
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
    setStudent(prevStudent => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_student', student)
      .then(result => console.log(result.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="add-category-container">
      <div className="add-category-form">
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="off"
              placeholder="Enter First Name"
              value={student.firstName}
              onChange={(e) => setStudent({...student, firstname: e.target.value})}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="off"
              placeholder="Enter Last Name"
              value={student.lastName}
              onChange={(e) => setStudent({...student, lastname: e.target.value})}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="emailAddress"
              autoComplete="off"
              placeholder="Enter Email Address"
              value={student.emailAddress}
              onChange={(e) => setStudent({...student, emailaddress: e.target.value})}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="school">School/University</label>
            <input
              type="text"
              id="school"
              name="school"
              autoComplete="off"
              placeholder="Enter School/University"
              value={student.school}
              onChange={(e) => setStudent({...student, school: e.target.value})}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              autoComplete="off"
              placeholder="Enter Phone Number"
              value={student.phoneNumber}
              onChange={(e) => setStudent({...student, phonenumber: e.target.value})}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
