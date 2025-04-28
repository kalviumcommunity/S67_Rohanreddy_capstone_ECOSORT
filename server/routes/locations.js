// import express from 'express'
// import Location from '../models/Location.js'
// import { protect } from '../middleware/auth.js'

// const router = express.Router()

// // @route   GET /api/locations
// // @desc    Get all waste disposal locations
// // @access  Public
// router.get('/', async (req, res) => {
//   try {
//     const locations = await Location.find()
//     res.json(locations)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   GET /api/locations/nearby
// // @desc    Get nearby waste disposal locations
// // @access  Public
// router.get('/nearby', async (req, res) => {
//   try {
//     const { lat, lng, maxDistance = 10000, type } = req.query
    
//     if (!lat || !lng) {
//       return res.status(400).json({ message: 'Latitude and longitude are required' })
//     }
    
//     // Convert string parameters to numbers
//     const latitude = parseFloat(lat)
//     const longitude = parseFloat(lng)
//     const distance = parseInt(maxDistance)
    
//     // Build query
//     let query = {
//       position: {
//         $near: {
//           $geometry: {
//             type: 'Point',
//             coordinates: [longitude, latitude]
//           },
//           $maxDistance: distance
//         }
//       }
//     }
    
//     // Add type filter if provided
//     if (type && type !== 'all') {
//       query.type = type
//     }
    
//     const locations = await Location.find(query)
    
//     res.json(locations)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   GET /api/locations/:id
// // @desc    Get location by ID
// // @access  Public
// router.get('/:id', async (req, res) => {
//   try {
//     const location = await Location.findById(req.params.id)
    
//     if (!location) {
//       return res.status(404).json({ message: 'Location not found' })
//     }
    
//     res.json(location)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   POST /api/locations
// // @desc    Create a new location
// // @access  Private (Admin only in a real app)
// router.post('/', protect, async (req, res) => {
//   try {
//     const { name, address, type, position, materials, hours, phone, website } = req.body
    
//     const newLocation = new Location({
//       name,
//       address,
//       type,
//       position,
//       materials,
//       hours,
//       phone,
//       website
//     })
    
//     const savedLocation = await newLocation.save()
//     res.status(201).json(savedLocation)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   GET /api/locations/type/:type
// // @desc    Get locations by type
// // @access  Public
// router.get('/type/:type', async (req, res) => {
//   try {
//     const { type } = req.params
    
//     const locations = await Location.find({ type })
    
//     res.json(locations)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// export default router
