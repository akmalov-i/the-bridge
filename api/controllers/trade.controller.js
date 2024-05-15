const Trade = require('../models/trade.model')

module.exports.create = async (req, res) => {
  const post = new Trade({
    title: req.body.title,
    text: req.body.text,
    adsSection: req.body.adsSection,
    purposeOfAds: req.body.purposeOfAds,
    mainCategory: req.body.mainCategory,
    subcategory: JSON.parse(req.body.subcategory),
    subcategoryLabel: JSON.parse(req.body.subcategoryLabel),
    country: req.body.country,
    city: req.body.city,
    tradeDelivery: req.body.tradeDelivery,
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
module.exports.getAll = async (req, res) => {
  const pagination = req.query.limits
  const page = req.query.page ? parseInt(req.query.page) : 1

  const currentTerm = req.query.currentTerm || ''
  const mainCategory = JSON.parse(req.query.filters).mainCategory || ''
  const purposeOfAds = JSON.parse(req.query.filters).button || ''
  const determiningTheCost =
    JSON.parse(req.query.filters).determiningTheCost || ''
  const minLevelForTheApplication =
    JSON.parse(req.query.filters).minLevelForTheApplication || ''
  const currency = JSON.parse(req.query.filters).currency || ''
  const condition = JSON.parse(req.query.filters).condition || ''
  const tradeDelivery = JSON.parse(req.query.filters).tradeDelivery || ''
  const priceFork = JSON.parse(req.query.filters).priceFork || ''

  if (
    req.query.search ||
    mainCategory ||
    determiningTheCost ||
    minLevelForTheApplication ||
    currency ||
    condition ||
    tradeDelivery ||
    purposeOfAds ||
    priceFork
  ) {
    const postFilters = {
      title: { $regex: req.query.search, $options: 'i' },
      mainCategory: mainCategory[0] || '',
      subcategory: mainCategory[1] || '',
      purposeOfAds: purposeOfAds,
      determiningTheCost: determiningTheCost,
      minLevelForTheApplication: minLevelForTheApplication,
      currency: currency,
      condition: condition,
      tradeDelivery: tradeDelivery,
      priceFork: priceFork
    }
    Object.keys(postFilters).forEach(
      (key) =>
        postFilters[key] === undefined ||
        (postFilters[key] === '' && delete postFilters[key])
    )
    const postCount = await Trade.find(postFilters).count()
    try {
      const posts = await Trade.find(postFilters)
        .sort({ dateOfCreation: currentTerm })
        .skip((page - 1) * pagination)
        .limit(pagination)
        .lean()
        .exec()
      res.json({ posts, postCount })
    } catch (e) {
      res.status(500).json(e)
    }
  } else {
    const postCount = await Trade.countDocuments()
    try {
      const posts = await Trade.find()
        .sort({ dateOfCreation: currentTerm })
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
    await Trade.findById(req.query.id)
      // .populate('comments')
      .exec((error, post) => {
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
    await Trade.findOneAndUpdate({ _id: req.params.id }, { $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}
