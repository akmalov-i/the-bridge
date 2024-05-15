const Post = require('../models/post.model')
const Trade = require('../models/trade.model')
const User = require('../models/user.model')
const Exp = require('../models/experience.model')

module.exports.getAll = async (req, res) => {
  const pagination = req.query.limits
  const page = req.query.page ? parseInt(req.query.page) : 1
  const currentTerm = req.query.currentTerm || -1
  const status = JSON.parse(req.query.filters).status || ''
  const chapter = JSON.parse(req.query.filters).chapter || ''

  let postFilters = null
  if (req.query.search) {
    postFilters = {
      title: { $regex: req.query.search, $options: 'i' }
    }
  } else {
    postFilters = {
      status: status
    }
  }
  if (chapter === 'service') {
    const postCount = await Post.find(postFilters).count()

    Object.keys(postFilters).forEach(
      (key) =>
        postFilters[key] === undefined ||
        (postFilters[key] === '' && delete postFilters[key])
    )

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
    const postCount = await Trade.find(postFilters).count()

    Object.keys(postFilters).forEach(
      (key) =>
        postFilters[key] === undefined ||
        (postFilters[key] === '' && delete postFilters[key])
    )

    try {
      const posts = await Trade.find(postFilters)
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

module.exports.getUsers = async (req, res) => {
  const pagination = req.query.limits
  const page = req.query.page ? parseInt(req.query.page) : 1
  const currentTerm = req.query.currentTerm || -1
  const usersCount = await User.find({ approved: false }).count()

  try {
    let users = await User.find({ approved: false })
      .sort({ _id: currentTerm })
      .skip((page - 1) * pagination)
      .limit(pagination)
      .lean()
      .exec()

    res.json({ users, usersCount })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.aside = async (req, res) => {
  try {
    const postsCount = await Post.find({ status: 'application' }).count()
    const tradeCount = await Trade.find({ status: 'application' }).count()
    const usersCount = await User.find({ approved: false }).count()
    const expCount = await Exp.find({ checked: false }).count()

    count = postsCount + tradeCount
    res.json({ count, usersCount, expCount })
  } catch (e) {
    res.status(500).json(e)
  }
}
