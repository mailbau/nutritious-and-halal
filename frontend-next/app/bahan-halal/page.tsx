"use client"
import { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function IngredientsPage() {
    const [q, setQ] = useState('')
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const categories = [
        {
            title: 'Sumber Karbohidrat',
            icon: '🌾',
            description: 'Nasi, roti, pasta, dan sumber karbohidrat lainnya'
        },
        {
            title: 'Sumber Protein',
            icon: '🥩',
            description: 'Daging, ikan, telur, dan sumber protein lainnya'
        },
        {
            title: 'Sumber Vitamin',
            icon: '🥕',
            description: 'Sayuran, buah-buahan, dan sumber vitamin lainnya'
        },
        {
            title: 'Sumber Mineral',
            icon: '🥛',
            description: 'Susu, keju, dan sumber mineral lainnya'
        },
        {
            title: 'Bahan Tambahan Pangan',
            icon: '🧪',
            description: 'Pengawet, pewarna, dan bahan tambahan lainnya'
        },
        {
            title: 'Bahan Siap Saji',
            icon: '🍔',
            description: 'Makanan kemasan dan produk siap konsumsi'
        }
    ]

    const questions = [
        'Apakah boleh mengonsumsi makanan yang mengandung gelatin?',
        'Apakah boleh mengonsumsi makanan yang mengandung MSG?',
        'Apakah boleh mengonsumsi makanan yang mengandung emulsifier?',
        'Apakah boleh mengonsumsi makanan yang mengandung ragi?',
        'Is it permissible to consume food containing food coloring?',
        'Is it permissible to consume food containing food flavoring?',
        'Is it permissible to consume food containing food preservatives?',
        'Is it permissible to consume food containing food thickeners?'
    ]

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
        <div className="space-y-20">
            {/* Header */}
            <section className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Bahan Makanan Halal</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Periksa status halal berbagai bahan makanan dan pahami kandungan yang perlu diperhatikan dalam memilih makanan halal.
                </p>
            </section>

            {/* Search Section */}
            <section className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Cari Bahan Makanan</h2>
                <div className="max-w-2xl mx-auto space-y-4">
                    <div className="flex gap-3">
                        <input
                            className="flex-1 input-field"
                            placeholder="Cari nama makanan..."
                            value={q}
                            onChange={e => setQ(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && onCheck()}
                        />
                        <button
                            onClick={onCheck}
                            disabled={loading}
                            className="btn-primary disabled:opacity-50"
                        >
                            {loading ? 'Memeriksa...' : 'Periksa'}
                        </button>
                    </div>
                    {result && (
                        <div className="border-t pt-4">
                            {!result.found ? (
                                <p className="text-gray-600">Produk tidak ditemukan dalam database lokal.</p>
                            ) : (
                                <div>
                                    <h3 className="font-semibold">
                                        {result.item.name}
                                        <span className={`ml-2 px-2 py-1 rounded text-xs ${result.item.halal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {result.item.halal ? 'HALAL' : 'TIDAK HALAL'}
                                        </span>
                                    </h3>
                                    <p className="text-sm text-gray-600">{result.reason}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Periksa Status Halal Section */}
            <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Periksa Status Halal</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <div key={index} className="card p-8 text-center group cursor-pointer transform hover:-translate-y-2 transition-all duration-300">
                            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{category.description}</p>
                            <button className="mt-6 btn-primary">
                                Periksa
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Observasi Makanan Halal Section */}
            <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Observasi Makanan Halal</h2>
                <div className="card p-8">
                    <div className="space-y-4">
                        {questions.map((question, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer group">
                                <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                                    {question}
                                </span>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <button className="btn-primary px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Check Halal Certified Products from BPJPH
                        </button>
                    </div>
                </div>
            </section>

            {/* Quick Guide Section */}
            <section className="bg-green-50 rounded-3xl p-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Panduan Cepat</h2>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        Pelajari cara mengidentifikasi bahan halal dan non-halal dengan mudah melalui panduan visual dan penjelasan yang komprehensif.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="card p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Halal</h3>
                            <p className="text-sm text-gray-600">Bahan yang diperbolehkan untuk dikonsumsi</p>
                        </div>
                        <div className="card p-6">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Haram</h3>
                            <p className="text-sm text-gray-600">Bahan yang tidak diperbolehkan untuk dikonsumsi</p>
                        </div>
                        <div className="card p-6">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Syubhat</h3>
                            <p className="text-sm text-gray-600">Bahan yang meragukan status halalnya</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

