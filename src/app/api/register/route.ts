import generateTimestampISO8601WIB from "@/utilities/generateTimestamp"
import query from "@/utilities/query"
import { NextResponse } from "next/server"

export  async function POST(request: Request){
    const data = await request.json()
    const {username, fullname, password, passwordConfirmation, profilePicture} = data
    if(password != passwordConfirmation){
        NextResponse.json({message:"Password dan Konfirmasi Password tidak sama."},{status:401, statusText:"Password dan Konfirmasi Password tidak sama."})
    }
    const res = await query(`
    DO $$
    DECLARE
    ref_user_id BIGINT;
    BEGIN
    INSERT INTO AUTH_USER (username, profilePicture, fullname, password)
    VALUES ('${username}', '${profilePicture}','${fullname}', '${password}')
    RETURNING user_id INTO ref_user_id;
    INSERT INTO BALANCE (user_id, transaction_time)
    VALUES (ref_user_id, '${generateTimestampISO8601WIB()}');
    END $$;
    `)
    return NextResponse.json({message:"Berhasil membuat Akun"},{status:200})
}