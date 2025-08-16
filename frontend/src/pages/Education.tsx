
import FAQ from '../components/FAQ'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/api'

export default function Education() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await axios.get(API_URL('articles'))
      setArticles(response.data.slice(0, 3)) // Show only first 3 articles
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const publications = [
    {
      title: 'Standar dan Peraturan Makanan Halal',
      image: '/images/edu1.jpg',
      description: 'Dokumen resmi standar halal yang diakui secara internasional'
    }
  ]

  const studentResources = [
    {
      title: 'Makalah Penelitian tentang Makanan Halal',
      image: '/images/edu2.jpg',
      description: 'Kumpulan penelitian akademis terkait makanan halal'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Pojok Edukasi</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Pelajari dasar-dasar pengecekan kehalalan bahan, proses produksi, hingga praktik bersantap halal melalui berbagai sumber edukasi yang komprehensif.
        </p>
      </section>

      {/* Articles & Tips Section */}
      <section>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Artikel & Tips Harian</h2>
          <Link
            to="/articles"
            className="text-green-600 hover:text-green-700 font-semibold transition-colors"
          >
            Lihat Semua Artikel →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))
          ) : (
            articles.map((article, index) => (
              <article key={article.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  {article.image ? (
                    <img
                      src={article.image}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={article.title}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {article.category && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {article.category}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.summary}</p>
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
            ))
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Pertanyaan yang Sering Diajukan</h2>
        <FAQ />
      </section>

      {/* Quick Survey Section */}
      <section className="bg-green-50 rounded-3xl p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Survei Cepat</h2>
          <p className="text-lg text-gray-700 mb-8">
            Ada pertanyaan tentang makanan halal? Tanyakan kepada kami!
          </p>
          <div className="space-y-4">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Tulis pertanyaan Anda di sini..."
            />
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Kirim
            </button>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Publikasi</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {publications.map((pub, index) => (
            <article key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={pub.image}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={pub.title}
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">{pub.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{pub.description}</p>
                <button className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                  Download →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Student Resources Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Untuk Pelajar</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {studentResources.map((resource, index) => (
            <article key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={resource.image}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={resource.title}
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{resource.description}</p>
                <button className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                  Akses →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
