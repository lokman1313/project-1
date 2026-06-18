"use server"

import { revalidatePath } from "next/cache"
import { serverMutetion } from "../core/server"


 export const creatCompany=async(newcompany)=>{
    return serverMutetion("/company",newcompany)
 }
 
export const updateStatus=async(id,data)=>{
   const result = await serverMutetion(`/company/${id}`,data,"PATCH")
   revalidatePath("/dashbord/admin/companies")
   return result
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