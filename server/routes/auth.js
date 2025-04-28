import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// @route   POST /api/auth/register
// @desc    Register a new user
// // @access  Public
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body

//     // Check if user exists
//     const userExists = await User.findOne({ email })

//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' })
//     }

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password
//     })

//     if (user) {
//       res.status(201).json({
//         message: 'User registered successfully'
//       })
//     } else {
//       res.status(400).json({ message: 'Invalid user data' })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   POST /api/auth/login
// // @desc    Authenticate user & get token
// // @access  Public
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body

//     // Check for user email
//     const user = await User.findOne({ email })

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' })
//     }

//     // Check password
//     const isMatch = await user.comparePassword(password)

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' })
//     }

//     res.json({
//       token: generateToken(user._id),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         bio: user.bio,
//         stats: user.stats
//       }
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   GET /api/auth/me
// // @desc    Get current user
// // @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
// router.put('/profile', protect, async (req, res) => {
//   try {
//     const { name, email, bio } = req.body
    
//     const user = await User.findById(req.user._id)
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' })
//     }
    
//     // Update fields
//     if (name) user.name = name
//     if (email) user.email = email
//     if (bio !== undefined) user.bio = bio
    
//     const updatedUser = await user.save()
    
//     res.json({
//       id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       bio: updatedUser.bio,
//       stats: updatedUser.stats
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   PUT /api/auth/password
// // @desc    Update password
// // @access  Private
// router.put('/password', protect, async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body
    
//     const user = await User.findById(req.user._id)
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' })
//     }
    
//     // Check current password
//     const isMatch = await user.comparePassword(currentPassword)
    
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Current password is incorrect' })
//     }
    
//     // Update password
//     user.password = newPassword
//     await user.save()
    
//     res.json({ message: 'Password updated successfully' })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

export default router




