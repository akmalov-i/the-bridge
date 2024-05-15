const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  name: {
    type: String,
    min: 2,
    required: true
  },
  surname: {
    type: String,
    min: 2,
    required: true
  },
  telephone: {
    type: String,
    min: 10,
    unique: true,
    required: true
  },
  surname: {
    type: String,
    min: 2,
    required: true
  },
  fromCountry: {
    type: Schema.Types.Mixed,
    default: null
  },
  fromCity: {
    type: Schema.Types.Mixed,
    default: null
  },
  textarea: {
    type: String,
    min: 80,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    min: 6,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  dateOfCreation: {
    type: String,
    required: true
  },
  car: {
    type: Schema.Types.Mixed,
    default: {
      value: 'Not specified',
      label: 'Не указано'
    }
  },
  tools: {
    type: Schema.Types.Mixed,
    default: {
      value: 'Not specified',
      label: 'Не указано'
    }
  },
  knowledge: {
    type: Schema.Types.Mixed,
    default: {
      value: 'Not specified',
      label: 'Не указано'
    }
  },
  profession: {
    type: Array,
    default: null
  },
  langs: {
    type: Array,
    default: null
  },
  exp: {
    type: Schema.Types.Mixed,
    default: {
      value: 'Not specified',
      label: 'Не указано'
    }
  },
  verified: {
    type: Boolean,
    default: false
  },
  access: {
    type: Schema.Types.Mixed,
    default: {
      accessAll: true,
      accessAuth: false,
      accessTrans: false
    }
  },
  recommend: {
    type: Schema.Types.Mixed,
    default: {
      yes: 0,
      no: 0
    }
  },
  subsNP: {
    type: Array,
    default: null
  },
  subsLE: {
    type: Array,
    default: null
  },
  noobies: {
    type: Boolean,
    default: null
  },
  onWork: {
    type: Number,
    default: 1
  },
  links: {
    type: Schema.Types.Mixed,
    default: {
      telegram: '',
      instagram: '',
      whatsapp: ''
    }
  },
  portfolio: {
    type: Array
  },
  rooms: {
    type: Array
  },
  imageUrl: {
    type: String,
    default: ''
  },
  status: {
    type: Schema.Types.Mixed,
    default: {
      punctuality: [],
      quality: [],
      efficiency: [],
      neatness: [],
      honesty: []
    }
  },
  rating: {
    type: Schema.Types.Mixed,
    default: {
      punctuality: 0,
      quality: 0,
      efficiency: 0,
      neatness: 0,
      honesty: 0,
      stars: 0,
      reliability: 0
    }
  },
  messenger: {
    type: Array,
    default: null
  },
  archivedMessenger: {
    type: Array,
    default: null
  },
  banned: {
    type: Boolean,
    default: false
  }
})

module.exports = model('users', userSchema)
