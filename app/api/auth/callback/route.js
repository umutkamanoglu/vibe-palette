import { NextResponse } from "next/server"
import { getAccessToken } from "@/lib/spotify"

export async function GET(request) {
  console.log("=== CALLBACK ROUTE BAŞLADI ===")

  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    console.error("❌ Spotify auth error:", error)
    // 127.0.0.1'e yönlendir
    return NextResponse.redirect(
      new URL(`http://127.0.0.1:3000/?error=${error}`)
    )
  }

  if (!code) {
    console.error("❌ No authorization code received")
    return NextResponse.redirect(
      new URL("http://127.0.0.1:3000/?error=no_code")
    )
  }

  console.log("✓ Authorization code alındı:", code.substring(0, 20) + "...")

  try {
    console.log("📡 Spotify'dan token alınıyor...")
    const tokenData = await getAccessToken(code)
    console.log("✓ Token başarıyla alındı")
    console.log(
      "  - Access token:",
      tokenData.access_token.substring(0, 20) + "..."
    )
    console.log("  - Refresh token var mı?", !!tokenData.refresh_token)
    console.log("  - Expires in:", tokenData.expires_in, "saniye")

    const expiresAt = Date.now() + tokenData.expires_in * 1000

    // Cookie ayarları - 127.0.0.1 için
    const cookieOptions = {
      httpOnly: true,
      secure: false, // Development'ta false
      sameSite: "lax",
      path: "/"
    }

    console.log("🔄 Redirect response oluşturuluyor...")
    // ÖNEMLİ: 127.0.0.1'e yönlendir
    const response = NextResponse.redirect(
      new URL("http://127.0.0.1:3000/dashboard")
    )

    console.log("💾 Cookie'ler response'a ekleniyor...")

    // Access Token
    response.cookies.set("spotify_access_token", tokenData.access_token, {
      ...cookieOptions,
      maxAge: tokenData.expires_in
    })
    console.log("✓ Access token eklendi")

    // Refresh Token
    if (tokenData.refresh_token) {
      response.cookies.set("spotify_refresh_token", tokenData.refresh_token, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 30 // 30 gün
      })
      console.log("✓ Refresh token eklendi")
    }

    // Expiration Time
    response.cookies.set("spotify_token_expires_at", expiresAt.toString(), {
      ...cookieOptions,
      maxAge: tokenData.expires_in
    })
    console.log("✓ Expiration time eklendi")

    console.log("✅ Tüm cookie'ler response'a eklendi")

    // Debug: Response headers'ı göster
    console.log("📋 Set-Cookie headers:")
    const setCookieHeaders = response.headers.getSetCookie()
    setCookieHeaders.forEach((header, index) => {
      console.log(`  ${index + 1}. ${header.substring(0, 100)}...`)
    })

    console.log(
      "🔄 http://127.0.0.1:3000/dashboard adresine yönlendiriliyor..."
    )
    console.log("=== CALLBACK ROUTE BİTTİ ===\n")

    return response
  } catch (error) {
    console.error("❌ Token alma hatası:", error)
    console.log("=== CALLBACK ROUTE HATA İLE BİTTİ ===\n")
    return NextResponse.redirect(
      new URL("http://127.0.0.1:3000/?error=token_error")
    )
  }
}
