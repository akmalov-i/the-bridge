const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  numbers: {
    type: Array,
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
  adsSection: {
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
  country: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  fromCountry: {
    type: Schema.Types.Mixed,
    default: null
  },
  fromCity: {
    type: Schema.Types.Mixed,
    default: null
  },
  toCountry: {
    type: Schema.Types.Mixed,
    default: null
  },
  toCity: {
    type: Schema.Types.Mixed,
    default: null
  },
  deadlines: {
    type: String,
    required: true
  },
  delivery: {
    type: String,
    required: true
  },
  time: {
    type: String,
    default: null
  },
  date: {
    type: String,
    default: null
  },
  periodTimeStart: {
    type: String,
    default: null
  },
  periodDateStart: {
    type: String,
    default: null
  },
  periodTimeEnd: {
    type: String,
    default: null
  },
  periodDateEnd: {
    type: String,
    default: null
  },
  determiningTheCost: {
    type: String,
    default: null
  },
  paymentTerms: {
    type: String,
    default: null
  },
  budget: {
    type: String,
    default: null
  },
  currency: {
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
  dateOfCreation: {
    type: String,
    required: true
  }
})

module.exports = model('contracts', postSchema)
