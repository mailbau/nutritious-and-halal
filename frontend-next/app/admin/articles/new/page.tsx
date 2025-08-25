"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function NewArticlePage() {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
        category: '',
        author: ''
    })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            router.push('/admin/login')
        }
    }, [router])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const token = localStorage.getItem('adminToken')
            const formDataToSend = new FormData()

            // Append form fields
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value)
            })

            // Append image if selected
            if (imageFile) {
                formDataToSend.append('image', imageFile)
            }

            const response = await fetch(`${API_BASE}/api/articles`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            })

            if (response.ok) {
                router.push('/admin/articles')
            } else {
                const data = await response.json()
                setError(data.message || 'Gagal membuat artikel')
            }
        } catch (err) {
            setError('Terjadi kesalahan saat membuat artikel')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        router.push('/admin/login')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <img src="/nay.png" className="h-8 w-8 rounded-lg" alt="NAY" />
                            <span className="font-bold text-xl text-gray-900">Tambah Artikel Baru</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/admin/articles" className="text-sm text-gray-600 hover:text-green-600">
                                Kembali ke Artikel
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
                        <h1 className="text-3xl font-bold text-gray-900">Tambah Artikel Baru</h1>
                        <p className="text-gray-600 mt-1">Buat artikel baru untuk website</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="card p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                            Judul Artikel *
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            required
                                            className="input-field"
                                            placeholder="Masukkan judul artikel"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                                            Ringkasan *
                                        </label>
                                        <textarea
                                            id="summary"
                                            required
                                            rows={3}
                                            className="input-field"
                                            placeholder="Masukkan ringkasan artikel"
                                            value={formData.summary}
                                            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                            Kategori *
                                        </label>
                                        <select
                                            id="category"
                                            required
                                            className="input-field"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="">Pilih kategori</option>
                                            <option value="Halal">Halal</option>
                                            <option value="Tips">Tips</option>
                                            <option value="Edukasi">Edukasi</option>
                                            <option value="Berita">Berita</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                                            Penulis *
                                        </label>
                                        <input
                                            type="text"
                                            id="author"
                                            required
                                            className="input-field"
                                            placeholder="Masukkan nama penulis"
                                            value={formData.author}
                                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                            Gambar Artikel
                                        </label>
                                        <div className="space-y-4">
                                            <input
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                className="input-field"
                                                onChange={handleImageChange}
                                            />
                                            {imagePreview && (
                                                <div className="relative">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-48 object-cover rounded-xl"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImageFile(null)
                                                            setImagePreview('')
                                                        }}
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                    Konten Artikel *
                                </label>
                                <textarea
                                    id="content"
                                    required
                                    rows={12}
                                    className="input-field"
                                    placeholder="Tulis konten artikel di sini..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                            <Link href="/admin/articles" className="btn-secondary">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Menyimpan...' : 'Simpan Artikel'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
