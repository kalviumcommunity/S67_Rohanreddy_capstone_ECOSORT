import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { FaMapMarkerAlt, FaRecycle, FaLeaf, FaTrash, FaFilter } from 'react-icons/fa'
import './WasteLocations.css'

const WasteLocations = () => {
  const [locations, setLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [selectedType, setSelectedType] = useState('all')
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState([51.505, -0.09]) // Default location (London)

  useEffect(() => {
    // In a real app, this would be an API call to get locations
    // For demo purposes, we're using mock data
    const mockLocations = [
      {
        id: 1,
        name: "City Recycling Center",
        address: "123 Green St, Eco City",
        type: "recycling",
        position: [51.505, -0.09],
        materials: ["Paper", "Plastic", "Glass", "Metal"]
      },
      {
        id: 2,
        name: "Community Compost Hub",
        address: "456 Garden Ave, Eco City",
        type: "compost",
        position: [51.51, -0.1],
        materials: ["Food Waste", "Yard Waste", "Plant Trimmings"]
      },
      {
        id: 3,
        name: "Electronics Disposal Facility",
        address: "789 Tech Blvd, Eco City",
        type: "ewaste",
        position: [51.515, -0.09],
        materials: ["Computers", "Phones", "Batteries", "Appliances"]
      },
      {
        id: 4,
        name: "Neighborhood Waste Station",
        address: "101 Local Rd, Eco City",
        type: "general",
        position: [51.5, -0.095],
        materials: ["General Waste", "Bulky Items"]
      },
      {
        id: 5,
        name: "Hazardous Waste Collection",
        address: "202 Safety St, Eco City",
        type: "hazardous",
        position: [51.508, -0.11],
        materials: ["Chemicals", "Paint", "Oil", "Medical Waste"]
      }
    ]
    
    setLocations(mockLocations)
    setFilteredLocations(mockLocations)
    setLoading(false)
    
    // Get user's location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }, [])

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredLocations(locations)
    } else {
      setFilteredLocations(locations.filter(location => location.type === selectedType))
    }
  }, [selectedType, locations])

  const getMarkerIcon = (type) => {
    switch(type) {
      case 'recycling':
        return <FaRecycle className="marker-icon recycling" />
      case 'compost':
        return <FaLeaf className="marker-icon compost" />
      case 'ewaste':
        return <FaRecycle className="marker-icon ewaste" />
      case 'hazardous':
        return <FaTrash className="marker-icon hazardous" />
      default:
        return <FaTrash className="marker-icon general" />
    }
  }

  if (loading) {
    return <div className="loading">Loading locations...</div>
  }

  return (
    <section className="waste-locations">
      <header className="locations-header">
        <h1>Find Waste Disposal Locations</h1>
        <p>Locate nearby recycling centers, compost facilities, and waste disposal sites</p>
      </header>
      
      <div className="filter-container">
        <div className="filter-header">
          <FaFilter />
          <h3>Filter by Type</h3>
        </div>
        <div className="filter-options">
          <button 
            className={`filter-btn ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${selectedType === 'recycling' ? 'active' : ''}`}
            onClick={() => setSelectedType('recycling')}
          >
            <FaRecycle /> Recycling
          </button>
          <button 
            className={`filter-btn ${selectedType === 'compost' ? 'active' : ''}`}
            onClick={() => setSelectedType('compost')}
          >
            <FaLeaf /> Compost
          </button>
          <button 
            className={`filter-btn ${selectedType === 'ewaste' ? 'active' : ''}`}
            onClick={() => setSelectedType('ewaste')}
          >
            <FaRecycle /> E-Waste
          </button>
          <button 
            className={`filter-btn ${selectedType === 'hazardous' ? 'active' : ''}`}
            onClick={() => setSelectedType('hazardous')}
          >
            <FaTrash /> Hazardous
          </button>
        </div>
      </div>
      
      <div className="map-container">
        <MapContainer center={userLocation} zoom={13} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {filteredLocations.map(location => (
            <Marker key={location.id} position={location.position}>
              <Popup>
                <div className="location-popup">
                  <h3>{location.name}</h3>
                  <p className="location-address">{location.address}</p>
                  <div className="location-type">
                    {getMarkerIcon(location.type)}
                    <span>{location.type.charAt(0).toUpperCase() + location.type.slice(1)}</span>
                  </div>
                  <div className="location-materials">
                    <h4>Accepted Materials:</h4>
                    <ul>
                      {location.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.position[0]},${location.position[1]}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="directions-link"
                  >
                    Get Directions
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div className="locations-list">
        <h2>Nearby Locations</h2>
        <div className="locations-grid">
          {filteredLocations.map(location => (
            <div key={location.id} className="location-card">
              <div className="location-header">
                {getMarkerIcon(location.type)}
                <h3>{location.name}</h3>
              </div>
              <p className="location-address">{location.address}</p>
              <div className="location-materials">
                <h4>Accepted Materials:</h4>
                <div className="materials-tags">
                  {location.materials.map((material, index) => (
                    <span key={index} className="material-tag">{material}</span>
                  ))}
                </div>
              </div>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${location.position[0]},${location.position[1]}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="directions-btn"
              >
                <FaMapMarkerAlt /> Get Directions
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WasteLocations
