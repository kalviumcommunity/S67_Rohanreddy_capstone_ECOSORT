import mongoose from 'mongoose'

const wasteItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['recycle', 'compost', 'waste', 'ewaste', 'hazardous'],
    default: 'waste'
  },
  instructions: {
    type: String,
    required: true
  },
  tips: {
    type: String,
    default: ''
  },
  points: {
    type: Number,
    default: 1
  }
})

const WasteItem = mongoose.model('WasteItem', wasteItemSchema)

export default WasteItem
