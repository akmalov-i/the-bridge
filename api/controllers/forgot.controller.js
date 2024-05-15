const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    // const isPasswordCorrect = bcrypt.compareSync(
    //   req.body.password,
    //   candidate.password
    // )
    const isPasswordCorrect = req.body.password == candidate.password

    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id
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
