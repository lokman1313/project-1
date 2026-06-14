"use server"

import { redirect } from "next/navigation";

const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL

export const creatJobs =async(jobData)=>{
    const res = fetch(`${baseurl}/jobs`,{
        method : "POST" ,
        headers : { 
            "Content-Type": "application/json"
        },
        body : JSON.stringify(jobData)
    })
    if(res){
        redirect("/dashbord/reqruiter/jobs");
    }

}