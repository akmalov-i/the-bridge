const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
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
  postId: {
    ref: 'posts',
    type: Schema.Types.ObjectId
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'replies'
    }
  ]
})

module.exports = model('comments', commentSchema)
