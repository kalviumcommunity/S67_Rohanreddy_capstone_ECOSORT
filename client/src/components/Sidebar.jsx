import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaQrcode, FaMapMarkerAlt, FaHistory, FaUser } from 'react-icons/fa'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="logo">
        <img src="/logo.svg" alt="EcoSort Logo" />
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/scan" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaQrcode />
            <span>Scan Waste</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/locations" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaMapMarkerAlt />
            <span>Locations</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaHistory />
            <span>History</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaUser />
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>
      <div className="sidebar-footer">
        <p>© 2023 EcoSort</p>
      </div>
    </nav>
  )
}

export default Sidebar
