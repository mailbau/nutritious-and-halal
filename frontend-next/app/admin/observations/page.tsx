"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

type Outcome = 'HALAL' | 'HARAM' | 'SYUBHAT'

interface Observation {
    id: number
    question: string
    yes_outcome: Outcome
    no_outcome: Outcome
    sort_order: number
    active: boolean
    created_at: string
}

export default function AdminObservationsPage() {
    const [items, setItems] = useState<Observation[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            router.push('/admin/login')
            return
        }
        fetchItems()
    }, [router])

    async function fetchItems() {
        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${API_BASE}/api/admin/observations`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (!res.ok) throw new Error('Gagal memuat data')
            const data = await res.json()
            setItems(data)
        } catch (e) {
            setError('Gagal memuat daftar observasi')
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Hapus pertanyaan observasi ini?')) return
        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${API_BASE}/api/admin/observations/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (!res.ok) throw new Error('Gagal menghapus')
            setItems(prev => prev.filter(i => i.id !== id))
        } catch (e) {
            alert('Gagal menghapus observasi')
        }
    }

    const outcomeBadge = (o: Outcome) => {
        const cls = o === 'HALAL' ? 'bg-green-100 text-green-800' : o === 'HARAM' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
        return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cls}`}>{o}</span>
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
                    <p className="mt-4 text-gray-600">Memuat observasi...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <img src="/assets/logonay.png" className="h-8 w-8 rounded-lg" alt="NAY" />
                            <span className="font-bold text-xl text-gray-900">Kelola Observasi</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/admin/dashboard" className="text-sm text-gray-600 hover:text-green-600">Dashboard</Link>
                            <Link href="/" className="text-sm text-gray-600 hover:text-green-600">Lihat Website</Link>
                            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 font-medium">Logout</button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Observasi Makanan</h1>
                            <p className="text-gray-600 mt-1">Pertanyaan observasi dan hasil saat dijawab Iya/Tidak</p>
                        </div>
                        <Link href="/admin/observations/new" className="btn-primary">Tambah Observasi</Link>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pertanyaan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jika Iya</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jika Tidak</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urutan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktif</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {items.map((it) => (
                                        <tr key={it.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-900">{it.question}</td>
                                            <td className="px-6 py-4">{outcomeBadge(it.yes_outcome)}</td>
                                            <td className="px-6 py-4">{outcomeBadge(it.no_outcome)}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{it.sort_order}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${it.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{it.active ? 'Aktif' : 'Nonaktif'}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/admin/observations/${it.id}/edit`} className="text-green-600 hover:text-green-900">Edit</Link>
                                                    <button onClick={() => handleDelete(it.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {items.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada observasi</h3>
                                <p className="text-gray-500 mb-4">Tambahkan pertanyaan observasi pertama</p>
                                <Link href="/admin/observations/new" className="btn-primary">Tambah Observasi</Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
