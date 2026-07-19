import { protectedFetch, serverFetch } from "../core/server"
import { userSession } from "../core/session"
import { getDb } from "../db"

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

export const getApprovedCompanies=async()=>{
    try {
        const db = await getDb()
        const companies = await db.collection("companies").find({ status: "Approve" }).toArray()
        return companies.map(c => ({
            ...c,
            _id: String(c._id)
        }))
    } catch (e) {
        console.error("getApprovedCompanies error:", e)
        return []
    }
}