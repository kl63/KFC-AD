import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to="/" className="navbar-logo"><h1>Kevin's Fried Creations</h1></Link>
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
