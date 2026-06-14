"use server"

import { serverMutetion } from "../core/server"


export const creatJobs =async(jobData)=>{
    return serverMutetion("/jobs",jobData)
}

// const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL

// export const creatJobs =async(jobData)=>{
//     const res = fetch(`${baseurl}/jobs`,{
//         method : "POST" ,
//         headers : { 
//             "Content-Type": "application/json"
//         },
//         body : JSON.stringify(jobData)
//     })
   

// }