import { serverFetch } from "../core/server"


export const getApplicationById= async(applicantId)=>{
    return serverFetch(`/applications?applicantId=${applicantId}`)
}