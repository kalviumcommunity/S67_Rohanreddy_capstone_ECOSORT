import React, { useState, useEffect } from 'react'
import { FaRecycle, FaLeaf, FaTrash, FaCalendarAlt, FaFilter, FaDownload } from 'react-icons/fa'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import './WasteHistory.css'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const WasteHistory = () => {
  const [historyItems, setHistoryItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to get history data
    // For demo purposes, we're using mock data
    const mockHistory = [
      {
        id: 1,
        name: "Plastic Bottle",
        category: "recycle",
        date: "2023-06-15T10:30:00Z",
        points: 5
      },
      {
        id: 2,
        name: "Banana Peel",
        category: "compost",
        date: "2023-06-14T09:15:00Z",
        points: 3
      },
      {
        id: 3,
        name: "Cardboard Box",
        category: "recycle",
        date: "2023-06-13T14:45:00Z",
        points: 5
      },
      {
        id: 4,
        name: "Styrofoam Cup",
        category: "waste",
        date: "2023-06-12T11:20:00Z",
        points: 1
      },
      {
        id: 5,
        name: "Coffee Grounds",
        category: "compost",
        date: "2023-06-11T08:30:00Z",
        points: 3
      },
      {
        id: 6,
        name: "Glass Jar",
        category: "recycle",
        date: "2023-06-10T16:10:00Z",
        points: 5
      },
      {
        id: 7,
        name: "Apple Core",
        category: "compost",
        date: "2023-06-09T12:45:00Z",
        points: 3
      },
      {
        id: 8,
        name: "Plastic Bag",
        category: "waste",
        date: "2023-06-08T10:00:00Z",
        points: 1
      }
    ]
    
    setHistoryItems(mockHistory)
    setFilteredItems(mockHistory)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = [...historyItems]
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }
    
    // Filter by time period
    if (selectedPeriod !== 'all') {
      const now = new Date()
      let cutoffDate = new Date()
      
      switch(selectedPeriod) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7)
          break
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1)
          break
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1)
          break
        default:
          break
      }
      
      filtered = filtered.filter(item => new Date(item.date) >= cutoffDate)
    }
    
    setFilteredItems(filtered)
  }, [selectedCategory, selectedPeriod, historyItems])

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'recycle':
        return <FaRecycle className="history-icon recycle" />
      case 'compost':
        return <FaLeaf className="history-icon compost" />
      case 'waste':
        return <FaTrash className="history-icon waste" />
      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Prepare data for pie chart
  const pieChartData = {
    labels: ['Recycled', 'Composted', 'Waste'],
    datasets: [
      {
        data: [
          historyItems.filter(item => item.category === 'recycle').length,
          historyItems.filter(item => item.category === 'compost').length,
          historyItems.filter(item => item.category === 'waste').length
        ],
        backgroundColor: [
          'rgba(76, 175, 80, 0.7)',
          'rgba(139, 195, 74, 0.7)',
          'rgba(211, 47, 47, 0.7)'
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(139, 195, 74, 1)',
          'rgba(211, 47, 47, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  // Prepare data for bar chart (points by category)
  const barChartData = {
    labels: ['Recycled', 'Composted', 'Waste'],
    datasets: [
      {
        label: 'Eco Points',
        data: [
          historyItems.filter(item => item.category === 'recycle').reduce((sum, item) => sum + item.points, 0),
          historyItems.filter(item => item.category === 'compost').reduce((sum, item) => sum + item.points, 0),
          historyItems.filter(item => item.category === 'waste').reduce((sum, item) => sum + item.points, 0)
        ],
        backgroundColor: [
          'rgba(76, 175, 80, 0.7)',
          'rgba(139, 195, 74, 0.7)',
          'rgba(211, 47, 47, 0.7)'
        ]
      }
    ]
  }

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Eco Points by Category'
      }
    }
  }

  if (loading) {
    return <div className="loading">Loading history data...</div>
  }

  return (
    <section className="waste-history">
      <header className="history-header">
        <h1>Waste Disposal History</h1>
        <p>Track your waste disposal habits and eco-friendly impact</p>
      </header>
      
      <div className="history-filters">
        <div className="filter-group">
          <label><FaFilter /> Filter by Category:</label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="recycle">Recycled</option>
            <option value="compost">Composted</option>
            <option value="waste">Waste</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label><FaCalendarAlt /> Time Period:</label>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        
        <button className="export-btn">
          <FaDownload /> Export Data
        </button>
      </div>
      
      <div className="stats-charts">
        <div className="chart-container">
          <h3>Waste Distribution</h3>
          <div className="pie-chart">
            <Pie data={pieChartData} />
          </div>
        </div>
        
        <div className="chart-container">
          <h3>Eco Points</h3>
          <div className="bar-chart">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>
      
      <div className="history-list">
        <h2>Disposal History</h2>
        
        {filteredItems.length === 0 ? (
          <div className="no-items">
            <p>No items found for the selected filters.</p>
          </div>
        ) : (
          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Eco Points</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id}>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.name}</td>
                    <td>
                      <div className="category-cell">
                        {getCategoryIcon(item.category)}
                        <span className={`category-label ${item.category}`}>
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="points-cell">+{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default WasteHistory
