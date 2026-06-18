"use server"
import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation";



export const userSession=async()=>{
    const session = await auth.api.getSession({
        headers: await headers() })

return session?.user || null ;
}

export const getToken=async()=>{
    const session = await auth.api.getSession({
        headers: await headers() })
    return session?.session?.token || null
}

export const requerRole =async(role)=>{
    const user =await userSession()
    if(user.role !== role){
        redirect("/unauthorize")
    }
    if(!user){
        redirect("/signin")
    }
}