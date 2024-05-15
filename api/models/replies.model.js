const { Schema, model } = require('mongoose')

const repliesSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    max: 500,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Schema.Types.Mixed,
    default: {
      count: 0,
      id: []
    }
  },
  dislikes: {
    type: Schema.Types.Mixed,
    default: {
      count: 0,
      id: []
    }
  },
  repliedSubject: {
    type: Schema.Types.ObjectId
  },
  commentId: {
    ref: 'comments',
    type: Schema.Types.ObjectId
  }
})

module.exports = model('replies', repliesSchema)
