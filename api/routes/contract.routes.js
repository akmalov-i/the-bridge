const { Router } = require('express')
const ctr = require('../controllers/contract.controller')
const router = Router()

router.post('/', ctr.create)

module.exports = router