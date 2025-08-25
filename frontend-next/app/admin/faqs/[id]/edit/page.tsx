"use client"
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

interface FAQ {
    id: number
    question: string
    answer: string
    created_at: string
}

export default function EditFAQPage() {
    const [faq, setFaq] = useState<FAQ | null>(null)
    const [formData, setFormData] = useState({
        question: '',
        answer: ''
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const params = useParams()
    const faqId = params.id

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            router.push('/admin/login')
            return
        }

        fetchFAQ()
    }, [faqId, router])

    const fetchFAQ = async () => {
        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(`${API_BASE}/api/admin/faqs`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                const targetFAQ = data.find((f: FAQ) => f.id.toString() === faqId)
                if (targetFAQ) {
                    setFaq(targetFAQ)
                    setFormData({
                        question: targetFAQ.question,
                        answer: targetFAQ.answer
                    })
                } else {
                    setError('FAQ tidak ditemukan')
                }
            } else {
                setError('Gagal memuat FAQ')
            }
        } catch (err) {
            setError('Terjadi kesalahan saat memuat FAQ')
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
            const response = await fetch(`${API_BASE}/api/admin/faqs/${faqId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                router.push('/admin/faqs')
            } else {
                const data = await response.json()
                setError(data.message || 'Gagal memperbarui FAQ')
            }
        } catch (err) {
            setError('Terjadi kesalahan saat memperbarui FAQ')
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
                    <p className="mt-4 text-gray-600">Memuat FAQ...</p>
                </div>
            </div>
        )
    }

    if (error && !faq) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Link href="/admin/faqs" className="btn-primary">
                        Kembali ke FAQ
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
                            <img src="/assets/logonay.png" className="h-8 w-8 rounded-lg" alt="NAY" />
                            <span className="font-bold text-xl text-gray-900">Edit FAQ</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/admin/faqs" className="text-sm text-gray-600 hover:text-green-600">
                                Kembali ke FAQ
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
                        <h1 className="text-3xl font-bold text-gray-900">Edit FAQ</h1>
                        <p className="text-gray-600 mt-1">Edit pertanyaan dan jawaban FAQ</p>
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
                                    <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                                        Pertanyaan *
                                    </label>
                                    <input
                                        type="text"
                                        id="question"
                                        required
                                        className="input-field"
                                        placeholder="Masukkan pertanyaan"
                                        value={formData.question}
                                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                                        Jawaban *
                                    </label>
                                    <textarea
                                        id="answer"
                                        required
                                        rows={6}
                                        className="input-field"
                                        placeholder="Masukkan jawaban"
                                        value={formData.answer}
                                        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                            <Link href="/admin/faqs" className="btn-secondary">
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
