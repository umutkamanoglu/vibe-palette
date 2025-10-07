"use client"
import React, { useState, useEffect } from 'react'
import { Clock, TrendingUp, Eye } from 'lucide-react'

const TopTracksSection = () => {
    const [tracks, setTracks] = useState([])
    const [timeRange, setTimeRange] = useState("medium_term")
    const [isLoading, setIsLoading] = useState(true)
    const [topListenCount, setTopListenCount] = useState(3)

    useEffect(() => {
        fetchTopTracks()
    }, [timeRange])

    useEffect(() => {
        fetchTopTracks()
    }, [timeRange])

    const fetchTopTracks = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(
                `/api/spotify/top-tracks?time_range=${timeRange}&limit=20`
            )
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setTracks(data.items)
            }
        } catch (error) {
            console.error("Top tracks alınamadı:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const formatDuration = ms => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    const timeRanges = [
        { value: "short_term", label: "Son 4 Hafta" },
        { value: "medium_term", label: "Son 6 Ay" },
        { value: "long_term", label: "Tüm Zamanlar" }
    ]

    return (
        <div className='space-y-2'>
            <span className='flex items-center justify-between max-sm:flex-col max-sm:items-center my-5'>
                <span className='flex items-center'>
                    <TrendingUp className='-mt-5 mr-3' color='#00c24d' />
                    <h3 className='font-bold text-xl mb-5'>En Çok Dinlenenler</h3>
                </span>
                <div className="flex gap-2 flex-wrap flex-1 justify-end">
                    {timeRanges.map(range => (
                        <button
                            key={range.value}
                            onClick={() => setTimeRange(range.value)}
                            className={`px-2 py-2 cursor-pointer rounded-lg font-medium transition-all ${timeRange === range.value
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </span>
            {tracks.slice(0, topListenCount).map((track, index) => (
                <div
                    key={track.id}
                    className="group flex items-center gap-4 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all cursor-pointer"
                >
                    <div className="flex items-center justify-center w-10 h-10 text-gray-400 font-bold text-lg">
                        {index + 1}
                    </div>

                    <img
                        src={track.album.images[2]?.url || track.album.images[0]?.url}
                        alt={track.album.name}
                        className="w-14 h-14 rounded shadow-lg"
                    />

                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate group-hover:text-green-400 transition-colors">
                            {track.name}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">
                            {track.artists.map(artist => artist.name).join(", ")}
                        </p>
                    </div>

                    <div className="hidden md:block flex-1 min-w-0">
                        <p className="text-sm text-gray-400 truncate">
                            {track.album.name}
                        </p>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                            {formatDuration(track.duration_ms)}
                        </span>
                    </div>
                </div>
            ))}
            <div className='flex items-center justify-between mt-5'>
                <select defaultValue="3" className="cursor-pointer p-2 px-5 bg-gray-800 text-gray-400 rounded-lg max-sm:px-5 sm:px-8t" onChange={(e) => setTopListenCount(e.target.value)} value={topListenCount}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3" selected>3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button className="px-2 py-2 rounded-lg font-medium transition-all bg-green-500 text-white hover:bg-green-600 cursor-pointer flex items-center">
                    <Eye className='mr-2' size={20} /> Tüm Şarkıları Görüntüle
                </button>
            </div>
        </div>
    )
}

export default TopTracksSection