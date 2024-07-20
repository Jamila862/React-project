import React, { useState } from 'react';
import styles from './VisitorsSign.module.css';

const VisitorsSign = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    address: '',
    room: '',
    date: '',
    timeIn: '',
    timeOut: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Sign in form submitted:', formData);
    
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      address: '',
      room: '',
      date: '',
      timeIn: '',
      timeOut: '',
    });
  };

  return (
    <div className={styles.visitorSignForm}>
      <h2>Visitors Sign Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="room">Room:</label>
          <select name="room" id="room" value={formData.room} onChange={handleChange} required>
            <option value="">-- Select Room --</option>
            <option value="room1">Room 1</option>
            <option value="room2">Room 2</option>
            {/* Add more room options as needed */}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date">Date of Sign-In:</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="timeIn">Time of Sign-In:</label>
          <input
            type="time"
            name="timeIn"
            id="timeIn"
            value={formData.timeIn}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="timeOut">Time of Sign-Out:</label>
          <input
            type="time"
            name="timeOut"
            id="timeOut"
            value={formData.timeOut}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Sign In</button>
      </form>
    </div>
  );
};

export default VisitorsSign;
