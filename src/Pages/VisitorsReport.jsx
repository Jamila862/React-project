import React, { useEffect, useState } from 'react';
import './VisitorsReport.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';

const VisitorsReport = () => {
  const [visitorsReports, setVisitorsReports] = useState([]);
  const [newVisitor, setNewVisitor] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    room: '',
    date: new Date(),
    timeSignIn: '12:00',
    timeSignOut: '13:00'
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false); 
  const [editVisitorId, setEditVisitorId] = useState(null); 
  
  const fetchVisitorsReport = async () => {
    try {
      const response = await axios.get('http://localhost:8080/all/visitorsReport');
      setVisitorsReports(response.data);
    } catch (error) {
      console.error('Error fetching visitors report', error);
    }
  };

  useEffect(() => {
    fetchVisitorsReport();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/Delete/visitorsReport${id}`);
      fetchVisitorsReport(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting visitors report', error);
    }
  };

  
  const activateEditMode = (visitorId) => {
    const visitorToEdit = visitorsReports.find(visitor => visitor.id === visitorId);
    if (visitorToEdit) {
      setEditMode(true);
      setEditVisitorId(visitorId);
      setNewVisitor({
        firstName: visitorToEdit.firstName,
        lastName: visitorToEdit.lastName,
        phoneNumber: visitorToEdit.phoneNumber,
        email: visitorToEdit.email,
        address: visitorToEdit.address,
        room: visitorToEdit.room,
        date: new Date(visitorToEdit.date),
        timeSignIn: visitorToEdit.timeSignIn,
        timeSignOut: visitorToEdit.timeSignOut
      });
      setShowModal(true); 
    }
  };

  
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/Update/VisitorsReport/${editVisitorId}`, newVisitor);
      const updatedVisitor = response.data;
      const updatedList = visitorsReports.map(visitor => {
        if (visitor.id === updatedVisitor.id) {
          return updatedVisitor;
        }
        return visitor;
      });
      setVisitorsReports(updatedList);
      setEditMode(false);
      setShowModal(false);
      setEditVisitorId(null);
      setNewVisitor({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        room: '',
        date: new Date(),
        timeSignIn: '12:00',
        timeSignOut: '13:00'
      });
    } catch (error) {
      console.error('Error updating visitor report', error);
    }
  };

  
  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8080/add/visitorsReport', newVisitor);
      setVisitorsReports([...visitorsReports, response.data]); // Add new visitor report to the list
      setNewVisitor({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        room: '',
        date: new Date(),
        timeSignIn: '12:00',
        timeSignOut: '13:00'
      }); 
      setShowModal(false); 
    } catch (error) {
      console.error('Error adding visitors report', error);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVisitor(prevVisitor => ({
      ...prevVisitor,
      [name]: value
    }));
  };

  
  const handleDateChange = (date) => {
    setNewVisitor(prevVisitor => ({
      ...prevVisitor,
      date
    }));
  };

  
  const handleTimeSignInChange = (timeSignIn) => {
    setNewVisitor(prevVisitor => ({
      ...prevVisitor,
      timeSignIn
    }));
  };

  
  const handleTimeSignOutChange = (timeSignOut) => {
    setNewVisitor(prevVisitor => ({
      ...prevVisitor,
      timeSignOut
    }));
  };

  return (
    <div className="VisitorsReport">
      <h1>Visitors Report</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Address</th>
            <th>Room</th>
            <th>Date</th>
            <th>Time in</th>
            <th>Time out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitorsReports.map((visitor) => (
            <tr key={visitor.id}>
              <td>{visitor.firstName}</td>
              <td>{visitor.lastName}</td>
              <td>{visitor.phoneNumber}</td>
              <td>{visitor.email}</td>
              <td>{visitor.address}</td>
              <td>{visitor.room}</td>
              <td>{visitor.date}</td>
              <td>{visitor.timeSignIn}</td>
              <td>{visitor.timeSignOut}</td>
              <td>
                <button onClick={() => activateEditMode(visitor.id)}>Update</button>
                <button onClick={() => handleDelete(visitor.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add button to toggle modal */}
      <button onClick={() => {
        setShowModal(true);
        setEditMode(false); // Set to false to add new visitor
      }}>Add</button>

      {/* Modal for adding or editing a visitor report */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => {
              setShowModal(false);
              setEditMode(false);
              setEditVisitorId(null);
              setNewVisitor({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                address: '',
                room: '',
                date: new Date(),
                timeSignIn: '12:00',
                timeSignOut: '13:00'
              });
            }}>&times;</span>
            <h2>{editMode ? 'Edit Visitor Report' : 'Add New Visitor Report'}</h2>
            <form>
              <input type="text" name="firstName" value={newVisitor.firstName} onChange={handleInputChange} placeholder="First Name" required />
              <input type="text" name="lastName" value={newVisitor.lastName} onChange={handleInputChange} placeholder="Last Name" required />
              <input type="text" name="phoneNumber" value={newVisitor.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" required />
              <input type="text" name="email" value={newVisitor.email} onChange={handleInputChange} placeholder="Email Address" required />
              <input type="text" name="address" value={newVisitor.address} onChange={handleInputChange} placeholder="Address" required />
              <input type="text" name="room" value={newVisitor.room} onChange={handleInputChange} placeholder="Room" required />
              <DatePicker
                selected={newVisitor.date}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <TimePicker
                onChange={handleTimeSignInChange}
                value={newVisitor.timeSignIn}
              />
              <TimePicker
                onChange={handleTimeSignOutChange}
                value={newVisitor.timeSignOut}
              />
              <button type="button" onClick={editMode ? handleUpdate : handleAdd}>{editMode ? 'Update' : 'Add'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorsReport;
