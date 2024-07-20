import React, { useEffect, useState } from 'react';
import './Managers.css';
import axios from 'axios';

const Managers = () => {
  const [managersList, setManagersList] = useState([]);
  const [newManager, setNewManager] = useState({
    username: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editManagerId, setEditManagerId] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/managers/all');
      setManagersList(response.data);
    } catch (error) {
      console.error('Error fetching managers', error);
    }
  };

  const handleDelete = async (managerId) => {
    try {
      await axios.delete(`http://localhost:8080/api/managers/delete/${managerId}`);
      fetchManagers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting manager', error);
    }
  };

  const activateEditMode = (managerId) => {
    const managerToEdit = managersList.find(manager => manager.id === managerId);
    if (managerToEdit) {
      setEditMode(true);
      setEditManagerId(managerId);
      setNewManager({
        username: managerToEdit.username
      });
      setShowModal(true);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/managers/update/${editManagerId}`, newManager);
      const updatedManager = response.data;
      const updatedList = managersList.map(manager => {
        if (manager.id === updatedManager.id) {
          return updatedManager;
        }
        return manager;
      });
      setManagersList(updatedList);
      setEditMode(false);
      setShowModal(false);
      setEditManagerId(null);
      resetForm();
    } catch (error) {
      console.error('Error updating manager', error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/managers/add', newManager);
      setManagersList([...managersList, response.data]);
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding manager', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewManager(prevManager => ({
      ...prevManager,
      [name]: value
    }));
  };

  const resetForm = () => {
    setNewManager({
      username: ''
    });
  };

  return (
    <div className="Managers">
      <h1>Managers</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {managersList.map((manager) => (
            <tr key={manager.id}>
              <td>{manager.username}</td>
              <td>
                <button onClick={() => activateEditMode(manager.id)}>Update</button>
                <button onClick={() => handleDelete(manager.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => {
        setShowModal(true);
        setEditMode(false);
        resetForm();
      }}>Add</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => {
              setShowModal(false);
              setEditMode(false);
              setEditManagerId(null);
              resetForm();
            }}>&times;</span>
            <h2>{editMode ? 'Edit Manager' : 'Add New Manager'}</h2>
            <form>
              <input type="text" name="username" value={newManager.username} onChange={handleInputChange} placeholder="Username" required />
              <button type="button" onClick={editMode ? handleUpdate : handleAdd}>{editMode ? 'Update' : 'Add'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Managers;
