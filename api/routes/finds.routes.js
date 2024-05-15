const { Router } = require('express')
const ctr = require('../controllers/finds.controller')
const router = Router()

router.post('/', ctr.create)
router.get('/', ctr.getAll)
router.get('/:id', ctr.getById)
router.put('/add/view/:id', ctr.addView)

module.exports = router