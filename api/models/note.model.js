const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  textarea: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  adminId: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
})

module.exports = model('note', noteSchema)
