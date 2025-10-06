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
    const query = searchParams.get("q")
    const type = searchParams.get("type") || "track"
    const limit = parseInt(searchParams.get("limit") || "20")

    if (!query) {
        return NextResponse.json(
            { error: "Arama sorgusu gerekli" },
            { status: 400 }
        )
    }

    try {
        const spotify = new SpotifyService(accessToken)

        let results
        if (type === "track") {
            results = await spotify.searchTracks(query, limit)
        } else if (type === "artist") {
            results = await spotify.searchArtists(query, limit)
        } else {
            return NextResponse.json(
                { error: "Geçersiz arama tipi" },
                { status: 400 }
            )
        }

        return NextResponse.json(results)
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Arama yapılamadı" },
            { status: 500 }
        )
    }
}
