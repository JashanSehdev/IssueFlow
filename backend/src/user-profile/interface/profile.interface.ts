import { UserResponse } from "../../users/interfaces/user.interface.js"
import { UserProfile } from "../entities/user-profile.entity.js"


export interface BaseUser {
    userId : number,
    email : string,
    username : string,
    avatar : string
}
export interface Profile extends UserResponse{
    id : number,
    userId : number
    lastName: string,
    firstName : string,
    age : number
}