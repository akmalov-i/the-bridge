const { Schema, model } = require('mongoose')

const findsSchema = new Schema({
  finds: {
    type: String,
    required: true
  },
  mainCategory: {
    type: String,
    required: true
  },
  subcategory: {
    type: Array,
    required: true
  },
  subcategoryLabel: {
    type: Schema.Types.Mixed,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  where: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  time: {
    type: String,
    default: null
  },
  date: {
    type: String,
    default: null
  },
  fileList: {
    type: Array,
    default: null
  },
  approved: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  dateOfCreation: {
    type: String,
    required: true
  }
})

module.exports = model('finds', findsSchema)