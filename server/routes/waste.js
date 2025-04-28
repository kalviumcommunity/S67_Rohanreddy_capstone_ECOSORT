// import express from 'express'
// import WasteItem from '../models/WasteItem.js'
// import WasteHistory from '../models/WasteHistory.js'
// import User from '../models/User.js'
// import { protect } from '../middleware/auth.js'

// const router = express.Router()

// // @route   GET /api/waste/items
// // @desc    Get all waste items
// // @access  Public
// router.get('/items', async (req, res) => {
//   try {
//     const items = await WasteItem.find()
//     res.json(items)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   GET /api/waste/items/:id
// // @desc    Get waste item by ID
// // @access  Public
// router.get('/items/:id', async (req, res) => {
//   try {
//     const item = await WasteItem.findById(req.params.id)
    
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' })
//     }
    
//     res.json(item)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   POST /api/waste/items
// // @desc    Create a new waste item
// // @access  Private (Admin only in a real app)
// router.post('/items', protect, async (req, res) => {
//   try {
//     const { name, category, instructions, tips, points } = req.body
    
//     const newItem = new WasteItem({
//       name,
//       category,
//       instructions,
//       tips,
//       points
//     })
    
//     const savedItem = await newItem.save()
//     res.status(201).json(savedItem)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   GET /api/waste/search
// // @desc    Search waste items by name
// // @access  Public
// router.get('/search', async (req, res) => {
//   try {
//     const { query } = req.query
    
//     if (!query) {
//       return res.status(400).json({ message: 'Search query is required' })
//     }
    
//     const items = await WasteItem.find({
//       name: { $regex: query, $options: 'i' }
//     })
    
//     res.json(items)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   GET /api/waste/history
// // @desc    Get user's waste disposal history
// // @access  Private
// router.get('/history', protect, async (req, res) => {
//   try {
//     const history = await WasteHistory.find({ user: req.user._id })
//       .sort({ date: -1 })
    
//     res.json(history)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   POST /api/waste/history
// // @desc    Add item to user's waste disposal history
// // @access  Private
// router.post('/history', protect, async (req, res) => {
//   try {
//     const { itemId, name, category } = req.body
    
//     // Get the waste item if ID is provided
//     let points = 0
//     if (itemId) {
//       const wasteItem = await WasteItem.findById(itemId)
//       if (wasteItem) {
//         points = wasteItem.points
//       }
//     } else {
//       // Assign default points based on category
//       switch(category) {
//         case 'recycle':
//           points = 5
//           break
//         case 'compost':
//           points = 3
//           break
//         case 'waste':
//           points = 1
//           break
//         case 'ewaste':
//           points = 4
//           break
//         case 'hazardous':
//           points = 2
//           break
//         default:
//           points = 1
//       }
//     }
    
//     // Create history entry
//     const historyEntry = new WasteHistory({
//       user: req.user._id,
//       item: itemId || null,
//       name,
//       category,
//       points,
//       date: new Date()
//     })
    
//     const savedEntry = await historyEntry.save()
    
//     // Update user stats
//     const user = await User.findById(req.user._id)
    
//     user.stats.totalItems += 1
//     user.stats.ecoPoints += points
    
//     switch(category) {
//       case 'recycle':
//         user.stats.recycledItems += 1
//         break
//       case 'compost':
//         user.stats.compostItems += 1
//         break
//       case 'waste':
//       case 'ewaste':
//       case 'hazardous':
//         user.stats.wasteItems += 1
//         break
//       default:
//         break
//     }
    
//     await user.save()
    
//     res.status(201).json(savedEntry)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // @route   GET /api/waste/stats
// // @desc    Get user's waste disposal stats
// // @access  Private
// router.get('/stats', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id)
    
//     // Get additional stats from history
//     const history = await WasteHistory.find({ user: req.user._id })
    
//     // Calculate stats by time period
//     const now = new Date()
//     const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
//     const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    
//     const weeklyItems = history.filter(item => new Date(item.date) >= oneWeekAgo).length
//     const monthlyItems = history.filter(item => new Date(item.date) >= oneMonthAgo).length
    
//     res.json({
//       ...user.stats,
//       weeklyItems,
//       monthlyItems,
//       totalEntries: history.length
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// export default router
