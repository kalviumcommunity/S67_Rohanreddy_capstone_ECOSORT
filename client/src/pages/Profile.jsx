import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaLock, FaMedal, FaLeaf, FaRecycle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

const Profile = () => {
  const { currentUser, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || ''
  })
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [profileSuccess, setProfileSuccess] = useState('')
  const [profileError, setProfileError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordError, setPasswordError] = useState('')
  
  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "Recycling Rookie",
      description: "Recycled your first 10 items",
      icon: <FaRecycle />,
      completed: true,
      progress: 100
    },
    {
      id: 2,
      title: "Compost Champion",
      description: "Composted 20 items",
      icon: <FaLeaf />,
      completed: false,
      progress: 75
    },
    {
      id: 3,
      title: "Waste Warrior",
      description: "Properly disposed of 50 items",
      icon: <FaMedal />,
      completed: false,
      progress: 60
    }
  ]
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleProfileSubmit = (e) => {
    e.preventDefault()
    setProfileSuccess('')
    setProfileError('')
    
    // In a real app, this would be an API call to update the profile
    // For demo purposes, we're just showing a success message
    setTimeout(() => {
      setProfileSuccess('Profile updated successfully!')
    }, 1000)
  }
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setPasswordSuccess('')
    setPasswordError('')
    
    // Validate passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }
    
    // In a real app, this would be an API call to update the password
    // For demo purposes, we're just showing a success message
    setTimeout(() => {
      setPasswordSuccess('Password updated successfully!')
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }, 1000)
  }

  return (
    <section className="profile-page">
      <header className="profile-header">
        <h1>Your Profile</h1>
        <p>Manage your account and view achievements</p>
      </header>
      
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaUser /> Profile
        </button>
        <button 
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <FaLock /> Security
        </button>
        <button 
          className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <FaMedal /> Achievements
        </button>
      </div>
      
      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="profile-info">
              <div className="profile-avatar">
                <FaUser />
              </div>
              <div className="profile-details">
                <h2>{currentUser?.name || 'User'}</h2>
                <p>{currentUser?.email || 'user@example.com'}</p>
                <div className="eco-stats">
                  <div className="eco-stat">
                    <span className="stat-value">42</span>
                    <span className="stat-label">Items Recycled</span>
                  </div>
                  <div className="eco-stat">
                    <span className="stat-value">120</span>
                    <span className="stat-label">Eco Points</span>
                  </div>
                </div>
              </div>
            </div>
            
            {profileSuccess && <div className="success-message">{profileSuccess}</div>}
            {profileError && <div className="error-message">{profileError}</div>}
            
            <form onSubmit={handleProfileSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser /> Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileForm.bio}
                  onChange={handleProfileChange}
                  className="form-control"
                  rows="4"
                  placeholder="Tell us about yourself and your eco-friendly habits..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        )}
        
        {activeTab === 'security' && (
          <div className="security-section">
            <h2>Change Password</h2>
            
            {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
            {passwordError && <div className="error-message">{passwordError}</div>}
            
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="form-control"
                  required
                  minLength="6"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="form-control"
                  required
                  minLength="6"
                />
              </div>
              
              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
            </form>
            
            <div className="danger-zone">
              <h3>Danger Zone</h3>
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
              <button className="btn-delete">
                Delete Account
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'achievements' && (
          <div className="achievements-section">
            <h2>Your Eco Achievements</h2>
            <p>Track your progress and earn badges for eco-friendly actions</p>
            
            <div className="achievements-list">
              {achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className={`achievement-icon ${achievement.completed ? 'completed' : ''}`}>
                    {achievement.icon}
                  </div>
                  <div className="achievement-info">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                    <div className="progress-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {achievement.completed ? 'Completed!' : `${achievement.progress}% complete`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Profile
