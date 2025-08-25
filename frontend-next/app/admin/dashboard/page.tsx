"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

interface DashboardStats {
    totalArticles: number
    totalFAQs: number
    totalFoods: number
    recentArticles: Array<{
        id: number
        title: string
        published_at: string
        category: string
    }>
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            router.push('/admin/login')
            return
        }

        fetchDashboardData()
    }, [router])

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('adminToken')
            const [statsRes, recentRes] = await Promise.all([
                fetch(`${API_BASE}/api/admin/stats`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }),
                fetch(`${API_BASE}/api/admin/recent-articles`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            ])

            if (statsRes.ok && recentRes.ok) {
                const statsData = await statsRes.json()
                const recentData = await recentRes.json()
                setStats({
                    totalArticles: statsData.articles,
                    totalFAQs: statsData.faqs,
                    totalFoods: statsData.foods,
                    recentArticles: recentData
                })
            } else {
                setError('Gagal memuat data dashboard')
            }
        } catch (err) {
            setError('Terjadi kesalahan saat memuat data')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        router.push('/admin/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat dashboard...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button onClick={fetchDashboardData} className="btn-primary">
                        Coba Lagi
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <img src="/assets/logonay.png" className="h-8 w-8 rounded-lg" alt="NAY" />
                            <span className="font-bold text-xl text-gray-900">Admin Dashboard</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-sm text-gray-600 hover:text-green-600">
                                Lihat Website
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Welcome Section */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang di Admin Panel</h1>
                        <p className="text-gray-600">Kelola konten website NAY Halal Guide</p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Artikel</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats?.totalArticles || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total FAQ</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats?.totalFAQs || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Makanan</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats?.totalFoods || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Aksi Cepat</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link href="/admin/articles" className="card p-4 text-center hover:shadow-medium transition-all duration-200">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">Kelola Artikel</h3>
                            </Link>

                            <Link href="/admin/faqs" className="card p-4 text-center hover:shadow-medium transition-all duration-200">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">Kelola FAQ</h3>
                            </Link>

                            <Link href="/admin/foods" className="card p-4 text-center hover:shadow-medium transition-all duration-200">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">Kelola Makanan</h3>
                            </Link>

                            <Link href="/admin/observations" className="card p-4 text-center hover:shadow-medium transition-all duration-200">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">Kelola Observasi</h3>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Articles */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Artikel Terbaru</h2>
                            <Link href="/admin/articles" className="text-green-600 hover:text-green-700 text-sm font-medium">
                                Lihat Semua →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {stats?.recentArticles?.slice(0, 5).map((article) => (
                                <div key={article.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{article.title}</h3>
                                        <p className="text-sm text-gray-600">
                                            {new Date(article.published_at).toLocaleDateString('id-ID')} • {article.category}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/admin/articles/${article.id}/edit`}
                                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            ))}
                            {(!stats?.recentArticles || stats.recentArticles.length === 0) && (
                                <p className="text-gray-500 text-center py-8">Belum ada artikel</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
