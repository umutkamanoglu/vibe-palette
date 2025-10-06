import { spotifyApi } from "./spotify"

export class SpotifyService {
    constructor(accessToken) {
        this.accessToken = accessToken
    }

    /**
     * Kullanıcı profil bilgilerini getirir
     */
    async getCurrentUser() {
        return spotifyApi("/me", this.accessToken)
    }

    /**
     * Şu an çalan şarkıyı getirir
     */
    async getCurrentlyPlaying() {
        try {
            return await spotifyApi("/me/player/currently-playing", this.accessToken)
        } catch (error) {
            // Hiçbir şey çalmıyorsa 204 döner
            return null
        }
    }

    /**
     * Kullanıcının en çok dinlediği şarkıları getirir
     */
    async getTopTracks(timeRange = "medium_term", limit = 20) {
        return spotifyApi(
            `/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
            this.accessToken
        )
    }

    /**
     * Kullanıcının en çok dinlediği sanatçıları getirir
     */
    async getTopArtists(timeRange = "medium_term", limit = 20) {
        return spotifyApi(
            `/me/top/artists?time_range=${timeRange}&limit=${limit}`,
            this.accessToken
        )
    }

    /**
     * Kullanıcının playlistlerini getirir
     */
    async getUserPlaylists(limit = 20, offset = 0) {
        return spotifyApi(
            `/me/playlists?limit=${limit}&offset=${offset}`,
            this.accessToken
        )
    }

    /**
     * Belirli bir playlist'i getirir
     */
    async getPlaylist(playlistId) {
        return spotifyApi(`/playlists/${playlistId}`, this.accessToken)
    }

    /**
     * Playlist'e şarkı ekler
     */
    async addTracksToPlaylist(playlistId, trackUris) {
        return spotifyApi(`/playlists/${playlistId}/tracks`, this.accessToken, {
            method: "POST",
            body: JSON.stringify({ uris: trackUris })
        })
    }

    /**
     * Yeni playlist oluşturur
     */
    async createPlaylist(userId, name, description = "", isPublic = true) {
        return spotifyApi(`/users/${userId}/playlists`, this.accessToken, {
            method: "POST",
            body: JSON.stringify({
                name,
                description,
                public: isPublic
            })
        })
    }

    /**
     * Şarkı arar
     */
    async searchTracks(query, limit = 20) {
        const encodedQuery = encodeURIComponent(query)
        return spotifyApi(
            `/search?q=${encodedQuery}&type=track&limit=${limit}`,
            this.accessToken
        )
    }

    /**
     * Sanatçı arar
     */
    async searchArtists(query, limit = 20) {
        const encodedQuery = encodeURIComponent(query)
        return spotifyApi(
            `/search?q=${encodedQuery}&type=artist&limit=${limit}`,
            this.accessToken
        )
    }

    /**
     * Şarkı çalmaya başlar
     */
    async play(deviceId, trackUri) {
        const body = {}
        if (trackUri) {
            body.uris = [trackUri]
        }

        const endpoint = deviceId
            ? `/me/player/play?device_id=${deviceId}`
            : "/me/player/play"

        await spotifyApi(endpoint, this.accessToken, {
            method: "PUT",
            body: JSON.stringify(body)
        })
    }

    /**
     * Şarkıyı duraklat
     */
    async pause(deviceId) {
        const endpoint = deviceId
            ? `/me/player/pause?device_id=${deviceId}`
            : "/me/player/pause"

        await spotifyApi(endpoint, this.accessToken, {
            method: "PUT"
        })
    }

    /**
     * Sonraki şarkıya geç
     */
    async skipToNext(deviceId) {
        const endpoint = deviceId
            ? `/me/player/next?device_id=${deviceId}`
            : "/me/player/next"

        await spotifyApi(endpoint, this.accessToken, {
            method: "POST"
        })
    }

    /**
     * Önceki şarkıya geç
     */
    async skipToPrevious(deviceId) {
        const endpoint = deviceId
            ? `/me/player/previous?device_id=${deviceId}`
            : "/me/player/previous"

        await spotifyApi(endpoint, this.accessToken, {
            method: "POST"
        })
    }

    /**
     * Oynatma durumunu getirir
     */
    async getPlaybackState() {
        return spotifyApi("/me/player", this.accessToken)
    }

    /**
     * Ses seviyesini ayarlar (0-100)
     */
    async setVolume(volumePercent, deviceId) {
        const endpoint = deviceId
            ? `/me/player/volume?volume_percent=${volumePercent}&device_id=${deviceId}`
            : `/me/player/volume?volume_percent=${volumePercent}`

        await spotifyApi(endpoint, this.accessToken, {
            method: "PUT"
        })
    }

    /**
     * Son çalınanları getirir
     */
    async getRecentlyPlayed(limit = 20) {
        return spotifyApi(
            `/me/player/recently-played?limit=${limit}`,
            this.accessToken
        )
    }
}
