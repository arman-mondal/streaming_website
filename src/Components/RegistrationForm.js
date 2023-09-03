import React, { useState } from 'react';
import Axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user', // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend API for user registration
      const response = await Axios.post('https://api.dcvip.one/api/auth/register', formData);

      if (response.status === 201) {
        // Registration successful, you can redirect the user or display a success message
        console.log('User registered successfully');
      } else {
        // Handle registration failure, show an error message or take appropriate action
        console.error('Registration failed');
      }
    } catch (error) {
      // Handle any network or server errors here
      console.error('Error during registration:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
