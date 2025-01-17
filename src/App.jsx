import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Edit from './pages/Edit/Edit';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div className="app">
            <ToastContainer />
            <Navbar />
            <hr />
            <h1 className="page-title">Welcome to the Admin Portal</h1>
            <div className="app-content">
                <Sidebar />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route
                        path="/add"
                        element={
                            <ProtectedRoute>
                                <Add />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/list"
                        element={
                            <ProtectedRoute>
                                <List />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/edit"
                        element={
                            <ProtectedRoute>
                                <Edit />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;
