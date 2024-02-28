import query from "@/utilities/query"
import { NextResponse } from "next/server"

export  async function POST(request: Request){
    const data = await request.json()
    const {username, password} = data
    const res = await query(`SELECT username, user_id, profilePicture, fullname, password FROM  AUTH_USER WHERE username = '${username}' AND password = '${password}' LIMIT 1;`)
    if(res.rows.length == 0){
        return NextResponse.json({message:"Pengguna tidak ditemukan"},{status:500, statusText:"Pengguna tidak ditemukan"})
    }
    return NextResponse.json({message:"Berhasil mengautentikasi pengguna", userData: res.rows[0]},{status:200})
}