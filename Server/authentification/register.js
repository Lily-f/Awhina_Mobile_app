const Validator = require('validator')
const isEmpty = require('is-empty')

function validateRegisterInput(data){
  let reason = null
  data.name = isEmpty(data.name) ? '' : data.name
  data.isMentor = isEmpty(data.isMentor) ? false : data.isMentor
  data.isStaff = isEmpty(data.isStaff) ? false : data.isStaff
  data.password  = isEmpty(data.password)? '' : data.password
  data.passwordConfirm = isEmpty(data.passwordConfirm)? '' : data.passwordConfirm

  // Check username
  if(Validator.isEmpty(data.name)){
    reason = 'Name required!'
  }

  // Check password and password confirmation
  if(Validator.isEmpty(data.password)){
    reason = 'Password required!'
  }
  if(Validator.isEmpty(data.passwordConfirm)){
    reason = 'Confirm password required!'
  }
  if(!Validator.isLength(data.password, {min: 6, max: 30})){
    reason = 'Password must be 6 or more characters!'
  }
  if(!Validator.equals(data.password, data.passwordConfirm)){
    reason = 'Passwords must match!'
  }

  return{
    reason, isValid: reason === null
  }

}

module.exports = validateRegisterInput