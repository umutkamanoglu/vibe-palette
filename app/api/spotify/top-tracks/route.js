import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SpotifyService } from "@/lib/spotify-service"

export async function GET(request) {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value

    if (!accessToken) {
        return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const timeRange = searchParams.get("time_range") || "medium_term"
    const limit = parseInt(searchParams.get("limit") || "20")

    try {
        const spotify = new SpotifyService(accessToken)
        const topTracks = await spotify.getTopTracks(timeRange, limit)
        return NextResponse.json(topTracks)
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "En çok dinlenen şarkılar alınamadı" },
            { status: 500 }
        )
    }
}
