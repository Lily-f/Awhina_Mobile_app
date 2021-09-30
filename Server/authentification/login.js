const Validator = require('validator')
const isEmpty = require('is-empty')

function validateLoginInput(data){
  let reason = null
  data.name = isEmpty(data.name) ? '' : data.name
  data.password  = isEmpty(data.password)? '' : data.password

  // Check username
  if(Validator.isEmpty(data.name)){
    reason = 'Name required!'
  }

  // Check password
  if(Validator.isEmpty(data.password)){
    reason = 'Password required!'
  }
  
  return{
    reason, isValid: reason === null
  }

}

module.exports = validateLoginInput