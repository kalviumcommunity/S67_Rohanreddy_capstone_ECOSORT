import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['recycling', 'compost', 'ewaste', 'hazardous', 'general']
  },
  position: {
    type: [Number], // [latitude, longitude]
    required: true,
    index: '2dsphere'
  },
  materials: {
    type: [String],
    default: []
  },
  hours: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  }
})

const Location = mongoose.model('Location', locationSchema)

export default Location
