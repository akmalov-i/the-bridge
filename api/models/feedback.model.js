const { Schema, model } = require('mongoose')

const feedbackSchema = new Schema({
  executorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  from: {
    type: Schema.Types.ObjectId,
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true
  },
  recommend: {
    type: Boolean,
    required: true
  },
  textarea: {
    type: String,
    max: 500
  },
  punctuality: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  quality: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  efficiency: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  neatness: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  honesty: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  doNotShow: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  postId: {
    ref: 'posts',
    type: Schema.Types.ObjectId
  }
})

module.exports = model('feedback', feedbackSchema)
