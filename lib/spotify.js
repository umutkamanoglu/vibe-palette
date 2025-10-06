const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI

// Spotify API endpoint'leri
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
const AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"

// İstenen izinler (scopes)
export const SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-library-read",
  "user-library-modify"
].join(" ")

/**
 * Spotify login URL'ini oluşturur
 */
export function getAuthorizeUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    show_dialog: "true" // Her zaman onay ekranını göster
  })

  return `${AUTHORIZE_ENDPOINT}?${params.toString()}`
}

/**
 * Authorization code'u kullanarak access token alır
 */
export async function getAccessToken(code) {
  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  )

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Token alınamadı: ${error.error_description}`)
  }

  return response.json()
}

/**
 * Refresh token kullanarak yeni access token alır
 */
export async function refreshAccessToken(refreshToken) {
  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  )

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken
    })
  })

  if (!response.ok) {
    throw new Error("Token yenilenemedi")
  }

  return response.json()
}

/**
 * Spotify API'ye istek yapar
 */
export async function spotifyApi(endpoint, accessToken, options = {}) {
  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options.headers
    }
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || "API isteği başarısız")
  }

  return response.json()
}

/**
 * Token'ın süresinin dolup dolmadığını kontrol eder
 */
export function isTokenExpired(expiresAt) {
  return Date.now() >= expiresAt
}
