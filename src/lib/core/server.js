

const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL

export const serverFetch =async(path)=>{
    const res = await fetch(`${baseurl}${path}`)
    return res.json()
}

export const serverMutetion=async(path,data)=>{
    const res = await fetch(`${baseurl}${path}`,{
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(data)
    })
    return res.json()
}