const { Router } = require('express')
const ctr = require('../controllers/codes.controller')
const router = Router()

router.post('/codes/email', ctr.email)
router.post('/codes/forgot/email', ctr.forgotByEmail)

router.post('/codes/phone', ctr.phone)
router.post('/codes/forgot/phone', ctr.forgotByPhone)

module.exports = router