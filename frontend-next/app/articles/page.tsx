import Link from 'next/link'
import Image from 'next/image'
import { API_BASE } from '../../lib/api'

async function getArticles(category?: string) {
    const url = new URL(`${API_BASE}/api/articles`)
    if (category) url.searchParams.set('category', category)
    const res = await fetch(url.toString(), { next: { revalidate: 60 } })
    if (!res.ok) return []
    return res.json()
}

export default async function ArticlesPage() {
    const articles = await getArticles()

    const categories = ['Semua', 'Halal', 'Tips', 'Edukasi', 'Berita']

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Artikel & Edukasi</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Pelajari lebih lanjut tentang makanan halal, tips praktis, dan informasi terkini
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:border-green-500 hover:text-green-600 transition-all duration-200 font-medium"
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article: any) => (
                    <article key={article.id} className="card overflow-hidden group hover:shadow-medium transition-all duration-300">
                        {article.image && (
                            <div className="relative overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                                        {article.category || 'Artikel'}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs text-gray-500 font-medium">
                                    {new Date(article.published_at).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                                {article.author && (
                                    <>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-xs text-gray-500">{article.author}</span>
                                    </>
                                )}
                            </div>
                            <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                                {article.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                {article.summary}
                            </p>
                            <Link
                                href={`/articles/${article.id}`}
                                className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors duration-200"
                            >
                                Baca Selengkapnya
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>

            {/* Empty State */}
            {articles.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada artikel</h3>
                    <p className="text-gray-600">Artikel akan segera tersedia</p>
                </div>
            )}
        </div>
    )
}

