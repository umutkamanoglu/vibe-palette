import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SpotifyService } from "@/lib/spotify-service"

export async function GET() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value

    if (!accessToken) {
        return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    try {
        const spotify = new SpotifyService(accessToken)
        const currentlyPlaying = await spotify.getCurrentlyPlaying()

        if (!currentlyPlaying) {
            return NextResponse.json({ is_playing: false, item: null })
        }

        return NextResponse.json(currentlyPlaying)
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Şu an çalan şarkı alınamadı" },
            { status: 500 }
        )
    }
}
