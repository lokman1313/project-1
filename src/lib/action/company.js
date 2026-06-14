"use server"

import { serverMutetion } from "../core/server"


 export const creatCompany=async(newcompany)=>{
    return serverMutetion("/company",newcompany)
 }
 
// export const creatCompany=async(newcompany)=>{
//     const res = await fetch(`${baseurl}/company`,{
//         method : "POST",
//         headers : {
//             "Content-Type": "application/json"
//         },
//         body : JSON.stringify(newcompany)
//     })
//     return res.json()
// }