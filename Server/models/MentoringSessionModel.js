const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mentoringSessionSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    student: {
        type: String,
        required: true
    },
    mentor: {
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
    },
    location: {
        type: String,
        required: true
    },
    attended: {
        type: Boolean,
        required: false,
        default: false
    }
})

const MentoringSession = mongoose.model('mentoring_sessions', mentoringSessionSchema)
module.exports = MentoringSession