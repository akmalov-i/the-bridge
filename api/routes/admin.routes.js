const passport = require('passport')
const { Router } = require('express')
const ctr = require('../controllers/admin.controller')
const router = Router()

router.get('/', ctr.getAll)
router.get('/users', ctr.getUsers)
router.get('/aside', ctr.aside)

module.exports = router