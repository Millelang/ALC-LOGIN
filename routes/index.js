const express = require('express')
const router = express.Router()
const { body, matchedData, validationResult } = require('express-validator')
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

  bcrypt.hash(password, 10, async function (err, hash) {
    try {
      const [user] = await pool.promise().query('INSERT INTO `salam_login` ( `username`, `password`) VALUES( ?, ?)', [username, hash])
      res.redirect('/login')
    } catch (error) {
      console.log(error)
      res.status(402)
    }
  })



})

router.post('/login', async function (req, res) {

  const username = req.body.username

  const [user] = await pool.promise().query(
    'SELECT id, password FROM salam_login WHERE username = ?', [username]
  )


  req.session.userid = user[0].id
  const passwordenter = req.body.password

  bcrypt.compare(passwordenter, user[0].password, function (err, result) {
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

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});


router.get('/test', async function (req, res) {

  const [result] = await pool.promise().query(
    `SELECT * FROM salam_login `,
  )

  res.json(result)
})


router.get('/meows', async function (req, res) {
  const [result] = await pool.promise().query(
    `SELECT * FROM salam_meows `,
  )

  res.render('meows.njk', {
    meows: result
  
  })
})

router.get('/saymeow', async function (req, res) {
  if (req.session.login) {
    res.render('saymeow.njk', {

    })
  } else {
    res.redirect('/login')
  }

})

router.post('/saymeow', async function (req, res) {
  const text = req.body.textarea
  const id = req.session.userid

  const [result] = await pool.promise().query(
    `INSERT INTO salam_meows (content, user_id) VALUES (?, ?)`, [text, id]
  )


  res.redirect('/meows')
})

module.exports = router
