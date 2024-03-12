const express = require('express')
const router = express.Router()

const pool = require('../db.js')

router.get('/', function (req, res) {
  res.render('index.njk', { 
    title: 'Hej user',
    message: 'Välkommen'
  })
})

router.get('/login', function (req, res) {
  res.render('login.njk', { 
    title: 'Hej user',
    message: 'Välkommen'
  })
})

router.get('/signup', function (req, res) {
  res.render('signup.njk', { 
    title: 'Hej user',
    message: 'Välkommen'
  })
})

router.get('/minasidor', function (req, res) {
  res.render('minasidor.njk', { 
    title: 'Hej user',
    message: 'Välkommen'
  
})
})

router.get('/test', async function  (req, res) {
  
    const [result] = await pool.promise().query(
      `SELECT * FROM salam_login `,
    )
 
  res.json(result)
})

module.exports = router
