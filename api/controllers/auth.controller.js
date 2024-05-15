const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      candidate.password
    )
    // const isPasswordCorrect = req.body.password == candidate.password

    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
          banned: candidate.banned
        },
        keys.JWT,
        { expiresIn: 60 * 60 }
      )
      res.json({ token })
    } else {
      res.status(404).json({ message: 'Пользователь не найден' })
    }
  } else {
    res.status(404).json({ message: 'Пользователь не найден' })
  }
}

module.exports.loginByEmail = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      candidate.password
    )
    // const isPasswordCorrect = req.body.password == candidate.password

    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
          banned: candidate.banned
        },
        keys.JWT,
        { expiresIn: 60 * 60 }
      )
      res.json({ token })
    } else {
      res.status(404).json({ message: 'Пользователь не найден' })
    }
  } else {
    res.status(404).json({ message: 'Пользователь не найден' })
  }
}

module.exports.loginByPhone = async (req, res) => {
  const candidate = await User.findOne({ telephone: req.body.phone })

  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      candidate.password
    )
    // const isPasswordCorrect = req.body.password == candidate.password

    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          telephone: candidate.telephone,
          userId: candidate._id,
          banned: candidate.banned
        },
        keys.JWT,
        { expiresIn: 60 * 60 }
      )
      res.json({ token })
    } else {
      res.status(404).json({ message: 'Пользователь не найден' })
    }
  } else {
    res.status(404).json({ message: 'Пользователь не найден' })
  }
}

module.exports.createUser = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email })
  const candidateNumber = await User.findOne({ telephone: req.body.telephone })

  if (candidate) {
    res.status(409).json({ message: 'Такой e-mail уже занят!' })
  } else if (candidateNumber) {
    res.status(409).json({ message: 'Такой номер телефона уже занят!' })
  } else {
    const salt = bcrypt.genSaltSync(10)

    const user = new User({
      data: req.body.data,
      name: req.body.name,
      surname: req.body.surname,
      dateOfBirth: req.body.dateOfBirth,
      telephone: req.body.telephone,
      email: req.body.email,
      fromCountry: req.body.fromCountry,
      fromCity: req.body.fromCity,
      textarea: req.body.textarea,
      dateOfCreation: req.body.dateOfCreation,
      password: bcrypt.hashSync('admin1', salt)
      // password: bcrypt.hashSync(Math.random().toString(36).slice(-8), salt)
    })

    await user.save()
    res.status(201).json(user)
  }
}
