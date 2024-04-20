import { Role } from "../role";

export interface User {
    id : number,
    name : string,
    lastname : string,
    username : string,
    email : string,
    jobTitle : string,
    organisation : string,
    department : string,
    profilePicturePath: string,
    isActivated: boolean,
    role : Role
}
