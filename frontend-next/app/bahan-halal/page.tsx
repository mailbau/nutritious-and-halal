"use client"
import { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function IngredientsPage() {
    const [q, setQ] = useState('')
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    async function onCheck() {
        if (!q.trim()) return
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/api/check?name=${encodeURIComponent(q)}`)
            const data = await res.json()
            setResult(data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Bahan/Produk Halal</h1>
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
                <div className="flex gap-3">
                    <input className="flex-1 border rounded-xl px-4 py-3" placeholder="Cari nama makanan..." value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === 'Enter' && onCheck()} />
                    <button onClick={onCheck} disabled={loading} className="bg-green-600 text-white rounded-xl px-6 py-3 disabled:opacity-50">{loading ? 'Memeriksa...' : 'Periksa'}</button>
                </div>
                {result && (
                    <div className="border-t pt-4">
                        {!result.found ? (
                            <p className="text-gray-600">Produk tidak ditemukan dalam database lokal.</p>
                        ) : (
                            <div>
                                <h3 className="font-semibold">{result.item.name} <span className={`ml-2 px-2 py-1 rounded text-xs ${result.item.halal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{result.item.halal ? 'HALAL' : 'TIDAK HALAL'}</span></h3>
                                <p className="text-sm text-gray-600">{result.reason}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

