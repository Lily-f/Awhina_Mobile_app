import { UserContext } from '../App';
import { useState, useContext } from 'react';
import axios from 'axios'

export function RegisterHooks(){
  const user = useContext(UserContext)
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isStaff, setIsStaff] = useState(false)
  const [isMentor, setIsMentor] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [showToastSuccess, setShowToastSuccess] = useState(false)
  const [showToastFailure, setShowToastFailure] = useState(false)
  const [failureToastReason, setFailureToastReason] = useState<string>('')
  const TESTING = false

  function handleRegister(){
    if(TESTING){
      setShowToastSuccess(true)
    }else{
      axios({
        method: 'post',
        url: '/register',
        baseURL: 'http://localhost:7765/api/users',
        data: {
          name: userName,
          password: password,
          passwordConfirm: confirmPassword,
          isStaff: isStaff,
          isMentor: isMentor
        }
      }).then((res) => {
        setShowToastSuccess(true)
      }).catch((error) => {
        setFailureToastReason(error.response.data.reason)
        setShowToastFailure(true)
      })
    }
  }

  return{userName, password, confirmPassword, showToastSuccess, showToastFailure, failureToastReason, setShowToastFailure, setShowToastSuccess, handleRegister, setUserName, setPassword, setConfirmPassword, setIsMentor, setIsStaff, user}
}