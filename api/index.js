const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const keys = require('./keys')
const consola = require('consola')
const cors = require('cors')

// routes
const authRoutes = require('./routes/auth.routes'),
  userRoutes = require('./routes/user.routes'),
  postRoutes = require('./routes/post.routes'),
  tradeRoutes = require('./routes/trade.routes'),
  contractRoutes = require('./routes/contract.routes'),
  experienceRoutes = require('./routes/experience.routes'),
  findsRoutes = require('./routes/finds.routes'),
  codesRoutes = require('./routes/codes.routes'),
  commentRoutes = require('./routes/comment.routes'),
  noteRoutes = require('./routes/note.routes'),
  offerRoutes = require('./routes/offer.routes'),
  feedbackRoutes = require('./routes/feedback.routes'),
  adminRoutes = require('./routes/admin.routes'),
  messageRoutes = require('./routes/message.routes')

mongoose.set('strictQuery', false)
mongoose
  .connect(keys.MONGODB_URI, { useNewUrlParser: true })
  .then(() => consola.success('Mongoose has been connected!'))

app.use(cors())
app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/verification', codesRoutes)
app.use('/post', postRoutes)
app.use('/trade', tradeRoutes)
app.use('/experience', experienceRoutes)
app.use('/contract', contractRoutes)
app.use('/finds', findsRoutes)
app.use('/comment', commentRoutes)
app.use('/note', noteRoutes)
app.use('/offer', offerRoutes)
app.use('/feedback', feedbackRoutes)
app.use('/admin', adminRoutes)
app.use('/message', messageRoutes)

export default {
  path: '/api',
  handler: app
}
