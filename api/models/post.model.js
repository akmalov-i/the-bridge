const { Schema, model, SchemaType } = require('mongoose')

const postSchema = new Schema({
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
  mainCategoryLabel: {
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
  auto: {
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
  status: {
    type: String,
    default: 'application' //  active, cancelled
  },
  completed: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  dateOfCreation: {
    type: String,
    required: true
  },
  reactions: {
    type: Schema.Types.Mixed,
    default: {
      unusual: [],
      fewDetails: [],
      lowPrice: [],
      suspiciously: [],
      another: []
    }
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },
  executor: {
    type: Schema.Types.Mixed,
    default: {
      userId: '',
      text: '',
      budget: '',
      currency: '',
      step: '',
      dateOfCreation: ''
    }
  },
  reasonExecutor: {
    type: Schema.Types.Mixed,
    default: {
      text: null,
      approved: false,
      dateOfCreation: null,
      fileList: []
    }
  },
  reasonAuthor: {
    type: Schema.Types.Mixed,
    default: {
      text: null,
      approved: false,
      dateOfCreation: null,
      fileList: []
    }
  },
  feedback: {
    type: Schema.Types.Mixed,
    default: {
      author: null,
      executor: null
    }
  },
  finished: {
    type: Boolean,
    default: false
  },
  finishedExecutor: {
    type: Schema.Types.Mixed,
    default: {
      data: ''
    }
  },
  finishedAuthor: {
    type: Schema.Types.Mixed,
    default: {
      data: ''
    }
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comments'
    }
  ],
  offers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'offers'
    }
  ]
})

module.exports = model('posts', postSchema)
