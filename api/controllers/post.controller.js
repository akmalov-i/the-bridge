const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    adsSection: req.body.adsSection,
    mainCategory: req.body.mainCategory,
    mainCategoryLabel: req.body.mainCategoryLabel,
    subcategory: JSON.parse(req.body.subcategory),
    subcategoryLabel: JSON.parse(req.body.subcategoryLabel),
    country: req.body.country,
    city: req.body.city,
    fromCountry: JSON.parse(req.body.fromCountry),
    fromCity: JSON.parse(req.body.fromCity),
    toCountry: JSON.parse(req.body.toCountry),
    toCity: JSON.parse(req.body.toCity),
    auto: req.body.auto,
    deadlines: req.body.deadlines,
    urgently: req.body.urgently,
    time: req.body.time,
    date: req.body.date,
    periodTimeStart: req.body.periodTimeStart,
    periodDateStart: req.body.periodDateStart,
    periodTimeEnd: req.body.periodTimeEnd,
    periodDateEnd: req.body.periodDateEnd,
    determiningTheCost: req.body.determiningTheCost,
    paymentTerms: req.body.paymentTerms,
    budget: req.body.budget,
    forWhom: JSON.parse(req.body.forWhom),
    adAccess: req.body.adAccess,
    minLevelForTheApplication: req.body.minLevelForTheApplication,
    currency: req.body.currency,
    author: req.body.author,
    dateOfCreation: req.body.dateOfCreation
  })

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      let file = {}
      file.path = req.files[i].path
      file.originalname = req.files[i].originalname
      file.size = req.files[i].size
      file.filename = req.files[i].filename
      file.forEdit = true

      post.fileList.push(file)
    }
  }

  try {
    await post.save()
    res.status(201).json(post)
  } catch (e) {
    res.status(500).json(e.message)
  }
}
module.exports.update = async (req, res) => {
  const $set = {
    title: req.body.title,
    text: req.body.text,
    adsSection: req.body.adsSection,
    mainCategory: req.body.mainCategory,
    mainCategoryLabel: req.body.mainCategoryLabel,
    auto: req.body.auto,
    urgently: req.body.urgently,
    paymentTerms: req.body.paymentTerms,
    adAccess: req.body.adAccess,
    minLevelForTheApplication: req.body.minLevelForTheApplication,
    currency: req.body.currency,
    status: 'application',
    fileList: []
  }

  if(req.body?.fromCountry) $set.fromCountry = JSON.parse(req.body.fromCountry)
  if(req.body?.fromCity) $set.fromCity = JSON.parse(req.body.fromCity)
  if(req.body?.toCountry) $set.toCountry = JSON.parse(req.body.toCountry)
  if(req.body?.toCity) $set.toCity = JSON.parse(req.body.toCity)
  if(req.body?.country) $set.country = req.body.country
  if(req.body?.city) $set.city = req.body.city
  if(req.body?.deadlines) $set.deadlines = req.body.deadlines
  if(req.body?.periodTimeStart) $set.periodTimeStart = req.body.periodTimeStart
  if(req.body?.periodDateStart) $set.periodDateStart = req.body.periodDateStart
  if(req.body?.periodTimeEnd) $set.periodTimeEnd = req.body.periodTimeEnd
  if(req.body?.periodDateEnd) $set.periodDateEnd = req.body.periodDateEnd
  if(req.body?.time) $set.time = req.body.time
  if(req.body?.date) $set.date = req.body.date
  if(req.body?.determiningTheCost) $set.determiningTheCost = req.body.determiningTheCost
  if(req.body?.budget) $set.budget = req.body.budget
  if(req.body?.subcategory) $set.subcategory = JSON.parse(req.body.subcategory)
  if(req.body?.subcategoryLabel) $set.subcategoryLabel = JSON.parse(req.body.subcategoryLabel)
  if(req.body?.forWhom) $set.forWhom = JSON.parse(req.body.forWhom)

  if (req.files) {
    if (req.files.length) {
      for (let i = 0; i < req.files.length; i++) {
        let file = {}
        file.path = req.files[i].path
        file.originalname = req.files[i].originalname
        file.size = req.files[i].size
        file.filename = req.files[i].filename
        file.forEdit = true

        $set.fileList.push(file)
      }
    }
  }

  if (req.body.fileListPrototype) {
    if (req.body.fileListPrototype.length > 0) {
      const FLP = JSON.parse(req.body.fileListPrototype)
      for (let i = 0; i < FLP.length; i++) {
        let file = {}
        file.path = FLP[i].path
        file.originalname = FLP[i].originalname
        file.size = FLP[i].size
        file.filename = FLP[i].filename
        file.forEdit = true

        $set.fileList.push(file)
      }
    }
  }

  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: req.params.id
      },
      { $set }
    )
    res.status(204).json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}
module.exports.reason = async (req, res) => {
  let files = []
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      let file = {}
      file.path = req.files[i].path
      file.originalname = req.files[i].originalname
      file.size = req.files[i].size
      file.filename = req.files[i].filename
      files.push(file)
    }
  }
  let $set = {}
  if (req.body.author === 'true') {
    $set = {
      'reasonAuthor.userId': req.body.userId,
      'reasonAuthor.text': req.body.text,
      'reasonAuthor.fileList': files,
      'reasonAuthor.dateOfCreation': req.body.dateOfCreation
    }
  }
  if (req.body.author === 'false') {
    $set = {
      'reasonExecutor.userId': req.body.userId,
      'reasonExecutor.text': req.body.text,
      'reasonExecutor.fileList': files,
      'reasonExecutor.dateOfCreation': req.body.dateOfCreation
    }
  }

  try {
    const validate = await Post.findOne({
      _id: req.params.id
    })

    if (
      (validate.reasonExecutor.userId && req.body.author === 'false') ||
      (validate.reasonAuthor.userId && req.body.author === 'true')
    ) {
      return res.status(409).json({
        message: 'Вы уже отправили запрос, ждите одобрения администратора!'
      })
    }

    await Post.findOneAndUpdate({ _id: req.params.id }, { $set })

    const post = await Post.findOne({ _id: req.params.id })
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}
module.exports.getAll = async (req, res) => {
  const pagination = req.query.limits
  const page = req.query.page ? parseInt(req.query.page) : 1

  const currentTerm = req.query.currentTerm || -1
  const mainCategory = JSON.parse(req.query.filters).mainCategory || ''
  const determiningTheCost =
    JSON.parse(req.query.filters).determiningTheCost || ''
  const minLevelForTheApplication =
    JSON.parse(req.query.filters).minLevelForTheApplication || ''
  const currency = JSON.parse(req.query.filters).currency || ''

  if (
    req.query.search ||
    mainCategory ||
    determiningTheCost ||
    minLevelForTheApplication ||
    currency
  ) {
    const postFilters = {
      title: { $regex: req.query.search, $options: 'i' },
      mainCategory: mainCategory[0] || '',
      subcategory: mainCategory[1] || '',
      determiningTheCost: determiningTheCost,
      minLevelForTheApplication: minLevelForTheApplication,
      currency: currency
    }
    Object.keys(postFilters).forEach(
      (key) =>
        postFilters[key] === undefined ||
        (postFilters[key] === '' && delete postFilters[key])
    )
    const postCount = await Post.find(postFilters).count()
    try {
      const posts = await Post.find(postFilters)
        .sort({ _id: currentTerm })
        .skip((page - 1) * pagination)
        .limit(pagination)
        .lean()
        .exec()
      res.json({ posts, postCount })
    } catch (e) {
      res.status(500).json(e)
    }
  } else {
    const postCount = await Post.countDocuments()
    try {
      const posts = await Post.find()
        .sort({ _id: currentTerm })
        .skip((page - 1) * pagination)
        .limit(pagination)
        .lean()
        .exec()
      res.json({ posts, postCount })
    } catch (e) {
      res.status(500).json(e)
    }
  }
}
module.exports.getById = async (req, res) => {
  try {
    await Post.findById(req.query.id)
      .populate('comments', '', null, { sort: { date: -1 } })
      // .populate('offers', '', null, { sort: { date: -1 } })
      .exec((error, post) => {
        res.json(post)
      })
  } catch (e) {
    res.status(500).json(e)
  }
}
module.exports.getByIdMinimal = async (req, res) => {
  try {
    await Post.findOne(
      { _id: req.query.id },
      {
        author: 1
      }
    ).exec((error, post) => {
      res.json(post)
    })
  } catch (e) {
    res.status(500).json(e)
  }
}
module.exports.addView = async (req, res) => {
  const $set = {
    views: ++req.body.views
  }
  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}
module.exports.finish = async (req, res) => {
  const validate = await Post.findOne({
    _id: req.params.id
  })

  let $set = null
  if (req.body.executor) {
    if (validate.finishedAuthor.data) {
      $set = {
        finished: true
      }
    } else {
      if (validate.finishedExecutor.data) {
        return res.status(409).json({ message: 'Вы уже закрыли транзакцию!' })
      }
      $set = {
        'finishedExecutor.data': req.body.data
      }
    }
  } else {
    if (validate.finishedExecutor.data) {
      $set = {
        finished: true
      }
    } else {
      if (validate.finishedAuthor.data) {
        return res.status(409).json({ message: 'Вы уже закрыли транзакцию!' })
      }
      $set = {
        'finishedAuthor.data': req.body.data
      }
    }
  }

  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set })

    const post = await Post.findOne({ _id: req.params.id })
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}
module.exports.fullFinish = async (req, res) => {
  const validate = await Post.findOne({
    _id: req.params.id
  })

  if (validate.finished) {
    return res.status(409).json({ message: 'Вы уже закрыли транзакцию!' })
  }

  let $set = {
    finished: true
  }

  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set })

    const post = await Post.findOne({ _id: req.params.id })
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}
