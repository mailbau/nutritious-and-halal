"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function AdminLoginPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch(`${API_BASE}/api/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })

            const data = await response.json()

            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem('adminToken', data.token)
                localStorage.setItem('adminUser', JSON.stringify(data.user))
                router.push('/admin/dashboard')
            } else {
                setError(data.message || 'Login gagal')
            }
        } catch (err) {
            setError('Terjadi kesalahan saat login')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="flex justify-center">
                        <img src="/nay.png" className="h-16 w-16 rounded-xl" alt="NAY" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Masuk ke panel admin untuk mengelola konten
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="input-field"
                                placeholder="Masukkan username"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="input-field"
                                placeholder="Masukkan password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Memproses...' : 'Masuk'}
                        </button>
                    </div>

                    <div className="text-center">
                        <Link href="/" className="text-sm text-green-600 hover:text-green-700">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
