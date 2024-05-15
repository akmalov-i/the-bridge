const passport = require('passport')
const { Router } = require('express')
const ctr = require('../controllers/post.controller')
const upload = require('../middleware/upload-files')
const uploadReason = require('../middleware/upload-reason-files')
const router = Router()

// router.post('/', passport.authenticate('jwt', { session: false }), ctr.create)
router.post('/', upload.array('fileList', 5), ctr.create)
router.get('/', ctr.getAll)
router.get('/:id', ctr.getById)
router.get('/minimal/:id', ctr.getByIdMinimal)
router.put('/:id', upload.array('fileList', 5), ctr.update)
router.put('/reason/:id', uploadReason.array('fileList', 5), ctr.reason)
router.put('/add/view/:id', ctr.addView)
router.put('/finish/:id', ctr.finish)
router.put('/fullfinish/:id', ctr.fullFinish)

module.exports = router
