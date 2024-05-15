const { Schema, model } = require('mongoose')

const frozenSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
)

frozenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 75 })

module.exports = model('frozen', frozenSchema)
