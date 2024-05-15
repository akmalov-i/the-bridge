const Message = require('../models/message.model')
const User = require('../models/user.model')

module.exports.create = async (req, res) => {
  try {
    const { from, to, text, dateOfCreation } = req.body

    const checkFirstMsg = await Message.findOne({
      $or: [
        {
          to: to,
          from: from
        },
        {
          to: from,
          from: to
        }
      ]
    })

    const message = new Message({
      from,
      to,
      text,
      dateOfCreation,
      isFirstMsg: checkFirstMsg ? false : true
    })

    await message.save()

    const user = await User.findById(from)
    const checkMessenger = user.messenger.filter((i) => i === to)

    if (!checkMessenger.length) {
      const interlocutor = await User.findById(to)

      user.messenger.push(to)
      interlocutor.messenger.push(from)

      await user.save()
      await interlocutor.save()
    }

    return res.status(201).json({ message, messenger: user.messenger })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.fetchMessages = async (req, res) => {
  const limiter = 20 // лимит передаваемых сообщений

  try {
    const { id } = req.query
    const user = await User.findOne({ _id: id })
    let messages = []

    for (let i = 0; i < user.messenger.length; i++) {
      let box = await Message.find({
        $or: [
          {
            to: id,
            from: user.messenger[i]
          },
          {
            to: user.messenger[i],
            from: id
          }
        ]
      })
        .sort({ _id: -1 })
        .limit(limiter)

      messages.push(...box.reverse())
    }

    return res.json({
      messages,
      messenger: user.messenger,
      archive: user.archivedMessenger
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.setArchive = async (req, res) => {
  try {
    const { id } = req.params
    const { archive } = req.body

    const user = await User.findById(id)

    const a = new Set(archive)
    user.archivedMessenger = user.archivedMessenger.filter((e) => !a.has(e)) // удаляем дубликаты

    user.archivedMessenger.push(...archive)
    await user.save()

    return res.json(user.archivedMessenger)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.unzip = async (req, res) => {
  try {
    const { id } = req.params
    const { archive } = req.body

    const user = await User.findById(id)

    const a = new Set(archive)
    user.archivedMessenger = user.archivedMessenger.filter((e) => !a.has(e)) // удаляем
    await user.save()

    return res.json(user.archivedMessenger)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.fetchRoomUsers = async (req, res) => {
  try {
    const { from, to } = req.query

    const user = await User.findOne(
      { _id: from },
      { rooms: 1, name: 1, surname: 1, imageUrl: 1, onWork: 1, _id: 1 }
    )
    const interlocutor = await User.findOne(
      { _id: to },
      { rooms: 1, name: 1, surname: 1, imageUrl: 1, onWork: 1, _id: 1 }
    )

    await Message.updateMany({ to: from, from: to }, { $set: { isRead: true } })

    user.surname = user.surname.slice(0, 1) + '.'
    interlocutor.surname = interlocutor.surname.slice(0, 1) + '.'

    return res.json({ user, interlocutor })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.loadMore = async (req, res) => {
  const limiter = 20 // лимит передаваемых сообщений

  try {
    const { loaderCount, userId, interlocutor } = req.query

    let messages = await Message.find({
      $or: [
        {
          to: userId,
          from: interlocutor
        },
        {
          to: interlocutor,
          from: userId
        }
      ]
    })
      .sort({ _id: -1 })
      .skip(loaderCount * limiter)
      .limit(limiter)
      .lean()
      .exec()

    return res.json(messages)
  } catch (e) {
    res.status(500).json(e)
  }
}
