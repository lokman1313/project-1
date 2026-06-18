"use server"
import { headers } from "next/headers";
import { auth } from "../auth";


export const updateUserRole=async()=>{
    const data = await auth.api.setRole({
    body: {
        userId: "user-id",
        role: "admin", // required
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
return data
}