const path = require('path')
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '../..', 'static/exp-files'))
  },
  filename(req, file, cb) {
    cb(null, `${moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'application/x-zip-compressed' ||
    file.mimetype ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'text/plain' ||
    file.mimetype === 'application/x-zip-compressed' ||
    file.mimetype === 'application/x-zip' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'application/vnd.ms-excel' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'audio/mpeg' ||
    file.mimetype === 'video/mp4' ||
    file.mimetype === 'video/avi'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 50 }
})
