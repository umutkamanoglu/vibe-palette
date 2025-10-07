"use client"
import React, { useState, useEffect } from 'react'
import {
    Music,
    Loader2,
    SkipBack,
    SkipForward,
    Play,
    Pause,
} from "lucide-react"

const NowPlayingSection = () => {
    const [currentTrack, setCurrentTrack] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchNowPlaying()
        const interval = setInterval(fetchNowPlaying, 5000)
        return () => clearInterval(interval)
    }, [])

    const fetchNowPlaying = async () => {
        try {
            const response = await fetch("/api/spotify/current-playing")
            if (!response.ok) throw new Error("Veri alınamadı")

            const data = await response.json()
            console.log(data)
            setCurrentTrack(data.item)
            setIsPlaying(data.is_playing)
            setError(null)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
            </div>
        )
    }

    if (error || !currentTrack) {
        return (
            <div className="flex flex-col items-center justify-center p-12">
                <Music className="w-20 h-20 text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">Şu anda bir şarkı çalmıyor</p>
                <p className="text-sm text-gray-500 mt-2">
                    Spotify'dan bir şarkı çalmayı deneyin
                </p>
            </div>
        )
    }

    return (
        <div className='flex gap-6 flex-row max-sm:flex-col items-center justify-center'>
            <div className='max-md:flex max-md:gap-6 max-md:items-center'>
                <div className='hover:[&_img]:scale-105 transition-all cursor-pointer relative '>
                    <img
                        src={currentTrack.album.images[0]?.url}
                        alt={currentTrack.album.name}
                        className="w-36 h-36 rounded-lg shadow-2xl"
                    />
                </div>
            </div>
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-3 line-clamp-2">
                    {currentTrack.name}
                </h2>
                <p className="text-xl text-gray-300 mb-2">
                    {currentTrack.artists.map(artist => artist.name).join(", ")}
                </p>
                <p className="text-gray-400">{currentTrack.album.name}</p>
            </div>
        </div>
    )
}

export default NowPlayingSection