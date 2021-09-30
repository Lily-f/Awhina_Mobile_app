import { MentoringSessionModel } from './../models/MentoringSessionModel';
import { UserContext } from '../App';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { MentoringSessionRequestModel } from '../models/MentoringSessionRequestModel'
export function RequestMentoringSessionHooks() {

  const user = useContext(UserContext)
  const [eventName, setEventName] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [mentor, setMentor] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [showToastSuccess, setShowToastSuccess] = useState(false)
  const [showToastFailure, setShowToastFailure] = useState(false)
  const [failureToastReason, setFailureToastReason] = useState<string>("")
  const [mentoringSessionRequests, setMentoringSessionRequests] = useState<MentoringSessionRequestModel[]>([])
  const [mentoringSessions, setMentoringSessions] = useState<MentoringSessionModel[]>([])
  const [isFilteringStudent1, setIsFilteringStudent1] = useState<boolean>(false)

  useEffect(() => {
    retrieveMentoringSessionRequests()
    retrieveMentoringSessions()
  }, [])

  // Send mentoring session request to database via HTTP request
  function handleEventCreate(){
    axios({
      method: 'post',
      url: '/request_mentoring_session',
      baseURL: 'http://localhost:7765/api/mentoring_sessions',
      headers: {'Access-Control-Allow-Origin': '*'},
      data: {
        eventName: eventName,
        time: time,
        description: description,
        student: user.userName
      }
    }).then((res) => {
      setShowToastSuccess(true)
    }).catch((error) => {
      setFailureToastReason(error.response.data.reason)
      setShowToastFailure(true)
    })
  }

  // Retrieve mentoring session requests from the database
  function retrieveMentoringSessionRequests(){
    // If user is not staff then do not request from the database
    if (!user.isStaff) return

    axios({
      method: 'get',
      url: `/get_all_requests`,
      baseURL: 'http://localhost:7765/api/mentoring_sessions',
      headers: {'Access-Control-Allow-Origin': '*'},
    }).then((res) => {
      let sessionRequests: MentoringSessionRequestModel[] = []
      res.data.requests.forEach((request: MentoringSessionRequestModel) => {
        sessionRequests.push(request)
      });
      setMentoringSessionRequests(sessionRequests)

    }).catch((error) => {
      alert(`Couldn't load data`)
    })
  }

  // Retrieve mentoring sessions from the database
  function retrieveMentoringSessions(){

    // remove filtering
    setIsFilteringStudent1(false)

    axios({
      method: 'get',
      url: `/get_all_sessions`,
      baseURL: 'http://localhost:7765/api/mentoring_sessions',
      headers: {'Access-Control-Allow-Origin': '*'},
    }).then((res) => {
      let sessions: MentoringSessionModel[] = []
      res.data.sessions.forEach((session: MentoringSessionModel) => {
        sessions.push(session)
      });
      setMentoringSessions(sessions)

    }).catch((error) => {
      alert(`Couldn't load data`)
    })
  }

  function accecptMentoringSessionRequest(){
    // If user is not staff then do not update the database
    if (!user.isStaff) return

    axios({
      method: 'post',
      url: `/accept_mentoring_session`,
      baseURL: 'http://localhost:7765/api/mentoring_sessions',
      headers: {'Access-Control-Allow-Origin': '*'},
      data: {
        id: user.mentoringSessionRequest._id,
        eventName,
        student: user.mentoringSessionRequest.student,
        mentor,
        description,
        time,
        location
      }
    }).then((res) => {
      setShowToastSuccess(true)
    }).catch((error) => {
      setFailureToastReason(error.response.data.reason)
      setShowToastFailure(true)
    })
  }

  function filterStudent1(){
    setIsFilteringStudent1(true)
    setMentoringSessions(mentoringSessions.filter(session => session.student === 'teststudent1'))
  }

  return {setEventName, setTime, setDescription, setMentor, setLocation, handleEventCreate, user, showToastSuccess, showToastFailure, setShowToastSuccess, setShowToastFailure, failureToastReason, mentoringSessionRequests, mentoringSessions, accecptMentoringSessionRequest, retrieveMentoringSessions, filterStudent1, isFilteringStudent1}
}