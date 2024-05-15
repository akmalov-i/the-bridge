const { Router } = require('express')
const passport = require('passport')
const ctr = require('../controllers/forgot.controller')
const router = Router()

router.post('/admin/forgotEmail', ctr.restoreByEmail)
router.post('/admin/forgotPhone', ctr.restoreByPhone)

module.exports = router
