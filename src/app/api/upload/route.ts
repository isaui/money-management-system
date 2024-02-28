import { blobToBase64 } from "@/utilities/blobToBase64";
import { NextResponse } from "next/server";

export  async function POST(request: Request){
    const formData = await request.formData();
    const blob: any = formData.get("image");
    const base64Str = await blobToBase64(blob);
    return NextResponse.json({message: "sukses mendapatkan base64Str", base64:base64Str})
}