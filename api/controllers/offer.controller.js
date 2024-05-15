const Offer = require('../models/offer.model')
const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
  try {
    const { userId, text, currency, budget, postId, dateOfCreation, author } =
      req.body

    let details = {
      text,
      currency,
      budget
    }

    const offer = new Offer({
      userId,
      postId,
      details,
      author,
      lastBudget: budget,
      dateOfCreation
    })

    await offer.save()

    const post = await Post.findById(postId)
    post.offers.push(offer._id)
    await post.save()

    res.status(201).json(offer)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    const offer = await Offer.findOne({
      postId: req.query.postId,
      userId: req.query.userId
    })
    res.json(offer)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  let filter = {}
  let lookingFor = { postId: req.query.postId, rejected: false }

  if (req.query.currentTerm == 2) {
    lookingFor = { postId: req.query.postId, rejected: true }
  }
  if (req.query.currentTerm == -1) {
    filter = { lastBudget: -1 }
  }
  if (req.query.currentTerm == 1) {
    filter = { lastBudget: 1 }
  }

  try {
    const offer = await Offer.find(lookingFor).sort(filter).lean().exec()
    res.json(offer)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    const validate = await Post.findOne({
      _id: req.body.postId
    })

    if (validate.executor.userId === req.body.userId) {
      return res
        .status(409)
        .json({ message: 'Вас уже выбрали для данного задания!' })
    }

    await Offer.deleteOne({ _id: req.params.id })

    const offer = await Offer.findOne({ _id: req.params.id })
    res.json(offer)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.accept = async (req, res) => {
  try {
    const validate = await Post.findOne({
      _id: req.params.id
    })

    if (validate.executor.userId) {
      return res.status(409).json({ message: 'Исполнитель уже выбран!' })
    }

    await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          'executor.userId': req.body.userId,
          'executor.text': req.body.text,
          'executor.budget': req.body.budget,
          'executor.currency': req.body.currency,
          'executor.step': req.body.step,
          'executor.dateOfCreation': req.body.dateOfCreation
        }
      }
    )

    const post = await Post.findOne({ _id: req.params.id })
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.new = async (req, res) => {
  try {
    await Offer.updateMany({ postId: req.params.id }, { $set: { new: false } })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.newByAuthor = async (req, res) => {
  try {
    await Offer.updateMany(
      { postId: req.params.id },
      { $set: { newOfferByAuthor: false } }
    )
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.reject = async (req, res) => {
  try {
    await Offer.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { rejected: true } }
    )

    const offer = await Offer.findOne({ _id: req.params.id })
    res.json(offer)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.recover = async (req, res) => {
  try {
    await Offer.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { rejected: false } }
    )

    const offer = await Offer.findOne({ _id: req.params.id })
    res.json(offer)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.setCounter = async (req, res) => {
  const $set = {
    budget: req.body.budget,
    currency: req.body.currency,
    text: req.body.text,
    author: req.body.author
  }
  try {
    const validate = await Offer.findOne({
      _id: req.params.id
    })

    if (
      validate.details[validate.details.length - 1].author === req.body.author
    ) {
      return res.status(409).json({ message: 'Невозможно отправить запрос!' })
    }

    if (validate.details.length >= 5) {
      return res.status(409).json({ message: 'Невозможно отправить запрос!' })
    }

    if (req.body.newOffer) {
      await Offer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { new: true } }
      )
    }
    if (req.body.newOfferByAuthor) {
      await Offer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { newOfferByAuthor: true } }
      )
    }
    await Offer.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { details: $set } }
    )
    await Offer.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          dateOfCreation: req.body.dateOfCreation,
          lastBudget: req.body.budget
        }
      }
    )

    const offer = await Offer.findOne({ _id: req.params.id })
    res.json(offer)
  } catch (e) {
    res.status(500).json(e)
  }
}
