// Datastructure for workshops
export interface WorkshopModel {
    name: string
    date: Date
    location: string
    description: string
    duration: number
    participants: number
    seatsLeft: number
    userAttending: boolean
    createdDate: number
}