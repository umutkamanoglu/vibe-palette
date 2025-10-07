"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Search, LogOut, Headphones, TrendingUp } from 'lucide-react'
import DashboardCard from '@/components/dashboard/DashboardCard'
import NowPlayingSection from '@/components/dashboard/NowPlayingSection'
import TopTracksSection from '@/components/dashboard/TopTracksSection'
import TopArtistsSection from '@/components/dashboard/TopArtistsSection'

function Dashboard() {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const response = await fetch("/api/spotify/me")

            if (!response.ok) {
                if (response.status === 401) {
                    // Kullanıcı giriş yapmamış, ana sayfaya yönlendir
                    router.push("/")
                    return
                }
                throw new Error("Kullanıcı bilgileri alınamadı")
            }

            const userData = await response.json()
            setUser(userData)
        } catch (err) {
            setError(err.message)
            // Hata durumunda ana sayfaya yönlendir
            setTimeout(() => router.push("/"), 2000)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-green-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Yükleniyor...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Bir Hata Oluştu
                    </h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <p className="text-sm text-gray-500">
                        Ana sayfaya yönlendiriliyorsunuz...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <main className='bg-gradient-to-tr p-10 max-sm:p-3 py-10 max-sm:py-px from-zinc-900 via-black to-zinc-900 min-h-screen overflow-auto text-white'>
            <header className='h-24 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 max-sm:p-3 border border-gray-800 gap-4 mt-5 flex items-center justify-between'>
                <div className='flex items-center justify-center gap-4'>
                    {user.images && user.images.length > 0 ? (
                        <img
                            src={user.images[0].url}
                            alt={user.display_name}
                            className="w-16 h-16 rounded-full border-2 border-green-500 shadow-lg"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full border-2 border-green-500 bg-gray-800 flex items-center justify-center">
                            <User className="w-8 h-8 text-gray-400" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-white max-sm:text-xl">
                            Hoş geldin, {user.display_name}
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${user.product === "premium"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-gray-700 text-gray-300"
                                    }`}
                            >
                                {user.product === "premium" ? "⭐ Premium" : "Free"}
                            </span>
                            <span>•</span>
                            <span>{user.country}</span>
                            {user.followers && (
                                <>
                                    <span>•</span>
                                    <span>{user.followers.total} takipçi</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        className="flex sm:hidden items-center gap-2 px-4 py-3.5 bg-zinc-200 text-black rounded-lg transition-al hover:scale-105 duration-150 cursor-pointer"
                    >
                        <Search className="w-5 h-5" color='#000' />
                        <span className='max-sm:hidden'>
                            Çıkış Yap
                        </span>
                    </button>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-al hover:scale-105 duration-150 cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className='max-sm:hidden'>
                            Çıkış Yap
                        </span>
                    </button>
                </div>
            </header>

            <section className='mt-5 grid grid-cols-4 gap-5 max-md:grid-cols-1'>

                <DashboardCard colSpan={4}>
                    <span className='flex items-center max-sm:justify-center'>
                        <Headphones className='-mt-5 mr-3' color='#00c24d' />
                        <h3 className='font-bold text-xl mb-5'>Şu Anda Dinleniyor.</h3>
                    </span>
                    <NowPlayingSection />
                </DashboardCard>

                <DashboardCard colSpan={2}>
                    <TopTracksSection />
                </DashboardCard>

                <DashboardCard colSpan={2}>
                    <TopArtistsSection />
                </DashboardCard>
                <DashboardCard colSpan={2}>
                    card
                </DashboardCard>
                <DashboardCard colSpan={3}>
                    card
                </DashboardCard>

            </section>
        </main >
    )
}

export default Dashboard