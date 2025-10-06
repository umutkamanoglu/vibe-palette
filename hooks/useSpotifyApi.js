// hooks/useSpotifyApi.ts
"use client"
import { useState, useCallback } from "react"

export function useSpotifyApi(endpoint, options) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const execute = useCallback(
        async params => {
            setIsLoading(true)
            setError(null)

            try {
                const queryString = params
                    ? "?" + new URLSearchParams(params).toString()
                    : ""

                const response = await fetch(`${endpoint}${queryString}`)

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || "API isteği başarısız")
                }

                const result = await response.json()
                setData(result)
                options?.onSuccess?.(result)
                return result
            } catch (err) {
                setError(err)
                options?.onError?.(err)
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [endpoint, options]
    )

    const mutate = useCallback(
        async (body, method = "POST") => {
            setIsLoading(true)
            setError(null)

            try {
                const response = await fetch(endpoint, {
                    method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: body ? JSON.stringify(body) : undefined
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || "API isteği başarısız")
                }

                const result = await response.json()
                setData(result)
                options?.onSuccess?.(result)
                return result
            } catch (err) {
                setError(err)
                options?.onError?.(err)
                throw err
            } finally {
                setIsLoading(false)
            }
        },
        [endpoint, options]
    )

    return {
        data,
        isLoading,
        error,
        execute,
        mutate,
        reset: () => {
            setData(null)
            setError(null)
            setIsLoading(false)
        }
    }
}
