import { serverMutetion } from "../core/server"


export const creatApplication =(application)=>{
    return serverMutetion('/applications',application)
}