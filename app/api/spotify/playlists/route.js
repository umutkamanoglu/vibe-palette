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
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = parseInt(searchParams.get("offset") || "0")

    try {
        const spotify = new SpotifyService(accessToken)
        const playlists = await spotify.getUserPlaylists(limit, offset)
        return NextResponse.json(playlists)
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Playlistler alınamadı" },
            { status: 500 }
        )
    }
}

// Yeni playlist oluştur
export async function POST(request) {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("spotify_access_token")?.value

    if (!accessToken) {
        return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { userId, name, description, isPublic } = body

        if (!userId || !name) {
            return NextResponse.json(
                { error: "userId ve name gerekli" },
                { status: 400 }
            )
        }

        const spotify = new SpotifyService(accessToken)
        const playlist = await spotify.createPlaylist(
            userId,
            name,
            description,
            isPublic
        )

        return NextResponse.json(playlist, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Playlist oluşturulamadı" },
            { status: 500 }
        )
    }
}
