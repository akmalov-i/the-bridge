const { Router } = require('express')
const passport = require('passport')
const ctr = require('../controllers/auth.controller')
const router = Router()

router.post('/admin/login', ctr.login)
router.post('/admin/email', ctr.loginByEmail)
router.post('/admin/phone', ctr.loginByPhone)

router.post(
  '/admin/create',
  // passport.authenticate('jwt', { session: false }),
  ctr.createUser
)

module.exports = router
