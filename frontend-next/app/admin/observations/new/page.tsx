"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

type Outcome = 'HALAL' | 'HARAM' | 'SYUBHAT'

export default function NewObservationPage() {
    const [form, setForm] = useState({
        question: '',
        yes_outcome: 'HALAL' as Outcome,
        no_outcome: 'SYUBHAT' as Outcome,
        sort_order: 0,
        active: true
    })
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) router.push('/admin/login')
    }, [router])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)
        setError('')
        try {
            const token = localStorage.getItem('adminToken')
            const res = await fetch(`${API_BASE}/api/admin/observations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(form)
            })
            if (!res.ok) throw new Error('Gagal menyimpan')
            router.push('/admin/observations')
        } catch (e) {
            setError('Gagal menyimpan observasi')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Tambah Observasi</h1>
                {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pertanyaan</label>
                        <textarea className="input-field" rows={3} required value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Jika Iya</label>
                            <select className="input-field" value={form.yes_outcome} onChange={e => setForm({ ...form, yes_outcome: e.target.value as Outcome })}>
                                <option value="HALAL">HALAL</option>
                                <option value="HARAM">HARAM</option>
                                <option value="SYUBHAT">SYUBHAT</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Jika Tidak</label>
                            <select className="input-field" value={form.no_outcome} onChange={e => setForm({ ...form, no_outcome: e.target.value as Outcome })}>
                                <option value="HALAL">HALAL</option>
                                <option value="HARAM">HARAM</option>
                                <option value="SYUBHAT">SYUBHAT</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Urutan</label>
                            <input type="number" className="input-field" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} />
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                            <input id="active" type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                            <label htmlFor="active" className="text-sm text-gray-700">Aktif</label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => router.push('/admin/observations')} className="btn-secondary">Batal</button>
                        <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Menyimpan...' : 'Simpan'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
