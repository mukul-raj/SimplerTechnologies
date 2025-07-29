import { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa';
import './SignUpForm.css';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Full name required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!/(?=.*[A-Z])(?=.*\d).{6,}/.test(formData.password))
            newErrors.password = 'Password must have 6+ characters, 1 uppercase, and 1 number';
        if (formData.confirmPassword !== formData.password)
        newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
        setSubmitted(true);
        }
    };

    return (
        <div className="signup-container">
        {!submitted ? (
            <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            {/* Full Name */}
            <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                // style={{ color: 'black' }}
                />
            </div>
            <p className="error">{errors.name}</p>

            {/* Email */}
            <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                style={{ color: 'black' }}
                />
            </div>
            <p className="error">{errors.email}</p>

            {/* Password */}
            <div className="input-wrapper password-wrapper">
                <FaLock className="input-icon" />
                <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                style={{ color: 'black' }}
                />
                <span className="toggle-password" onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
            <p className="error">{errors.password}</p>

            {/* Confirm Password */}
            <div className="input-wrapper password-wrapper">
                <FaLock className="input-icon" />
                <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                style={{ color: 'black' }}
                />
                <span className="toggle-password" onClick={() => setShowConfirmPassword(prev => !prev)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
            <p className="error">{errors.confirmPassword}</p>

            {/* Submit Button */}
            <button type="submit">Register</button>
            </form>
        ) : (
            <div className="welcome-box">
            <h2>🎉 Welcome, {formData.name}!</h2>
            <p>Your email is <strong>{formData.email}</strong></p>
            </div>
        )}
        </div>
    );
    }
