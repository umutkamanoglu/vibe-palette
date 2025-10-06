import { NextResponse } from "next/server"

export function middleware(request) {
    const accessToken = request.cookies.get("spotify_access_token")
    const pathname = request.nextUrl.pathname

    // Auth endpoint'leri her zaman erişilebilir
    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next()
    }

    // Ana sayfa her zaman erişilebilir
    if (pathname === "/") {
        return NextResponse.next()
    }

    // Dashboard ve Spotify API endpoint'leri için auth kontrolü
    if (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/api/spotify")
    ) {
        if (!accessToken) {
            // Token yoksa ana sayfaya yönlendir
            if (pathname.startsWith("/dashboard")) {
                return NextResponse.redirect(new URL("/", request.url))
            }
            // API istekleri için 401 döndür
            return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
        }

        // Token süresi kontrolü
        const expiresAt = request.cookies.get("spotify_token_expires_at")?.value
        if (expiresAt && parseInt(expiresAt) < Date.now()) {
            // Token süresi dolmuş
            if (pathname.startsWith("/dashboard")) {
                return NextResponse.redirect(new URL("/", request.url))
            }
            return NextResponse.json(
                { error: "Token süresi dolmuş" },
                { status: 401 }
            )
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)"
    ]
}
