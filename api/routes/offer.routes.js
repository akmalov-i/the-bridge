const { Router } = require('express')
const ctr = require('../controllers/offer.controller')
const router = Router()

router.post('/', ctr.create)
router.put('/counter/:id', ctr.setCounter)
router.put('/remove/:id', ctr.remove)
router.put('/accept/:id', ctr.accept)
router.put('/new/:id', ctr.new)
router.put('/reject/:id', ctr.reject)
router.put('/recover/:id', ctr.recover)
router.put('/newByAuthor/:id', ctr.newByAuthor)
router.get('/', ctr.getById)
router.get('/all', ctr.getAll)

module.exports = router
