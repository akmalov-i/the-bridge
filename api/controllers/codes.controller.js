const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const emailCode = require('../models/codes.email.model')
const phoneCode = require('../models/codes.phone.model')

module.exports.email = async (req, res) => {
  const salt = bcrypt.genSaltSync(10)
  const code = new emailCode({
    email: req.body.email,
    code: bcrypt.hashSync(toString(req.body.code), salt)
  })

  try {
    await code.save()
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })

    const mailOptions = {
      from: 'no-reply',
      to: req.body.email,
      subject: 'Restore code',
      html: `code: <b>${req.body.code}</b>`
    }

    transporter.sendMail(mailOptions)
    res.status(201).json(code)
  } catch (e) {
    res.status(500).json(e.message)
  }
}

module.exports.phone = async (req, res) => {
  const salt = bcrypt.genSaltSync(10)
  const code = new phoneCode({
    phone: req.body.phone,
    code: bcrypt.hashSync(toString(req.body.code), salt)
  })

  try {
    await code.save()
    const client = new twilio(
      'ACff8ea3ebe3207d218a53e549ed215cc1',
      '264273051888dac5624e448c71848e34'
    )
    client.messages.create({
      to: req.body.phone,
      from: '+19472191651',
      body: `Your verification code: ${req.body.code}`
    })
    res.status(201).json(code)
  } catch (e) {
    res.status(500).json(e.message)
  }
}

module.exports.forgotByPhone = async (req, res) => {
  const candidate = await phoneCode.findOne({ phone: req.body.phone })

  if (candidate) {
    const isCodeCorrect = bcrypt.compareSync(
      req.body.password,
      candidate.password
    )

    if (isCodeCorrect) {
      res.status(204).json()
    } else {
      res.status(404).json({ message: 'Не правильный код' })
    }
  } else {
    res.status(404).json({ message: 'Не правильный код' })
  }
}

module.exports.forgotByEmail = async (req, res) => {
  const candidate = await emailCode.findOne({ email: req.body.email })

  if (candidate) {
    const isCodeCorrect = bcrypt.compareSync(
      req.body.password,
      candidate.password
    )

    if (isCodeCorrect) {
      res.status(204).json()
    } else {
      res.status(404).json({ message: 'Не правильный код' })
    }
  } else {
    res.status(404).json({ message: 'Не правильный код' })
  }
}
