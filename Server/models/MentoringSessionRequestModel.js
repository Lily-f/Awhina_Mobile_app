const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mentoringSessionRequestSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    student: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }    
})

const MentoringSessionRequest = mongoose.model('mentoring_session_requests', mentoringSessionRequestSchema)
module.exports = MentoringSessionRequest