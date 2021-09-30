// Datastructure for mentoring session requests held in the database
export interface MentoringSessionRequestModel {
    eventName: string,
    student: string,
    description: string,
    time: string,
    _id: string
}