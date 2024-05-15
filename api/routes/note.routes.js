const { Router } = require('express')
const ctr = require('../controllers/note.controller')
const router = Router()

router.post('/', ctr.create)
router.get('/:id', ctr.getAll)
router.put('/', ctr.edit)
router.delete('/:id', ctr.remove)

module.exports = router
