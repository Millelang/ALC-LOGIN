const express = require('express')
const router = express.Router()
const { body ,matchedData , validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = require('../db.js')

router.get('/', function (req, res) {
  res.render('index.njk', {
    title: 'Hej user',
    message: 'Välkommen',
    username: req.session.username
  })
})

router.get('/hashTest', async function (req, res) {
  bcrypt.hash('gligon123', 10, function (err, hash) {
    console.log(hash)
    return res.json(hash);
  })
})


router.post('/signup', async function (req, res) {
  const username = req.body.username
  const password = req.body.password
  
  bcrypt.hash(password, 10, function (err, hash) {
    encrypted = hash
    return encrypted
})


})

router.post('/login', async function (req, res) {

  const username = req.body.username

  const [userpassword] = await pool.promise().query(
    'SELECT password FROM salam_login WHERE username = ?', [username]
  )

  const passwordenter = req.body.password

  bcrypt.compare(passwordenter, userpassword[0].password, function (err, result) {
    req.session.username = username
    // req.session.login = false
    if (result) {
      req.session.login = true
      res.redirect('/minasidor')
      console.log(req.session.login)
    } else {
      res.json({ message: 'Fel lösenord' })
    }
  });




  // const  password = req.body.password

  //SELECT * FROM salam_login WHERE id = 1
})

router.get('/login', function (req, res) {
  res.render('login.njk', {
    title: 'Hej user',
    message: 'Välkommen',
    username: req.session.username
  })
})

router.get('/signup', function (req, res) {
  res.render('signup.njk', {
    title: 'Hej user',
    message: 'Välkommen',
    username: req.session.username
  })
})

router.get('/minasidor', function (req, res) {
  console.log(req.session)
  if (req.session.login) {
    res.render('minasidor.njk', {
      username: req.session.username,
      message: 'Välkommen'
    })
  } else {
    res.redirect('/login')
  }

})

router.get('/test', async function (req, res) {

  const [result] = await pool.promise().query(
    `SELECT * FROM salam_login `,
  )

  res.json(result)
})

module.exports = router
