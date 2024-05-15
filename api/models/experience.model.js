const { Schema, model } = require('mongoose')

const experienceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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
  fromCountry: {
    type: Schema.Types.Mixed,
    default: null
  },
  fromCity: {
    type: Schema.Types.Mixed,
    default: null
  },
  time: {
    type: String,
    default: null
  },
  checked: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: null
  },
  fileList: {
    type: Array,
    default: null
  },
  dateOfCreation: {
    type: String,
    required: true
  }
})

module.exports = model('experience', experienceSchema)
