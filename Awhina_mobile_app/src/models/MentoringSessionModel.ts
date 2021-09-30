// Datastructure for mentoring sessions held in the database
export interface MentoringSessionModel {
    eventName: string
    student: string
    mentor: string
    description: string
    time: string
    location: string
    attended: boolean
    _id: string
}