import { protectedFetch } from "../core/server"


export const getApplicationById= async(applicantId)=>{
    return protectedFetch(`/applications?applicantId=${applicantId}`)
}