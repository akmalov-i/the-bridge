const { Schema, model } = require('mongoose')

const codesSchema = new Schema(
  {
    phone: {
      type: String,
      unique: true,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

codesSchema.index({ createdAt: 1 }, { expireAfterSeconds: 75 })

module.exports = model('phoneCodes', codesSchema)
