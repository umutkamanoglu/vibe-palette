"use client"
import { useState, useEffect } from "react"

export function useSpotifyAuth() {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const response = await fetch("/api/spotify/me")

            if (!response.ok) {
                if (response.status === 401) {
                    setUser(null)
                    return
                }
                throw new Error("Kullanıcı bilgileri alınamadı")
            }

            const userData = await response.json()
            setUser(userData)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const login = () => {
        window.location.href = "/api/auth/login"
    }

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" })
            setUser(null)
            window.location.href = "/"
        } catch (err) {
            setError(err.message)
        }
    }

    return {
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        refetch: fetchUser
    }
}
