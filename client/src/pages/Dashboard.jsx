import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaRecycle, FaLeaf, FaTrash, FaChartLine } from 'react-icons/fa'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const { currentUser } = useAuth()
  const [stats, setStats] = useState({
    totalItems: 0,
    recycledItems: 0,
    compostItems: 0,
    wasteItems: 0
  })
  const [tips, setTips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be actual API calls
        // For demo purposes, we're using mock data
        
        // Mock stats data
        setStats({
          totalItems: 42,
          recycledItems: 28,
          compostItems: 10,
          wasteItems: 4
        })
        
        // Mock tips data
        setTips([
          {
            id: 1,
            title: "Plastic Recycling Tip",
            content: "Rinse plastic containers before recycling to prevent contamination.",
            category: "recycling"
          },
          {
            id: 2,
            title: "Food Waste Reduction",
            content: "Plan your meals to reduce food waste and save money.",
            category: "compost"
          },
          {
            id: 3,
            title: "E-Waste Disposal",
            content: "Never throw electronics in regular trash. Find a local e-waste center.",
            category: "waste"
          }
        ])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>
  }

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome back, {currentUser?.name || 'User'}!</h1>
        <p>Here's your waste management overview</p>
      </header>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaChartLine />
          </div>
          <div className="stat-info">
            <h3>Total Items</h3>
            <p className="stat-value">{stats.totalItems}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon recycled">
            <FaRecycle />
          </div>
          <div className="stat-info">
            <h3>Recycled</h3>
            <p className="stat-value">{stats.recycledItems}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon compost">
            <FaLeaf />
          </div>
          <div className="stat-info">
            <h3>Compost</h3>
            <p className="stat-value">{stats.compostItems}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon waste">
            <FaTrash />
          </div>
          <div className="stat-info">
            <h3>Waste</h3>
            <p className="stat-value">{stats.wasteItems}</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <Link to="/scan" className="action-card">
          <div className="action-icon">
            <FaRecycle />
          </div>
          <div className="action-info">
            <h3>Scan Waste Item</h3>
            <p>Identify how to properly dispose of an item</p>
          </div>
        </Link>
        
        <Link to="/locations" className="action-card">
          <div className="action-icon">
            <FaLeaf />
          </div>
          <div className="action-info">
            <h3>Find Disposal Locations</h3>
            <p>Locate nearby recycling and waste centers</p>
          </div>
        </Link>
      </div>
      
      <div className="eco-tips">
        <h2>Eco-Friendly Tips</h2>
        <div className="tips-container">
          {tips.map(tip => (
            <div key={tip.id} className={`tip-card ${tip.category}`}>
              <h3>{tip.title}</h3>
              <p>{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Dashboard
