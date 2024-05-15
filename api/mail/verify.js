const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

const mailOptions = {
  from: `no-reply`,
  to: req.body.email,
  subject: 'e-mail confirmation link',
  html: `<p>Confirm your account via <a href="${process.env.BASE_URL}">link</a></p>`
}

transporter.sendMail(mailOptions)