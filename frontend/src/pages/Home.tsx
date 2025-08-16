
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Home() {
  const [articles, setArticles] = useState<any[]>([])
  useEffect(() => {
    axios.get(`${API}/api/articles`).then(r => setArticles(r.data))
  }, [])

  return (
    <div className="space-y-20">
      <Hero />

      {/* Tentang Kami Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Tentang Kami</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            NAY Halal Guide membantu konsumen untuk mendapatkan informasi terpercaya seputar kehalalan produk makanan dan minuman. Misi kami adalah menyediakan sumber daya yang akurat, praktis, dan mudah dipahami untuk memastikan setiap pilihan makanan Anda sesuai dengan prinsip halal.
          </p>
        </div>
      </section>

      {/* Pojok Edukasi Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Pojok Edukasi</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Pelajari dasar-dasar pengecekan kehalalan bahan, proses produksi, hingga praktik bersantap halal melalui berbagai sumber edukasi yang komprehensif.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link
            to="/bahan-halal"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
          >
            Periksa Status Halal Bahan Makanan
          </Link>
          <Link
            to="/pojok-edukasi"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
          >
            Cek Produk Bersertifikat
          </Link>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar />
      </section>

      {/* Konten Baru Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Konten Baru</h2>
          <Link
            to="/articles"
            className="text-green-600 hover:text-green-700 font-semibold transition-colors"
          >
            Lihat Semua Artikel →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <article key={article.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={article.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                {article.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">{article.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {new Date(article.published_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <Link
                    to={`/articles/${article.id}`}
                    className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
