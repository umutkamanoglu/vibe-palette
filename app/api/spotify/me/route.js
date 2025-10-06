import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SpotifyService } from "@/lib/spotify-service"

export async function GET() {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value

    if (!accessToken) {
        return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    try {
        const spotify = new SpotifyService(accessToken)
        const user = await spotify.getCurrentUser()
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Kullanıcı bilgileri alınamadı" },
            { status: 500 }
        )
    }
}
