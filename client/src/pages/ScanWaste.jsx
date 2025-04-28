import React, { useState } from 'react'
import { FaCamera, FaSearch, FaRecycle, FaLeaf, FaTrash } from 'react-icons/fa'
import './ScanWaste.css'

const ScanWaste = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Mock waste database for demo purposes
  const wasteDatabase = [
    { 
      name: 'Plastic Bottle', 
      category: 'recycle', 
      instructions: 'Rinse and remove cap. Place in recycling bin.',
      tips: 'Crush bottles to save space in your recycling bin.'
    },
    { 
      name: 'Banana Peel', 
      category: 'compost', 
      instructions: 'Place in compost bin or home compost pile.',
      tips: 'Banana peels are excellent for garden compost and add potassium to soil.'
    },
    { 
      name: 'Styrofoam Cup', 
      category: 'waste', 
      instructions: 'Place in general waste bin.',
      tips: 'Consider using reusable cups instead of styrofoam to reduce waste.'
    },
    { 
      name: 'Cardboard Box', 
      category: 'recycle', 
      instructions: 'Flatten and place in recycling bin.',
      tips: 'Remove any tape or labels before recycling.'
    },
    { 
      name: 'Coffee Grounds', 
      category: 'compost', 
      instructions: 'Add to compost bin or directly to garden soil.',
      tips: 'Coffee grounds can help repel pests in your garden.'
    }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSearchResult(null)
    
    // Simulate API call delay
    setTimeout(() => {
      if (!searchTerm.trim()) {
        setError('Please enter a waste item to search')
        setLoading(false)
        return
      }
      
      const result = wasteDatabase.find(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      if (result) {
        setSearchResult(result)
      } else {
        setError('Item not found in our database. Please try another item or contact support.')
      }
      
      setLoading(false)
    }, 1000)
  }

  const handleCameraClick = () => {
    // In a real app, this would open the camera
    alert('Camera functionality would open here in a real app')
  }

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'recycle':
        return <FaRecycle className="result-icon recycle" />
      case 'compost':
        return <FaLeaf className="result-icon compost" />
      case 'waste':
        return <FaTrash className="result-icon waste" />
      default:
        return null
    }
  }

  return (
    <section className="scan-waste">
      <header className="scan-header">
        <h1>Scan or Search Waste Item</h1>
        <p>Find out how to properly dispose of your waste items</p>
      </header>
      
      <div className="scan-options">
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <div className="search-input-group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a waste item..."
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </div>
          </form>
          
          <div className="category-filters">
            <button 
              className={`category-btn ${selectedCategory === 'recycle' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('recycle')}
            >
              <FaRecycle /> Recyclable
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'compost' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('compost')}
            >
              <FaLeaf /> Compostable
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'waste' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('waste')}
            >
              <FaTrash /> General Waste
            </button>
          </div>
        </div>
        
        <div className="camera-container">
          <button className="camera-button" onClick={handleCameraClick}>
            <FaCamera />
            <span>Scan Item</span>
          </button>
          <p>Take a photo of your waste item for identification</p>
        </div>
      </div>
      
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Identifying waste item...</p>
        </div>
      )}
      
      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}
      
      {searchResult && (
        <div className="result-container">
          <div className="result-header">
            {getCategoryIcon(searchResult.category)}
            <h2>{searchResult.name}</h2>
          </div>
          
          <div className="result-details">
            <div className="result-category">
              <h3>Category</h3>
              <p className={searchResult.category}>
                {searchResult.category.charAt(0).toUpperCase() + searchResult.category.slice(1)}
              </p>
            </div>
            
            <div className="result-instructions">
              <h3>Disposal Instructions</h3>
              <p>{searchResult.instructions}</p>
            </div>
            
            <div className="result-tips">
              <h3>Eco Tip</h3>
              <p>{searchResult.tips}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ScanWaste
