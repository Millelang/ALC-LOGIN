const express = require('express')
const router = express.Router()


router.get('/', function (req, res) {
  res.render('index.njk', { 
    title: 'Hej user',
    message: 'Välkommen'
  })
})

module.exports = router