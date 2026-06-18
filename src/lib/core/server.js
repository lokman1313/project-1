import { redirect } from "next/navigation"
import { getToken } from "./session"

export const authHeader=async()=>{
    const token = await getToken()
    const header = token ? {
        authorization : `Bearer ${token}`
    } : {}
    return header
}

const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL

export const serverFetch =async(path)=>{
    const res = await fetch(`${baseurl}${path}`)
    return res.json()
}
export const protectedFetch =async(path)=>{
    const res = await fetch(`${baseurl}${path}`,
        {
            headers : await authHeader()
        }
    )
    return handelStatus(res)
}

export const serverMutetion=async(path,data,method="POST")=>{
    const res = await fetch(`${baseurl}${path}`,{
        method : method,
        headers : {
            "Content-Type": "application/json",
            ...await authHeader()
        },
        body : JSON.stringify(data)
    })

    return handelStatus(res)
}

const handelStatus=(res)=>{
    if(res.status === 401){
        redirect("/unauthorize")
    }
    if(res.status === 403){
        redirect("/unauthorize")
    }
    return res.json()
}