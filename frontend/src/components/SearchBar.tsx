
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../utils/api'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const searchFood = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const res = await axios.get(API_URL('check'), { params: { name: query } })
      setResults(res.data)
    } catch (error) {
      console.error('Error searching:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Periksa Status Halal</h2>
        <p className="text-lg text-gray-600">
          Cari makanan atau scan barcode untuk memeriksa status halal
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-lg"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari nama makanan atau scan barcode..."
            onKeyPress={e => e.key === 'Enter' && searchFood()}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          onClick={searchFood}
          disabled={loading || !query.trim()}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Memeriksa...</span>
            </div>
          ) : (
            'Periksa Status Halal'
          )}
        </button>
      </div>

      {results && results.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          {!results.length ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Produk Tidak Ditemukan</h3>
              <p className="text-gray-600">Produk tidak ditemukan dalam database lokal. Silakan coba dengan kata kunci lain.</p>
            </div>
          ) : (
            <div className="bg-green-50 rounded-2xl p-6">
              <div className="flex items-start gap-6">
                <img
                  src={results[0].item.image}
                  className="w-24 h-24 object-cover rounded-xl shadow-lg"
                  alt={results[0].item.name}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{results[0].item.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${results[0].item.halal
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {results[0].item.halal ? 'HALAL' : 'TIDAK HALAL'}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{results[0].reason}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
