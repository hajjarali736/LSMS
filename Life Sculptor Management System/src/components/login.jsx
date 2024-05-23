import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth/adminslogin', values)
            .then(result => {
                if (result.data.loginStatus) {
                    navigate('/dashboard');
                } else {
                    setError(result.data.error); // Ensure this matches the backend error property
                }
            })
            .catch(err => {
                console.error('Error:', err);
                setError('An unexpected error occurred. Please try again later.');
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                {error && <div className="text-danger mb-2">{error}</div>}
                <h2>Login Page to Life Sculptor Management System Community</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email"><strong>Enter your email address:</strong></label>
                        <input
                            type="email"
                            name='email'
                            placeholder='Enter your email'
                            autoComplete='off'
                            className='form-control'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="password"><strong>Enter your Password</strong></label>
                        <input
                            type="password"
                            name='password'
                            placeholder='Enter your Password'
                            autoComplete='off'
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Log In</button>
                    <div className='mb-1'>
                        <input type="checkbox" name="tick" id="tick" className='me-2' />
                        <label htmlFor="tick"><strong>I agree to the terms and conditions</strong></label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
