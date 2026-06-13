const baseurl = process.env.BACKEND_URL

export const getCompanyJobs=async(companyId , status = "active")=>{
    const res = await fetch(`${baseurl}/jobs?companyId = ${companyId}& status =${status}`)
    return res.json()
}