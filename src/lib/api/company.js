import { protectedFetch, serverFetch } from "../core/server"
import { userSession } from "../core/session"

export const companyDataFetch =async(userId)=>{
return serverFetch(`/my/company?userId=${userId}`)
}

export const getLoggedInReqruiter=async()=>{
    const user = await userSession()

    return companyDataFetch(user?.id)
}

export const getAllCompanies=async()=>{
    return protectedFetch("/company")
}