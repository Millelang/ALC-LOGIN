const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = require('../db.js')

router.get('/', function (req, res) {
  res.render('index.njk', { 
    title: 'Hej user',
    message: 'Välkommen'
  })
})

router.get('/hashTest', async function (req, res) {
  bcrypt.hash('gligon123', 10, function(err, hash) {
    console.log(hash)
    return res.json(hash);
  })
})


router.post('/login', async function (req, res) {

  const username = req.body.username

  const [userpassword] = await pool.promise().query(
    'SELECT password FROM salam_login WHERE username = ?', [username]
  )

  const passwordenter = req.body.password
 
    bcrypt.compare(passwordenter, userpassword[0].password, function(err, result) {
      if(result){
        res.json({message: 'Du är inloggad'})
      } else {
        res.json({message: 'Fel lösenord'})
      }
    });


  

  // const  password = req.body.password

//SELECT * FROM salam_login WHERE id = 1
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
