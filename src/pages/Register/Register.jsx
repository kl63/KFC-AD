import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:10000/api/admin/register', {
                name,
                email,
                password,
            });
            if (res.data.success) {
                toast.success('Admin registered successfully! Please log in.');
                navigate('/login'); // Redirect to login after successful registration
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('An error occurred during registration.');
        }
    };

    return (
        <div className="register-container">
            <h1>Admin Registration</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
