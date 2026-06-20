import { serverFetch } from "../core/server"

const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL

export const getCompanyJobs=async(companyId , status = "active")=>{
    console.log(companyId)
    const res = await fetch(`${baseurl}/jobs?companyId=${companyId}&status=${status}`)
    return res.json()
}

export const getJobs=async(query)=>{
    return serverFetch(`/all/jobs?${query}`)
}

export const getJobById=async(id)=>{
    return serverFetch(`/all/jobs/${id}`)
}