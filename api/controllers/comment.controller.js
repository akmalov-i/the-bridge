const Comment = require('../models/comment.model')
const Replies = require('../models/replies.model')
const Post = require('../models/post.model')
const { post } = require('../routes/auth.routes')

module.exports.create = async (req, res) => {
  try {
    const { userId, text, postId } = req.body
    const comment = new Comment({ userId, text, postId })

    await comment.save()

    const post = await Post.findById(postId)
    post.comments.push(comment._id)
    await post.save()

    res.status(201).json(comment)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.createReply = async (req, res) => {
  try {
    const { userId, text, commentId, repliedSubject } = req.body
    const reply = new Replies({ userId, text, commentId, repliedSubject })

    await reply.save()

    const comment = await Comment.findById(commentId)
    comment.replies.push(reply._id)
    await comment.save()

    res.status(201).json(reply)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getReactions = async (req, res) => {
  try {
    await Post.find({ _id: req.params.id }, { reactions: 1 }).exec(
      (error, reaction) => {
        res.json(reaction)
      }
    )
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.setReaction = async (req, res) => {
  try {
    const unusual = await Post.findOne({
      _id: req.params.id,
      'reactions.unusual': req.body.userId
    })
    const fewDetails = await Post.findOne({
      _id: req.params.id,
      'reactions.fewDetails': req.body.userId
    })
    const lowPrice = await Post.findOne({
      _id: req.params.id,
      'reactions.lowPrice': req.body.userId
    })
    const suspiciously = await Post.findOne({
      _id: req.params.id,
      'reactions.suspiciously': req.body.userId
    })
    const another = await Post.findOne({
      _id: req.params.id,
      'reactions.another': {
        $elemMatch: { userId: req.body.userId }
      }
    })

    if (unusual || fewDetails || lowPrice || suspiciously || another) {
      return res
        .status(409)
        .json({ message: 'Вы уже нажимали на это действие!' })
    }

    if (req.body.reaction === 'unusual') {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { 'reactions.unusual': req.body.userId } }
      )
      return res.status(204).json()
    }

    if (req.body.reaction === 'fewDetails') {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { 'reactions.fewDetails': req.body.userId } }
      )
      return res.status(204).json()
    }

    if (req.body.reaction === 'lowPrice') {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { 'reactions.lowPrice': req.body.userId } }
      )
      return res.status(204).json()
    }

    if (req.body.reaction === 'suspiciously') {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { 'reactions.suspiciously': req.body.userId } }
      )
      return res.status(204).json()
    }

    if (req.body.reaction === 'another') {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            'reactions.another': {
              userId: req.body.userId,
              text: req.body.text
            }
          }
        }
      )
      return res.status(204).json()
    }
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.setLike = async (req, res) => {
  try {
    const candidate = await Comment.findOne({
      _id: req.params.id,
      'likes.id': req.body.userId
    })

    if (candidate) {
      return res
        .status(409)
        .json({ message: 'Вы уже нажимали на это действие!' })
    }

    const candidateDislike = await Comment.findOne({
      _id: req.params.id,
      'dislikes.id': req.body.userId
    })

    if (candidateDislike) {
      await Comment.updateOne(
        { _id: req.params.id },
        { $pull: { 'dislikes.id': req.body.userId } }
      )

      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: {
            'dislikes.count': -1
          }
        }
      )
    }

    await Comment.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          'likes.id': req.body.userId
        }
      }
    )
    await Comment.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: {
          'likes.count': 1
        }
      }
    )
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.setDislike = async (req, res) => {
  try {
    const candidate = await Comment.findOne({
      _id: req.params.id,
      'dislikes.id': req.body.userId
    })

    if (candidate) {
      return res
        .status(409)
        .json({ message: 'Вы уже нажимали на это действие!' })
    }

    const candidateLike = await Comment.findOne({
      _id: req.params.id,
      'likes.id': req.body.userId
    })

    if (candidateLike) {
      await Comment.updateOne(
        { _id: req.params.id },
        { $pull: { 'likes.id': req.body.userId } }
      )

      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: {
            'likes.count': -1
          }
        }
      )
    }

    await Comment.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          'dislikes.id': req.body.userId
        }
      }
    )
    await Comment.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: {
          'dislikes.count': 1
        }
      }
    )
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.setLikeReply = async (req, res) => {
  try {
    const candidate = await Replies.findOne({
      _id: req.params.id,
      'likes.id': req.body.userId
    })

    if (candidate) {
      return res
        .status(409)
        .json({ message: 'Вы уже нажимали на это действие!' })
    }

    const candidateDislike = await Replies.findOne({
      _id: req.params.id,
      'dislikes.id': req.body.userId
    })

    if (candidateDislike) {
      await Replies.updateOne(
        { _id: req.params.id },
        { $pull: { 'dislikes.id': req.body.userId } }
      )

      await Replies.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: {
            'dislikes.count': -1
          }
        }
      )
    }

    await Replies.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          'likes.id': req.body.userId
        }
      }
    )
    await Replies.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: {
          'likes.count': 1
        }
      }
    )
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.setDislikeReply = async (req, res) => {
  try {
    const candidate = await Replies.findOne({
      _id: req.params.id,
      'dislikes.id': req.body.userId
    })

    if (candidate) {
      return res
        .status(409)
        .json({ message: 'Вы уже нажимали на это действие!' })
    }

    const candidateLike = await Replies.findOne({
      _id: req.params.id,
      'likes.id': req.body.userId
    })

    if (candidateLike) {
      await Replies.updateOne(
        { _id: req.params.id },
        { $pull: { 'likes.id': req.body.userId } }
      )

      await Replies.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: {
            'likes.count': -1
          }
        }
      )
    }

    await Replies.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          'dislikes.id': req.body.userId
        }
      }
    )
    await Replies.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: {
          'dislikes.count': 1
        }
      }
    )
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getRepliesById = async (req, res) => {
  try {
    await Comment.findById(req.query.id)
      .populate('replies', '', null, { sort: { date: -1 } })
      .exec((error, reply) => {
        res.json(reply)
      })
  } catch (e) {
    res.status(500).json(e)
  }
}
