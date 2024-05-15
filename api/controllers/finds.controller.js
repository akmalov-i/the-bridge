const Finds = require('../models/finds.model')

module.exports.create = async (req, res) => {
  const post = new Finds({
    finds: req.body.finds,
    mainCategory: req.body.mainCategory,
    subcategory: req.body.subcategory,
    subcategoryLabel: req.body.subcategoryLabel,
    title: req.body.title,
    text: req.body.text,
    country: req.body.country,
    city: req.body.city,
    fromCountry: req.body.fromCountry,
    fromCity: req.body.fromCity,
    time: req.body.time,
    date: req.body.date,
    where: req.body.where,
    fileList: req.body.fileList,
    dateOfCreation: req.body.dateOfCreation
  })

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
  
  const mainCategory = JSON.parse(req.query.filters).mainCategory || ''
  const currentTerm = req.query.currentTerm || -1
  const finds = JSON.parse(req.query.filters).button || ''

  if (req.query.search || mainCategory || finds) {
    const postFilters = {
      title: { $regex: req.query.search, $options: 'i' },
      mainCategory: mainCategory[0] || '',
      subcategory: mainCategory[1] || '',
      finds: finds
    }
    Object.keys(postFilters).forEach(
      (key) =>
        postFilters[key] === undefined ||
        (postFilters[key] === '' && delete postFilters[key])
    )
    const postCount = await Finds.find(postFilters).count()
    try {
      const posts = await Finds.find(postFilters)
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
    const postCount = await Finds.countDocuments()
    try {
      const posts = await Finds.find()
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
    await Finds.findById(req.query.id)
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
    await Finds.findOneAndUpdate({ _id: req.params.id }, { $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}