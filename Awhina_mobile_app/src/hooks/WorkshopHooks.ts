import { WorkshopModel } from '../models/WorkshopModel';
import { UserContext } from '../App';
import { useState, useContext, useEffect } from 'react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'

export function WorkshopHooks() {
  const user = useContext(UserContext)
  const [eventName, setEventName] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [duration, setDuration] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [maxParticipants, setMaxParticipants] = useState<string>("")
  const [showToastSuccess, setShowToastSuccess] = useState(false)
  const [showToastFailure, setShowToastFailure] = useState(false)
  const [failureToastReason, setFailureToastReason] = useState<string>("")
  const [showActionSheet, setShowActionSheet] = useState(false)

  // verify that event to create is valid and add to collection
  function handleEventCreate(){
    const { reason, workshop } = verifyWorkshopCreation()
    if(reason === ''){
      user.setWorkshops(user.workshops.concat([workshop]))
      setShowToastSuccess(true)
    }else{
      setShowToastFailure(true)
      setFailureToastReason(reason)
    }
  }

  function sortNewest(){
    user.setWorkshops(user.workshops.sort((a, b) => a.createdDate - b.createdDate))
  }

  function sortUpcoming(){
    user.setWorkshops(user.workshops.sort((a, b) => a.date.getTime() - b.date.getTime()))
  }

  function sortDuration(){
    user.setWorkshops(user.workshops.sort((a, b) => a.duration - b.duration))
  }

  function sortSeatsLeft(){
    user.workshops.sort((a, b) => a.seatsLeft - b.seatsLeft)
  }

  async function createQrCode(data: string) {
    BarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, data)
  }

  function verifyWorkshopCreation(){
    let reason = ''
    
    if(eventName == null || eventName === ''){
      reason = "Must have event name!"
    }

    if(location == null || location === ''){
      reason = "Must have location!"
    }

    if(time == null || time === '' || isNaN(Date.parse(time))){
      reason = "Must have time!"
    }

    if(duration == null || duration === '' || parseInt(duration) < 0 || isNaN(parseInt(duration)) ){
      reason = "Must have duration!"
    }

    if(description == null || description === ''){
      reason = "Must have description!"
    }

    if(maxParticipants == null || maxParticipants === '' || parseInt(maxParticipants) < 0 || isNaN(parseInt(maxParticipants)) ){
      reason = "Must have maximum number of participants!"
    }

    let workshop: WorkshopModel = {
      name: eventName, date: new Date(time), duration: parseInt(duration), location, description, userAttending: false, 
      seatsLeft: parseInt(maxParticipants), participants: 0, createdDate: Date.now()
    }
    return {reason, workshop}
  }

  return {
    setLocation, setMaxParticipants, createQrCode, setDuration, setEventName, setTime, setDescription, handleEventCreate, user, 
    setShowToastFailure, setShowToastSuccess, showToastFailure, setShowActionSheet, showActionSheet, showToastSuccess, failureToastReason, 
    sortNewest, sortUpcoming, sortDuration, sortSeatsLeft
  }
}