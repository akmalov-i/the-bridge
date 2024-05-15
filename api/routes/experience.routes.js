const { Router } = require('express')
const upload = require('../middleware/upload-files')
const ctr = require('../controllers/experience.controller')
const router = Router()

router.post('/', upload.array('fileList', 5), ctr.create)
router.get('/', ctr.getAll)
router.get('/:id', ctr.getById)
router.put('/add/view/:id', ctr.addView)

module.exports = router