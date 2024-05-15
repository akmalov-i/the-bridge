const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
  from: {
    ref: 'users',
    type: Schema.Types.ObjectId,
    required: true
  },
  to: {
    ref: 'users',
    type: Schema.Types.ObjectId,
    required: true
  },
  dateOfCreation: {
    type: String,
    required: true
  },
  text: {
    type: String,
    min: 1,
    required: true
  },
  roomId: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isFirstMsg: {
    type: Boolean,
    default: false
  }
})

module.exports = model('message', messageSchema)
