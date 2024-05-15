const Post = require('../models/user.model')

module.exports.getStatus = async (req, res) => {
  try {
    const user = await Post.findById(req.query.id)

    /* Звезды */
    let efficiencyStar = 0
    let honestyStar = 0
    let neatnessStar = 0
    let punctualityStar = 0
    let qualityStar = 0

    /* Процент */
    let efficiency = 0
    let honesty = 0
    let neatness = 0
    let punctuality = 0
    let quality = 0

    for (let i = 0; i < user.status.efficiency.length; i++) {
      efficiency += user.status.efficiency[i].rate
    }
    for (let i = 0; i < user.status.honesty.length; i++) {
      honesty += user.status.honesty[i].rate
    }
    for (let i = 0; i < user.status.neatness.length; i++) {
      neatness += user.status.neatness[i].rate
    }
    for (let i = 0; i < user.status.punctuality.length; i++) {
      punctuality += user.status.punctuality[i].rate
    }
    for (let i = 0; i < user.status.quality.length; i++) {
      quality += user.status.quality[i].rate
    }

    /* Звезды */
    efficiencyStar = efficiency / (user.status.efficiency.length + 1) / 10
    honestyStar = honesty / (user.status.honesty.length + 1) / 10
    neatnessStar = neatness / (user.status.neatness.length + 1) / 10
    punctualityStar = punctuality / (user.status.punctuality.length + 1) / 10
    qualityStar = quality / (user.status.quality.length + 1) / 10

    /* Процент */
    efficiency = Math.round(
      (efficiency / (user.status.efficiency.length + 1)) * 20
    )
    honesty = Math.round((honesty / (user.status.honesty.length + 1)) * 20)
    neatness = Math.round((neatness / (user.status.neatness.length + 1)) * 20)
    punctuality = Math.round(
      (punctuality / (user.status.punctuality.length + 1)) * 20
    )
    quality = Math.round((quality / (user.status.quality.length + 1)) * 20)

    let reliability = Math.round(
      (user.recommend.yes / (user.recommend.yes + user.recommend.no)) * 100
    )

    let stars =
      efficiencyStar +
      honestyStar +
      neatnessStar +
      punctualityStar +
      qualityStar +
      Number(
        (
          (user.recommend.yes / (user.recommend.yes + user.recommend.no)) *
          2.5
        ).toFixed(1)
      )

    let status = {
      efficiency: efficiency,
      honesty: honesty,
      neatness: neatness,
      punctuality: punctuality,
      quality: quality,
      stars: Number(stars.toFixed(1)),
      reliability
    }

    res.json(status)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    const user = await Post.findById(req.query.id)
    res.json(user)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getByIdMinimal = async (req, res) => {
  try {
    const post = await Post.find(
      { _id: req.query.id },
      {
        _id: 1,
        name: 1,
        surname: 1,
        imageUrl: 1,
        subsNP: 1,
        subsLE: 1,
        rating: 1
      }
    ).exec()
    
    if (post) {
      post[0].surname = post[0].surname.slice(0, 1) + '.'
      return res.json(post)
    }
  } catch (e) {
    return res.status(500).json(e)
  }
}

module.exports.getByIdExp = async (req, res) => {
  try {
    await Post.find(
      { _id: req.query.id },
      { _id: 1, name: 1, surname: 1, telephone: 1 }
    ).exec((error, post) => {
      res.json(post)
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateProfile = async (req, res) => {
  const $set = {}
  if (typeof req.body.onWork === 'number') $set.onWork = req.body.onWork
  if (req.body?.portfolio) $set.portfolio = req.body.portfolio

  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateMain = async (req, res) => {
  const $set = {}

  if (req.body?.name) $set.name = req.body.name
  if (req.body?.surname) $set.surname = req.body.surname
  if (req.body?.textarea) $set.textarea = req.body.textarea
  if (req.body?.profession) $set.profession = JSON.parse(req.body.profession)

  if (req?.file?.filename) {
    $set.imageUrl = `/${req.file.filename}`
  } else {
    req.body.imageSrc != 'undefined' && req.body.imageSrc != null
      ? ($set.imageUrl = req.body.imageSrc)
      : ($set.imageUrl = '')
  }

  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateDetails = async (req, res) => {
  const $set = {}

  if (req.body?.telephone) $set.telephone = req.body.telephone
  if (req.body?.fromCountry) $set.fromCountry = JSON.parse(req.body.fromCountry)
  if (req.body?.fromCity) $set.fromCity = JSON.parse(req.body.fromCity)
  if (req.body?.email) $set.email = req.body.email
  if (req.body?.exp) $set.exp = JSON.parse(req.body.exp)
  if (req.body?.car) $set.car = JSON.parse(req.body.car)
  if (req.body?.knowledge) $set.knowledge = JSON.parse(req.body.knowledge)
  if (req.body?.tools) $set.tools = JSON.parse(req.body.tools)
  if (req.body?.langs) $set.langs = JSON.parse(req.body.langs)

  const candidate = await Post.findOne({
    _id: { $ne: req.params.id },
    email: req.body.email
  })

  const candidateNumber = await Post.findOne({
    _id: { $ne: req.params.id },
    telephone: req.body.telephone
  })

  if (candidate) {
    return res.status(409).json({ message: 'Такой e-mail уже занят!' })
  }

  if (candidateNumber) {
    return res.status(409).json({ message: 'Такой номер телефона уже занят!' })
  }

  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateLinks = async (req, res) => {
  const $set = {}

  if (req.body?.links) $set.links = JSON.parse(req.body.links)

  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateAccess = async (req, res) => {
  const $set = {}

  if (req.body?.access) $set.access = JSON.parse(req.body.access)

  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateSubsNP = async (req, res) => {
  const $set = {}

  if (req.body?.subsNP) $set.subsNP = JSON.parse(req.body.subsNP)

  const candidate = await Post.findOne({
    _id: req.params.id,
    subsNP: { $elemMatch: { telephone: JSON.parse(req.body.subsNP).telephone } }
  })

  const validate = await Post.findOne({
    _id: req.params.id,
    telephone: JSON.parse(req.body?.subsNP).telephone
  })

  if (candidate || validate) {
    return res
      .status(409)
      .json({ message: 'Такой номер телефона уже добавлен!' })
  }

  try {
    await Post.updateOne({ _id: req.params.id }, { $push: $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.setSubsNP = async (req, res) => {
  try {
    await Post.findOneAndUpdate(
      {
        _id: req.params.id,
        subsNP: {
          $elemMatch: { telephone: JSON.parse(req.body.setSubsNP).telephone }
        }
      },
      {
        $set: {
          'subsNP.$.name': JSON.parse(req.body.setSubsNP).name,
          'subsNP.$.surname': JSON.parse(req.body.setSubsNP).surname
        }
      }
    )
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.setSubsLE = async (req, res) => {
  try {
    await Post.findOneAndUpdate(
      {
        _id: req.params.id,
        subsLE: {
          $elemMatch: { telephone: JSON.parse(req.body.setSubsLE).telephone }
        }
      },
      {
        $set: {
          'subsLE.$.name': JSON.parse(req.body.setSubsLE).name,
          'subsLE.$.address': JSON.parse(req.body.setSubsLE).address,
          'subsLE.$.lic': JSON.parse(req.body.setSubsLE).lic
        }
      }
    )
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateSubsLE = async (req, res) => {
  const $set = {}

  if (req.body?.subsLE) $set.subsLE = JSON.parse(req.body.subsLE)

  const candidate = await Post.findOne({
    _id: req.params.id,
    subsLE: { $elemMatch: { telephone: JSON.parse(req.body.subsLE).telephone } }
  })

  const validate = await Post.findOne({
    _id: req.params.id,
    telephone: JSON.parse(req.body?.subsLE).telephone
  })

  if (candidate || validate) {
    return res
      .status(409)
      .json({ message: 'Такой номер телефона уже добавлен!' })
  }

  try {
    await Post.updateOne({ _id: req.params.id }, { $push: $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.removeSubsNP = async (req, res) => {
  const $set = {}

  if (req.body?.subsNP) $set.subsNP = JSON.parse(req.body.subsNP)

  try {
    await Post.updateOne({ _id: req.params.id }, { $pull: $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.removeSubsLE = async (req, res) => {
  const $set = {}

  if (req.body?.subsLE) $set.subsLE = JSON.parse(req.body.subsLE)

  try {
    await Post.updateOne({ _id: req.params.id }, { $pull: $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updatePortfolio = async (req, res) => {
  let $set = ''
  if (req?.file?.filename) {
    $set = `/${req.file.filename}`
  }
  try {
    await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { portfolio: $set } }
    )
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}
