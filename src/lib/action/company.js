"use server"


const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL

const creatCompany=async(newcompany)=>{
    const res = await fetch(`${baseurl}/company`,{
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(newcompany)
    })
    return res.json()
}