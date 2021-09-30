const express = require('express')
const router = express.Router()
const Validator = require('validator')
const isEmpty = require('is-empty')

const MentoringSessionRequest = require('../../models/MentoringSessionRequestModel')
const MentoringSession = require('../../models/MentoringSessionModel')
const User = require('../../models/UserModel')

// Handle new requests for mentoring sessions
router.post('/request_mentoring_session', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')

    // check the input is valid
    const {reason, isValid, student, eventName, time, description} = validateRequestCreationInputs(req.body)
    if(!isValid){
        return res.status(400).json({reason}).send()
    }

    // Check student has account in database
    User.findOne({name: student}).then(user => {
        if(user){
            // Store the request in the database
            new MentoringSessionRequest({
                eventName,
                student,
                description,
                time
            })
            .save()
            .then((session) => {return res.status(200).json("success").send()})
            .catch(err => console.log(err))
        } else {
            return res.status(400).json({ reason:"Student doesn't have account"}).send()
        }
    })
})

// Retrieve all mentoring session requests
router.get('/get_all_requests', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')

    // Access mongodb for data, retrieve all entries
    MentoringSessionRequest.find().then( requests => {
        return res.status(200).json({requests}).send()
    }).catch(err => console.log(err))
})

// Accept a mentoring session request by removing request and creating session document
router.post('/accept_mentoring_session', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')

    // validate inputs
    const {reason, isValid, id, eventName, student, mentor, description, time, location} = validateSessionCreationInputs(req.body)
    if(!isValid){
        return res.status(400).json({reason}).send()
    }

    // Delete the mentoring session request and create mentoring session
    MentoringSessionRequest.findByIdAndDelete(id, (err, request) => {
        if(err){
            return res.status(400).json({ reason: "Mentoring session request not in database!" }).send()
        }else{
            // create mentoring session
            new MentoringSession({
                eventName,
                student,
                mentor,
                description,
                time,
                location
            })
            .save()
            .then(() => {return res.status(200).send()})
            .catch(err => console.log(err))
        }
    })
})

// Mark a students attendance
router.post('/mark_attendance', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')

    //TODO: add seperate function to determine if the mark is for a mentoring session
})

// Retrieve all mentoring sessions
router.get('/get_all_sessions', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')

    // Access mongodb for data, retrieve all entries
    MentoringSession.find().then( sessions => {
        return res.status(200).json({sessions}).send()
    }).catch(err => console.log(err))
})

// Validate that the required inputs for mentoring session requests are correct
function validateRequestCreationInputs(data){
    let reason = null

    // Ensure that no variables are null
    let student = isEmpty(data.student) ? '' : data.student
    let eventName  = isEmpty(data.eventName)? '' : data.eventName
    let time = isEmpty(data.time)? '' : data.time
    let description = isEmpty(data.description)? '' : data.description

    // Check inputs are valid. Store reason if invalid
    if(Validator.isEmpty(student)){
    reason = 'Student username required!'
    }
    if(Validator.isEmpty(eventName)){
        reason = 'Event name required!'
    }
    if(Validator.isEmpty(time)){
        reason = 'Available days / time required!'
    }
    if(Validator.isEmpty(description)){
        reason = 'Description / Topic / Course required!'
    }
    
    return{
        reason, isValid: reason === null, student, eventName, time, description
    }
}

// Validate inputs for confirming a mentoring session request
function validateSessionCreationInputs(data){
    let reason = null

    // Ensure that no variables are null
    let id = isEmpty(data.id) ? '' : data.id
    let eventName = isEmpty(data.eventName) ? '' : data.eventName
    let student = isEmpty(data.student) ? '' : data.student
    let mentor = isEmpty(data.mentor) ? '' : data.mentor
    let description = isEmpty(data.description) ? '' : data.description
    let time = isEmpty(data.time) ? '' : data.time
    let location = isEmpty(data.location) ? '' : data.location

    // Check inputs are valid. Store reason if invalid
    if(Validator.isEmpty(id)){
        reason = 'Request ID required!'
    }
    if(Validator.isEmpty(eventName)){
        reason = 'Event name required!'
    }
    if(Validator.isEmpty(student)){
        reason = 'Student user name required!'
    }

    // Check the mentor is in the database
    if(Validator.isEmpty(mentor)){
        reason = 'Mentor required!'
    }
    User.findOne({name: mentor, isMentor: true}, (err, person) => {
        if(err){
            reason = 'Mentor field requires a mentor stored within the database!'
        }
    })
    
    if(Validator.isEmpty(description)){
        reason = 'description required!'
    }
    if(Validator.isEmpty(time)){
        reason = 'Time required!'
    }
    if(Validator.isEmpty(location)){
        reason = 'Location required!'
    }

    return{
        reason, isValid: reason === null, id, eventName, student, mentor, description, time, location
    }
}

module.exports = router