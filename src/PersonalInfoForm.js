import React, { useState } from 'react';
import axios from 'axios';

function PersonalInfoForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5000/submit-form', formData);
        setSubmitMessage(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        console.error('Error submitting form', error);
      }
    }
  };

  return (
    <div>
      <h2>Personal Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
        </div>
        
        <div>
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
        </div>
        
        <button type="submit">Submit</button>
      </form>
      {submitMessage && <p style={{ color: 'green' }}>{submitMessage}</p>}
    </div>
  );
}

export default PersonalInfoForm;
