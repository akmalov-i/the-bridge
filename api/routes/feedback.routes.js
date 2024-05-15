const { Router } = require('express')
const ctr = require('../controllers/feedback.controller')
const router = Router()

router.post('/', ctr.create)
router.get('/all', ctr.getPostFeeds)
router.get('/user', ctr.getUserFeeds)

module.exports = router
