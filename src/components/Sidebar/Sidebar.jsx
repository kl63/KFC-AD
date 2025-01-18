import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import Logout from '../Logout/Logout'; // Import the Logout component

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink to="/add" className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to="/list" className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to="/edit" className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Edit Items</p>
                </NavLink>
                <NavLink to="/orders" className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Orders</p>
                </NavLink>
                <NavLink to="/UserList" className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>List Users</p>
                </NavLink>
                
                {/* Add Logout Option */}
                <div className="sidebar-option">
                    <img src={assets.logout_icon} alt="" />
                    <Logout />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
