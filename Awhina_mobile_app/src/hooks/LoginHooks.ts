import { UserContext } from '../App';
import { useState, useContext } from 'react';
import axios from 'axios'

export function LoginHooks(){

  const user = useContext(UserContext)
  const [password, setPassword] = useState<string>('')
  const [showToastSuccess, setShowToastSuccess] = useState(false)
  const [showToastFailure, setShowToastFailure] = useState(false)
  const [failureToastReason, setFailureToastReason] = useState<string>('')
  const TESTING = false
  const TESTING_STAFF = false
  const TESTING_MENTOR = false

  function handleLogin(){

    // If testing set user context to tested user type. Else post login info to server
    if (TESTING){
      setShowToastSuccess(true)
      if(TESTING_STAFF) user.setIsStaff(true)
      if(TESTING_MENTOR) user.setIsMentor(true)
    }else{
      axios({
        method: 'post',
        url: '/login',
        baseURL: 'http://localhost:7765/api/users',
        headers: {'Access-Control-Allow-Origin': '*'},
        data: {
          name: user.userName,
          password: password
        }
      }).then((res) => {
        //TODO: Handle Bearer Token
        user.setIsStaff(res.data.isStaff)
        user.setIsMentor(res.data.isMentor)
        setShowToastSuccess(true)
        
      }).catch((error) => {
        setFailureToastReason(error.response.data.reason)
        setShowToastFailure(true)
      })
    }
  }

  return {password, showToastSuccess, showToastFailure, setShowToastSuccess, setShowToastFailure, setPassword, failureToastReason, handleLogin, user}

}