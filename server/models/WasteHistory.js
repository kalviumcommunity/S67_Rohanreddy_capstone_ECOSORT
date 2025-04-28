import mongoose from 'mongoose'

const wasteHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WasteItem'
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['recycle', 'compost', 'waste', 'ewaste', 'hazardous']
  },
  points: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const WasteHistory = mongoose.model('WasteHistory', wasteHistorySchema)

export default WasteHistory
