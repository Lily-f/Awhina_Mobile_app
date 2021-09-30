const express = require('express')
const router = express.Router()
const Validator = require('validator')
const isEmpty = require('is-empty')

router.post('/addEvent', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')

  const {reason, isValid} = validateEventInput(req.body)
  if(!isValid){
    return res.status(400).json({reason})
  }
  let date = req.body.date
  let location = req.body.location
  let description = req.body.description
  let creator = req.body.creator
  
  //TODO: Add the event to the database
})

function validateEventInput(data){
  let reason = null
  data.date = isEmpty(data.date) ? '' : data.date
  data.creator = isEmpty(data.creator) ? '' : data.creator
  data.description = isEmpty(data.description) ? '' : data.description
  data.location = isEmpty(data.location) ? '' : data.description

  if(Validator.isEmpty(data.creator)){
    reason = 'Failure Obtaining Creator!'
  }
  if(Validator.isEmpty(data.location)){
    reason = 'Location required!'
  }
  if(Validator.isEmpty(data.description)){
    reason = 'Description required!'
  }
  if(Validator.isEmpty(data.date)){
    reason = 'Date required!'
  }
  
  return{
    reason, isValid: reason === null
  }
}

module.exports = router