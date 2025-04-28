import React from 'react'
import { useAuth } from '../context/AuthContext'
import { FaUserCircle, FaBell } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const { currentUser, logout } = useAuth()

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1>EcoSort</h1>
      </div>
      <div className="navbar-right">
        <div className="notification-icon">
          <FaBell />
          <span className="notification-badge">2</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">
            <FaUserCircle />
          </div>
          <div className="user-info">
            <p className="user-name">{currentUser?.name || 'User'}</p>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
