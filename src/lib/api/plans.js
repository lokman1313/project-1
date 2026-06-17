import { serverFetch } from "../core/server"

export const getPlansId=async(planId)=>{
    return serverFetch(`/plans?plan_id=${planId}`)
}