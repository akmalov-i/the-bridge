const Note = require('../models/note.model')

module.exports.create = async (req, res) => {
  try {
    const { userId, textarea, adminId } = req.body
    const note = new Note({ userId, textarea, adminId })

    await note.save()

    res.status(201).json(note)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.id }).populate('adminId')
    res.json(notes)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.edit = async (req, res) => {
  try {
    const $set = {
      adminId: req.body.adminId,
      textarea: req.body.textarea
    }
    await Note.findOneAndUpdate({ _id: req.body.id }, { $set })
    const note = await Note.findById(req.body.id).populate(
      'adminId'
    )
    res.json(note)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id })
    res.json({ message: 'Пост удален' })
  } catch (e) {
    res.status(500).json(e)
  }
}
