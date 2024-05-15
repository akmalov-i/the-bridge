const Feedback = require('../models/feedback.model')
const User = require('../models/user.model')
const Post = require('../models/post.model')

const setRating = async (customUser) => {
  try {
    const user = await User.findById(customUser)

    let efficiencyStar = 0,
      honestyStar = 0,
      neatnessStar = 0,
      punctualityStar = 0,
      qualityStar = 0,
      efficiency = 0,
      honesty = 0,
      neatness = 0,
      punctuality = 0,
      quality = 0

    for (let i = 0; i < user.status.efficiency.length; i++) {
      efficiency += user.status.efficiency[i].rate
    }
    for (let i = 0; i < user.status.honesty.length; i++) {
      honesty += user.status.honesty[i].rate
    }
    for (let i = 0; i < user.status.neatness.length; i++) {
      neatness += user.status.neatness[i].rate
    }
    for (let i = 0; i < user.status.punctuality.length; i++) {
      punctuality += user.status.punctuality[i].rate
    }
    for (let i = 0; i < user.status.quality.length; i++) {
      quality += user.status.quality[i].rate
    }

    /* Звезды */
    efficiencyStar = efficiency / (user.status.efficiency.length + 1) / 10
    honestyStar = honesty / (user.status.honesty.length + 1) / 10
    neatnessStar = neatness / (user.status.neatness.length + 1) / 10
    punctualityStar = punctuality / (user.status.punctuality.length + 1) / 10
    qualityStar = quality / (user.status.quality.length + 1) / 10

    /* Процент */
    efficiency = Math.round(
      (efficiency / (user.status.efficiency.length + 1)) * 20
    )
    honesty = Math.round((honesty / (user.status.honesty.length + 1)) * 20)
    neatness = Math.round((neatness / (user.status.neatness.length + 1)) * 20)
    punctuality = Math.round(
      (punctuality / (user.status.punctuality.length + 1)) * 20
    )
    quality = Math.round((quality / (user.status.quality.length + 1)) * 20)

    let reliability = Math.round(
      (user.recommend.yes / (user.recommend.yes + user.recommend.no)) * 100
    )

    let stars =
      efficiencyStar +
      honestyStar +
      neatnessStar +
      punctualityStar +
      qualityStar +
      Number(
        (
          (user.recommend.yes / (user.recommend.yes + user.recommend.no)) *
          2.5
        ).toFixed(1)
      )

    let status = {
      efficiency: efficiency,
      honesty: honesty,
      neatness: neatness,
      punctuality: punctuality,
      quality: quality,
      stars: Number(stars.toFixed(1)),
      reliability
    }

    await User.findOneAndUpdate(
      { _id: customUser },
      {
        $set: {
          'rating.punctuality': punctuality,
          'rating.quality': quality,
          'rating.efficiency': efficiency,
          'rating.neatness': neatness,
          'rating.honesty': honesty,
          'rating.stars': Number(stars.toFixed(1)),
          'rating.reliability': reliability
        }
      }
    )

    res.json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.create = async (req, res) => {
  try {
    const {
      author,
      executorId,
      authorId,
      recommend,
      textarea,
      doNotShow,
      postId,
      punctuality,
      quality,
      efficiency,
      neatness,
      honesty,
      from,
      to
    } = req.body

    const validate = await Post.findOne({
      _id: postId
    })

    if (author && validate.feedback.author) {
      return res.status(409).json({ message: 'Невозможно отправить запрос!' })
    }

    if (!author && validate.feedback.executor) {
      return res.status(409).json({ message: 'Невозможно отправить запрос!' })
    }

    const feedback = new Feedback({
      executorId,
      authorId,
      recommend,
      textarea,
      doNotShow,
      postId,
      punctuality,
      quality,
      efficiency,
      neatness,
      honesty,
      from,
      to,
      total: punctuality + quality + efficiency + neatness + honesty
    })

    await feedback.save()
    let customUser = author ? executorId : authorId
    let post = null

    await User.findOneAndUpdate(
      { _id: customUser },
      {
        $push: {
          'status.punctuality': {
            id: author ? authorId : executorId,
            rate: punctuality
          },
          'status.quality': {
            id: author ? authorId : executorId,
            rate: quality
          },
          'status.efficiency': {
            id: author ? authorId : executorId,
            rate: efficiency
          },
          'status.neatness': {
            id: author ? authorId : executorId,
            rate: neatness
          },
          'status.honesty': {
            id: author ? authorId : executorId,
            rate: honesty
          }
        }
      }
    )

    if (recommend === 'yes') {
      await User.findOneAndUpdate(
        { _id: customUser },
        {
          $inc: {
            'recommend.yes': 1
          }
        }
      )
    }
    if (recommend === 'no') {
      await User.findOneAndUpdate(
        { _id: customUser },
        {
          $inc: {
            'recommend.no': 1
          }
        }
      )
    }

    if (author) {
      post = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $set: {
            'feedback.author': feedback._id
          }
        }
      )
    } else {
      post = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $set: {
            'feedback.executor': feedback._id
          }
        }
      )
    }

    const postReturn = await Post.findOne({
      _id: postId
    })
    let feedAuthor = null
    let feedExecutor = null

    if (postReturn.feedback.author) {
      feedAuthor = await Feedback.findOne({
        _id: postReturn.feedback.author
      })
    }
    if (postReturn.feedback.executor) {
      feedExecutor = await Feedback.findOne({
        _id: postReturn.feedback.executor
      })
    }

    setRating(customUser)

    res.json({
      postR: postReturn,
      feedAuthor: feedAuthor,
      feedExecutor: feedExecutor
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getPostFeeds = async (req, res) => {
  try {
    const authors = await Feedback.findById(req.query.authorId)
    const executors = await Feedback.findById(req.query.executorId)

    res.json({
      feedAuthor: authors || null,
      feedExecutor: executors || null
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getUserFeeds = async (req, res) => {
  let resultTerm = { total: -1 }
  if (req.query.resultTerm == -1) {
    resultTerm = {
      total: -1
    }
  }
  if (req.query.resultTerm == 1) {
    resultTerm = {
      total: 1
    }
  }
  if (req.query.resultTerm == 2) {
    resultTerm = {
      date: -1
    }
  }
  if (req.query.resultTerm == 3) {
    resultTerm = {
      date: 1
    }
  }

  let search = {
    to: req.query.userId,
    textarea: { $exists: true, $ne: '' }
  }

  if (req.query.hidden === 'false') search.doNotShow = false

  try {
    let feedback = await Feedback.find(search)
      .sort(resultTerm)
      .populate('postId', '', null, { sort: { _id: -1 } })

    if (req.query.tab) {
      feedback = feedback.filter((e) => e.postId.mainCategory === req.query.tab)
    }

    res.json(feedback)
  } catch (e) {
    res.status(500).json(e)
  }
}
