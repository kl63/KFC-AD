import React, { useEffect, useState } from 'react';
import './UserList.css';
import { url } from '../../assets/assets'; // Backend URL
import axios from 'axios';
import { toast } from 'react-toastify';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [roles, setRoles] = useState(['All', 'User', 'Admin']);
  const [filteredRole, setFilteredRole] = useState('All');

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/list`);
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error('Error fetching users list');
      }
    } catch (error) {
      toast.error('Error fetching users list');
    }
  };

  // Fetch admins from the backend
  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/list`);
      if (response.data.success) {
        setAdmins(response.data.data);
      } else {
        toast.error('Error fetching admins list');
      }
    } catch (error) {
      toast.error('Error fetching admins list');
    }
  };

  // Function to remove user or admin from backend
  const removeUserOrAdmin = async (id, role) => {
    try {
      if (!id) {
        toast.error('ID is undefined');
        return;
      }

      let response;
      if (role === 'Admin') {
        response = await axios.delete(`${url}/api/admin/remove/${id}`);
      } else {
        response = await axios.delete(`${url}/api/user/remove/${id}`);
      }

      if (response.data.success) {
        toast.success(`${role} removed successfully`);
        // Update local state after removal
        if (role === 'Admin') {
          setAdmins((prevAdmins) => prevAdmins.filter(admin => admin._id !== id));
        } else {
          setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
        }
      } else {
        toast.error(`Failed to remove ${role}`);
      }
    } catch (error) {
      toast.error(`Error removing ${role}`);
    }
  };

  // Confirm removal and call the function to remove the user/admin
  const confirmAndRemove = (id, role) => {
    console.log("Attempting to remove ID:", id); // Log the ID to debug
    if (window.confirm(`Are you sure you want to remove this ${role}?`)) {
      removeUserOrAdmin(id, role);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAdmins();
  }, []);

  // Combine users and admins into one list
  const combinedList = [
    ...users.map(user => ({ ...user, role: 'User' })),
    ...admins.map(admin => ({ ...admin, role: 'Admin' })),
  ];

  // Filter the list based on selected role
  const filteredList =
    filteredRole === 'All'
      ? combinedList
      : combinedList.filter(item => item.role === filteredRole);

  return (
    <div className='list add flex-col'>
      <h2>All Users and Admins List</h2>
      <hr />

      {/* Filter Dropdown */}
      <div className="filter-container">
        <p>Filters:</p>
        <label htmlFor="role-filter">Filter by Role:</label>
        <select
          id="role-filter"
          value={filteredRole}
          onChange={(e) => setFilteredRole(e.target.value)}
        >
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role === 'User' ? 'Users' : role === 'Admin' ? 'Admins' : 'All'}
            </option>
          ))}
        </select>
      </div>

      <div className='list-table'>
        <div className="list-table-format title">
          <b>Name</b>
          <b>Email</b>
          <b>Role</b>
          <b>Actions</b>
        </div>
        {filteredList.map((item, index) => (
          <div key={index} className='list-table-format'>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.role}</p>
            <button onClick={() => {
              console.log("Item _id:", item._id);  // Log the _id to verify
              confirmAndRemove(item._id, item.role);  // Pass _id if that's the property
            }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
