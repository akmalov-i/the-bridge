const { Schema, model } = require('mongoose')

const offerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  details: {
    type: Array,
    default: []
  },
  new: {
    type: Boolean,
    default: true
  },
  lastBudget: {
    type: Number,
    default: null
  },
  newOfferByAuthor: {
    type: Boolean,
    default: false
  },
  rejected: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  dateOfCreation: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },
  postId: {
    ref: 'posts',
    type: Schema.Types.ObjectId
  }
})

module.exports = model('offers', offerSchema)
