const Contract = require('../models/contract.model')

module.exports.create = async (req, res) => {
  const post = new Contract({
    numbers: req.body.numbers,
    title: req.body.title,
    text: req.body.text,
    adsSection: req.body.adsSection,
    mainCategory: req.body.mainCategory,
    subcategory: req.body.subcategory,
    subcategoryLabel: req.body.subcategoryLabel,
    country: req.body.country,
    city: req.body.city,
    fromCountry: req.body.fromCountry,
    fromCity: req.body.fromCity,
    toCountry: req.body.toCountry,
    toCity: req.body.toCity,
    deadlines: req.body.deadlines,
    delivery: req.body.delivery,
    time: req.body.time,
    date: req.body.date,
    periodTimeStart: req.body.periodTimeStart,
    periodDateStart: req.body.periodDateStart,
    periodTimeEnd: req.body.periodTimeEnd,
    periodDateEnd: req.body.periodDateEnd,
    determiningTheCost: req.body.determiningTheCost,
    paymentTerms: req.body.paymentTerms,
    budget: req.body.budget,
    currency: req.body.currency,
    fileList: req.body.fileList,
    dateOfCreation: req.body.dateOfCreation
  })

  try {
    await post.save()
    res.status(201).json(post)
  } catch (e) {
    res.status(500).json(e.message)
  }
}
