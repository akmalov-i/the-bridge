const passport = require('passport')
const { Router } = require('express')
const upload = require('../middleware/upload')
const uploadPortfolio = require('../middleware/upload-portfolio')
const ctr = require('../controllers/user.controller')
const router = Router()

router.put('/:id', ctr.updateProfile)
router.put('/details/:id', upload.single(), ctr.updateDetails)
router.put('/links/:id', upload.single(), ctr.updateLinks)
router.put('/access/:id', upload.single(), ctr.updateAccess)
router.put('/subsNP/:id', upload.single(), ctr.updateSubsNP)
router.put('/setSubsNP/:id', upload.single(), ctr.setSubsNP)
router.put('/setSubsLE/:id', upload.single(), ctr.setSubsLE)
router.put('/subsLE/:id', upload.single(), ctr.updateSubsLE)
router.put('/removeSubsNP/:id', upload.single(), ctr.removeSubsNP)
router.put('/removeSubsLE/:id', upload.single(), ctr.removeSubsLE)
router.put('/main/:id', upload.single('image'), ctr.updateMain)
router.put('/portfolio/:id', uploadPortfolio.single('image'), ctr.updatePortfolio)
router.get('/:id', ctr.getById)
router.get('/status/:id', ctr.getStatus)
router.get('/minimal/:id', ctr.getByIdMinimal)
router.get('/exp/:id', ctr.getByIdExp)

module.exports = router