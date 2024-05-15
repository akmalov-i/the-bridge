const { Router } = require('express')
const ctr = require('../controllers/comment.controller')
const router = Router()

router.post('/', ctr.create)
router.post('/reply', ctr.createReply)
router.put('/like/:id', ctr.setLike)
router.put('/reaction/:id', ctr.setReaction)
router.put('/dislike/:id', ctr.setDislike)
router.put('/like/reply/:id', ctr.setLikeReply)
router.put('/dislike/reply/:id', ctr.setDislikeReply)
router.get('/replies/:id', ctr.getRepliesById)
router.get('/allReactions/:id', ctr.getReactions)

module.exports = router
