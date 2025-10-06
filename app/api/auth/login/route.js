import { NextResponse } from "next/server";
import { getAuthorizeUrl } from "@/lib/spotify";

export async function GET() {
    const authorizeUrl = getAuthorizeUrl();
    return NextResponse.redirect(authorizeUrl);
}