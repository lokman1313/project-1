"use server"

import { serverMutetion } from "../core/server"


 export const creatSubscription=async(subInfo)=>{
    return serverMutetion("/subscription",subInfo)
 }
 