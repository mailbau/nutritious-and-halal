"use client"
import { useState, useEffect } from 'react'
import { API_BASE } from '../../lib/api'

export default function IngredientsPage() {
    const [q, setQ] = useState('')
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [foods, setFoods] = useState<any[]>([])
    const [selectedFood, setSelectedFood] = useState<any>(null)
    const [loadingFoods, setLoadingFoods] = useState(false)
    const [observations, setObservations] = useState<any[]>([])
    const [obsAnswers, setObsAnswers] = useState<Record<number, 'IYA' | 'TIDAK' | undefined>>({})
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [obsPage, setObsPage] = useState(1)
    const obsPerPage = 5

    useEffect(() => {
        async function fetchObservations() {
            try {
                const res = await fetch(`${API_BASE}/api/observations`, { next: { revalidate: 60 } as any })
                if (res.ok) {
                    const data = await res.json()
                    setObservations(data)
                }
            } catch (e) {
                // ignore
            }
        }
        fetchObservations()
    }, [])

    useEffect(() => {
        const term = q.trim()
        if (term.length < 2) {
            setSuggestions([])
            return
        }
        const abort = new AbortController()
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`${API_BASE}/api/foods?q=${encodeURIComponent(term)}`, { signal: abort.signal as any })
                if (res.ok) {
                    const data = await res.json()
                    setSuggestions(data.slice(0, 8))
                }
            } catch {
                // ignore abort/errors
            }
        }, 250)
        return () => {
            clearTimeout(timer)
            abort.abort()
        }
    }, [q])

    const categories = [
        {
            id: 'karbohidrat',
            title: 'Karbohidrat',
            icon: '🌾',
            description: 'Nasi, roti, pasta, dan sumber karbohidrat lainnya'
        },
        {
            id: 'protein-hewani',
            title: 'Protein Hewani',
            icon: '🥩',
            description: 'Daging, ikan, telur, dan sumber protein hewani'
        },
        {
            id: 'protein-nabati',
            title: 'Protein Nabati',
            icon: '🫘',
            description: 'Kacang-kacangan, tempe, tahu, dan sumber protein nabati'
        },
        {
            id: 'lemak',
            title: 'Lemak',
            icon: '🥑',
            description: 'Minyak, mentega, dan sumber lemak lainnya'
        },
        {
            id: 'vitamin-mineral',
            title: 'Vitamin & Mineral',
            icon: '🥕',
            description: 'Sayuran, buah-buahan, dan sumber vitamin mineral'
        },
        {
            id: 'bahan-tambahan-pangan',
            title: 'Bahan Tambahan Pangan',
            icon: '🧪',
            description: 'Pengawet, pewarna, dan bahan tambahan lainnya'
        }
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

    async function loadFoodsByCategory(categoryId: string) {
        setSelectedCategory(categoryId)
        setLoadingFoods(true)
        setSelectedFood(null)
        try {
            const res = await fetch(`${API_BASE}/api/foods?category=${categoryId}`)
            if (res.ok) {
                const data = await res.json()
                setFoods(data)
            } else {
                setFoods([])
            }
        } catch (error) {
            console.error('Error loading foods:', error)
            setFoods([])
        } finally {
            setLoadingFoods(false)
        }
    }

    function selectFood(food: any) {
        setSelectedFood(food)
    }

    function goBack() {
        setSelectedCategory(null)
        setSelectedFood(null)
        setFoods([])
    }

    function renderOutcomeBadge(outcome?: string) {
        if (!outcome) return null
        const map: any = {
            HALAL: 'bg-green-100 text-green-800',
            HARAM: 'bg-red-100 text-red-800',
            SYUBHAT: 'bg-yellow-100 text-yellow-800'
        }
        return <span className={`ml-3 inline-flex px-2 py-1 rounded-full text-xs font-semibold ${map[outcome] || 'bg-gray-100 text-gray-700'}`}>{outcome}</span>
    }

    // If a food is selected, show the detail
    if (selectedFood) {
        return (
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSelectedFood(null)}
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Katalog
                    </button>
                </div>

                {/* Food Detail */}
                <div className="card p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {selectedFood.image && (
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src={selectedFood.image}
                                    alt={selectedFood.name}
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        )}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {selectedFood.name}
                                </h1>
                                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${selectedFood.halal
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedFood.halal ? 'HALAL' : 'TIDAK HALAL'}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Penjelasan</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {selectedFood.reason || 'Tidak ada penjelasan tersedia.'}
                                </p>
                            </div>

                            {selectedFood.tips && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tips</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedFood.tips}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // If a category is selected, show the catalogue
    if (selectedCategory) {
        const currentCategory = categories.find(cat => cat.id === selectedCategory)

        return (
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={goBack}
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {currentCategory?.title}
                    </h1>
                </div>

                {/* Food Catalogue */}
                {loadingFoods ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Memuat katalog...</p>
                    </div>
                ) : foods.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {foods.map((food) => (
                            <button
                                key={food.id}
                                type="button"
                                className="card p-4 text-center cursor-pointer hover:shadow-medium transition-all duration-200 text-left"
                                onClick={() => selectFood(food)}
                            >
                                {food.image && (
                                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                                        <img
                                            src={food.image}
                                            alt={food.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                                    {food.name}
                                </h3>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada data</h3>
                        <p className="text-gray-500">Data makanan untuk kategori ini akan segera tersedia</p>
                    </div>
                )}
            </div>
        )
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
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                        />
                        <button
                            onClick={onCheck}
                            disabled={loading}
                            className="btn-primary disabled:opacity-50"
                        >
                            {loading ? 'Memeriksa...' : 'Periksa'}
                        </button>
                    </div>
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            {suggestions.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => { setQ(item.name); onCheck(); setShowSuggestions(false); }}
                                >
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                                    )}
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                        {item.category && (
                                            <div className="text-xs text-gray-500 capitalize">{item.category.replace(/-/g, ' ')}</div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
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
                            <button
                                className="mt-6 btn-primary"
                                onClick={() => loadFoodsByCategory(category.id)}
                            >
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
                        {observations.slice((obsPage - 1) * obsPerPage, obsPage * obsPerPage).map((obs: any) => {
                            const answer = obsAnswers[obs.id]
                            const outcome = answer === 'IYA' ? obs.yes_outcome : answer === 'TIDAK' ? obs.no_outcome : undefined
                            return (
                                <div key={obs.id} className="p-4 border border-gray-200 rounded-xl">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="text-gray-800 font-medium">
                                            {obs.question}
                                            {renderOutcomeBadge(outcome)}
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => setObsAnswers(prev => ({ ...prev, [obs.id]: 'IYA' }))}
                                                className={`px-4 py-2 rounded-lg text-sm font-semibold border ${answer === 'IYA' ? 'bg-green-600 text-white border-green-600' : 'border-green-600 text-green-700 hover:bg-green-50'}`}
                                            >
                                                Iya
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setObsAnswers(prev => ({ ...prev, [obs.id]: 'TIDAK' }))}
                                                className={`px-4 py-2 rounded-lg text-sm font-semibold border ${answer === 'TIDAK' ? 'bg-red-600 text-white border-red-600' : 'border-red-600 text-red-700 hover:bg-red-50'}`}
                                            >
                                                Tidak
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {observations.length === 0 && (
                            <div className="text-center text-gray-500">Belum ada pertanyaan observasi.</div>
                        )}
                    </div>

                    {/* Pagination */}
                    {observations.length > obsPerPage && (
                        <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={() => setObsPage(prev => Math.max(1, prev - 1))}
                                disabled={obsPage === 1}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Sebelumnya
                            </button>
                            <span className="px-3 py-2 text-sm text-gray-700">
                                Halaman {obsPage} dari {Math.ceil(observations.length / obsPerPage)}
                            </span>
                            <button
                                onClick={() => setObsPage(prev => Math.min(Math.ceil(observations.length / obsPerPage), prev + 1))}
                                disabled={obsPage === Math.ceil(observations.length / obsPerPage)}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Selanjutnya
                            </button>
                        </div>
                    )}
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

