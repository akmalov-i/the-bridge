const { Schema, model } = require('mongoose')

const tradeSchema = new Schema({
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
  purposeOfAds: {
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
  tradeDelivery: {
    type: String,
    required: true
  },
  deadlines: {
    type: String,
    required: true
  },
  urgently: {
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
  forWhom: {
    type: Schema.Types.Mixed,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },
  adAccess: {
    type: String,
    default: null
  },
  minLevelForTheApplication: {
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
  status: {
    type: String,
    default: 'application' //  active, cancelled
  },
  views: {
    type: Number,
    default: 0
  },
  dateOfCreation: {
    type: String,
    required: true
  }
})

module.exports = model('trades', tradeSchema)
