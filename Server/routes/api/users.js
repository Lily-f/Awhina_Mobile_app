const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

// Load input validation
const validateLoginInput = require('../../authentification/login')
const validateRegisterInput = require('../../authentification/register')

const User = require('../../models/UserModel')

// Register form posts
router.post('/register', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  
  // Check input is valid
  const {reason, isValid} = validateRegisterInput(req.body)
  if(!isValid){
    return res.status(400).json({reason}).send()
  }
  const name = req.body.name

  // Check user with that name doesn't already exist
  User.findOne({name}).then(user => {
    if(user){
      return res.status(400).json({ reason:'Name already exists'}).send()
    } else {
      const newUser = new User({
        name,
        password: req.body.password,
        isStaff: req.body.isStaff,
        isMentor: req.body.isMentor
      })
      
      // Hash the password before storage
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err
          newUser.password = hash
          newUser.save()
            .then(user => res.status(200).json(user).send())
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// Login form posts
router.post('/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')

  // Check validation of inputs
  const {reason, isValid} = validateLoginInput(req.body)
  if(!isValid){
    return res.status(400).json({reason}).send()
  }
  const name = req.body.name
  const password = req.body.password

  // Find the user from the database
  User.findOne({name}).then(user => {
    if(!user){
      return res.status(400).json({reason: 'Name not found'}).send()
    }

    // Check password
    bcrypt.compare(password, user.password, (err, bResult) => {
      if(err) console.log(err)
      else if(bResult){
        const payload = {
          id: user.id,
          name: user.name
        }
        jwt.sign(
          payload,
          keys.secretOrKey,
          {expiresIn: 15778476}, //6 months (seconds)
          (err, token) => {
            res.status(200).json({
              token: "Bearer " + token,
              isMentor: user.isMentor,
              isStaff: user.isStaff
            }).send()
          }
        )
      } else {
        return res.status(400).json({reason: 'Password incorrect'}).send()
      }
    })
  })
})


module.exports = router