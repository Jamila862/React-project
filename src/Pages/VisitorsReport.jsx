import React, { useState, useEffect } from 'react';
import './VisitorsReport.css';
import axios from 'axios';

const VisitorsReport = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/all/visitorsReport'); // Replace with your backend API URL
        const data = response.data;
        setVisitors(data);
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async () => {
    const firstName = prompt('Enter first name:');
    const lastName = prompt('Enter last name:');
    const phoneNumber = prompt('Enter phone number:');
    const email = prompt('Enter email:');
    const address = prompt('Enter address:');
    const room = prompt('Enter room:');
    const date = prompt('Enter date (YYYY-MM-DD):');
    const timeIn = prompt('Enter time in (HH:MM):');
    const timeOut = prompt('Enter time out (HH:MM) or leave blank if still visiting:');

    if (!firstName || !lastName || !phoneNumber || !email || !address || !room || !date || !timeIn) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/add/visitorsReport', {
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        room,
        date,
        timeIn,
        timeOut,
      });

      if (response.data.success) {
        console.log('New visitor added successfully!');
        setVisitors([...visitors, response.data.visitor]); // Add new visitor to state
      } else {
        console.error('Error adding visitor:', response.data.error);
        alert('Error adding visitor. Please try again.');
      }
    } catch (error) {
      console.error('Error adding visitor:', error);
      alert('Error adding visitor. Please try again.');
    }
  };

  const handleDelete = async (Id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this visitor?');

    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/Delete/visitorsReport/${Id}`);

        if (response.data.success) {
          console.log('Visitor deleted successfully!');
          setVisitors(visitors.filter((visitor) => visitor.id !== Id));
        } else {
          console.error('Error deleting visitor:', response.data.error);
          alert('Error deleting visitor. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting visitor:', error);
        alert('Error deleting visitor. Please try again.');
      }
    }
  };

  const handleUpdate = async (Id) => {
    const updatedFirstName = prompt('Enter updated first name (leave blank if unchanged):', visitors.find((visitor) => visitor.id === Id).firstName);
    const updatedLastName = prompt('Enter updated last name (leave blank if unchanged):', visitors.find((visitor) => visitor.id === Id).lastName);
    const updatedPhoneNumber = prompt('Enter updated phone number (leave blank if unchanged):', visitors.find((visitor) => visitor.id === Id).phoneNumber);
    const updatedEmail = prompt('Enter updated email (leave blank if unchanged):', visitors.find((visitor) => visitor.id === Id).email);
    const updatedAddress = prompt('Enter updated address (leave blank if unchanged):', visitors.find((visitor) => visitor.id === Id).address);
    const updatedRoom = prompt('Enter updated room (leave blank if unchanged):', visitors.find((visitor) => visitor.id === Id).room);
    const updatedDate = prompt('Enter updated date (YYYY-MM-DD):', visitors.find((visitor) => visitor.id === Id).date);
    const updatedTimeIn = prompt('Enter updated time in (HH:MM) (leave blank if unchanged):', visitors.find((visitor) => visitor.id === Id).timeIn);
    const updatedTimeOut = prompt('Enter updated time out (HH:MM) or leave blank if unchanged:', visitors.find((visitor) => visitor.id === Id).timeOut);

    const updatedVisitor = {
      firstName: updatedFirstName || visitors.find((visitor) => visitor.id === Id).firstName,
      lastName: updatedLastName || visitors.find((visitor) => visitor.id === Id).lastName,
      phoneNumber: updatedPhoneNumber || visitors.find((visitor) => visitor.id === Id).phoneNumber,
      email: updatedEmail || visitors.find((visitor) => visitor.id === Id).email,
      address: updatedAddress || visitors.find((visitor) => visitor.id === Id).address,
      room: updatedRoom || visitors.find((visitor) => visitor.id === Id).room,
      date: updatedDate || visitors.find((visitor) => visitor.id === Id).date,
      timeIn: updatedTimeIn || visitors.find((visitor) => visitor.id === Id).timeIn,
      timeOut: updatedTimeOut || visitors.find((visitor) => visitor.id === Id).timeOut,
    };

    try {
      const response = await axios.put(`http://localhost:8080/Update/VisitorsReport/${Id}`, updatedVisitor);

      if (response.data.success) {
        console.log('Visitor updated successfully!');
        const updatedVisitors = visitors.map((visitor) => (visitor.id === Id ? updatedVisitor : visitor));
        setVisitors(updatedVisitors);
      } else {
        console.error('Error updating visitor:', response.data.error);
        alert('Error updating visitor. Please try again.');
      }
    } catch (error) {
      console.error('Error updating visitor:', error);
      alert('Error updating visitor. Please try again.');
    }
  };

  return (
    <div className="visitors-report">
      <h1>Visitors Report</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Room</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor.id}>
              <td>{visitor.firstName}</td>
              <td>{visitor.lastName}</td>
              <td>{visitor.phoneNumber}</td>
              <td>{visitor.email}</td>
              <td>{visitor.address}</td>
              <td>{visitor.room}</td>
              <td>{visitor.date}</td>
              <td>{visitor.timeIn}</td>
              <td>{visitor.timeOut}</td>
              <td>
                <button onClick={() => handleUpdate(visitor.id)}>Update</button>
                <button onClick={() => handleDelete(visitor.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default VisitorsReport;
