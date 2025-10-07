import { NextResponse } from "next/server"

export async function POST() {
    try {
        console.log("🔓 Logout işlemi başlıyor...")

        const response = NextResponse.json({ success: true })

        // Cookie'leri sil - 127.0.0.1 için
        const cookieOptions = {
            path: "/",
            maxAge: 0 // Hemen sil
        }

        response.cookies.set("spotify_access_token", "", cookieOptions)
        response.cookies.set("spotify_refresh_token", "", cookieOptions)
        response.cookies.set("spotify_token_expires_at", "", cookieOptions)

        console.log("✓ Cookie'ler silindi")
        return response
    } catch (error) {
        console.error("❌ Logout hatası:", error)
        return NextResponse.json({ error: "Çıkış yapılamadı" }, { status: 500 })
    }
}
