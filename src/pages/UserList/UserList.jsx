import React, { useEffect, useState } from 'react';
import './UserList.css';
import { url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [roles, setRoles] = useState(['All', 'User', 'Admin']);
  const [filteredRole, setFilteredRole] = useState('All');

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




  useEffect(() => {
    fetchUsers();
    fetchAdmins();
  }, []);

  const combinedList = [
    ...users.map(user => ({ ...user, role: 'User' })),
    ...admins.map(admin => ({ ...admin, role: 'Admin' })),
  ];

  const filteredList =
    filteredRole === 'All'
      ? combinedList
      : combinedList.filter(item => item.role === filteredRole);

  const confirmAndRemove = (id, role) => {
    if (window.confirm(`Are you sure you want to remove this ${role}?`)) {
      removeUserOrAdmin(id, role);
    }
  };

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
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
