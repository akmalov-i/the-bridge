const Experience = require('../models/experience.model')

module.exports.create = async (req, res) => {
  const post = new Experience({
    userId: req.body.userId,
    title: req.body.title,
    text: req.body.text,
    fromCountry: JSON.parse(req.body.fromCountry),
    fromCity: JSON.parse(req.body.fromCity),
    time: req.body.time,
    date: req.body.date,
    dateOfCreation: req.body.dateOfCreation
  })

  if (req.files) {
    if (req.files.length) {
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
  const currentTerm = req.query.currentTerm || -1

  let postFilters = null
  if (req.query.search) {
    postFilters = {
      title: { $regex: req.query.search, $options: 'i' }
    }
  } else {
    postFilters = {}
  }
  const postCount = await Experience.find(postFilters).count()

  Object.keys(postFilters).forEach(
    (key) =>
      postFilters[key] === undefined ||
      (postFilters[key] === '' && delete postFilters[key])
  )

  try {
    const posts = await Experience.find(postFilters)
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

module.exports.getById = async (req, res) => {
  try {
    await Experience.findById(req.query.id).exec((error, post) => {
      res.json(post)
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.addView = async (req, res) => {
  const $set = {
    checked: true
  }
  try {
    await Experience.findOneAndUpdate({ _id: req.params.id }, { $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}
