const passport = require('passport')
const { Router } = require('express')
const ctr = require('../controllers/message.controller')
const router = Router()

router.post('/', ctr.create)
router.get('/messages', ctr.fetchMessages)
router.get('/roomUsers', ctr.fetchRoomUsers)
router.get('/loadMore', ctr.loadMore)
router.put('/setArchive/:id', ctr.setArchive)
router.put('/unzip/:id', ctr.unzip)

module.exports = router