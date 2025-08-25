"use client"
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

interface Food {
    id: number
    name: string
    halal: boolean
    reason: string
    created_at: string
}

export default function EditFoodPage() {
    const [food, setFood] = useState<Food | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        halal: true,
        reason: ''
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const params = useParams()
    const foodId = params.id

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            router.push('/admin/login')
            return
        }

        fetchFood()
    }, [foodId, router])

    const fetchFood = async () => {
        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(`${API_BASE}/api/admin/foods`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                const targetFood = data.find((f: Food) => f.id.toString() === foodId)
                if (targetFood) {
                    setFood(targetFood)
                    setFormData({
                        name: targetFood.name,
                        halal: targetFood.halal,
                        reason: targetFood.reason
                    })
                } else {
                    setError('Makanan tidak ditemukan')
                }
            } else {
                setError('Gagal memuat data makanan')
            }
        } catch (err) {
            setError('Terjadi kesalahan saat memuat data makanan')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError('')

        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(`${API_BASE}/api/admin/foods/${foodId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                router.push('/admin/foods')
            } else {
                const data = await response.json()
                setError(data.message || 'Gagal memperbarui data makanan')
            }
        } catch (err) {
            setError('Terjadi kesalahan saat memperbarui data makanan')
        } finally {
            setSaving(false)
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
                    <p className="mt-4 text-gray-600">Memuat data makanan...</p>
                </div>
            </div>
        )
    }

    if (error && !food) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Link href="/admin/foods" className="btn-primary">
                        Kembali ke Makanan
                    </Link>
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
                            <img src="/nay.png" className="h-8 w-8 rounded-lg" alt="NAY" />
                            <span className="font-bold text-xl text-gray-900">Edit Makanan</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/admin/foods" className="text-sm text-gray-600 hover:text-green-600">
                                Kembali ke Makanan
                            </Link>
                            <Link href="/admin/dashboard" className="text-sm text-gray-600 hover:text-green-600">
                                Dashboard
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

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Makanan</h1>
                        <p className="text-gray-600 mt-1">Edit data makanan "{food?.name}"</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="card p-6">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Makanan *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="input-field"
                                        placeholder="Masukkan nama makanan"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status Halal *
                                    </label>
                                    <div className="space-y-3">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="halal"
                                                value="true"
                                                checked={formData.halal === true}
                                                onChange={() => setFormData({ ...formData, halal: true })}
                                                className="mr-3 text-green-600 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700">Halal</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="halal"
                                                value="false"
                                                checked={formData.halal === false}
                                                onChange={() => setFormData({ ...formData, halal: false })}
                                                className="mr-3 text-red-600 focus:ring-red-500"
                                            />
                                            <span className="text-sm text-gray-700">Tidak Halal</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                                        Alasan *
                                    </label>
                                    <textarea
                                        id="reason"
                                        required
                                        rows={4}
                                        className="input-field"
                                        placeholder="Jelaskan alasan status halal makanan ini"
                                        value={formData.reason}
                                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                            <Link href="/admin/foods" className="btn-secondary">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={saving}
                                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
