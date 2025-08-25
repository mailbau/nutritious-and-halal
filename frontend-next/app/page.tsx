import Link from 'next/link'
import Image from 'next/image'
import { API_BASE } from '../lib/api'

async function getArticles() {
    const res = await fetch(`${API_BASE}/api/articles`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    return res.json()
}

export default async function HomePage() {
    const articles = await getArticles()

    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Panduan Anda untuk{' '}
                                    <span className="text-gradient">Makanan Halal</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                                    Temukan status halal makanan, pahami bahan baku, dan pelajari praktik terbaik bersantap halal dengan informasi yang akurat dan terpercaya.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/bahan-halal" className="btn-primary text-center">
                                    Periksa Status Halal
                                </Link>
                                <Link href="/pojok-edukasi" className="btn-secondary text-center">
                                    Pelajari Lebih Lanjut
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-large">
                                <Image
                                    src="/assets/makananhalal.jpg"
                                    alt="Makanan Halal"
                                    width={600}
                                    height={500}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Mengapa Memilih NAY Halal Guide?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Platform terpercaya dengan database yang luas dan informasi yang selalu diperbarui
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Database Terpercaya</h3>
                            <p className="text-gray-600">Informasi halal yang akurat dan selalu diperbarui dari sumber terpercaya</p>
                        </div>
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Edukasi Lengkap</h3>
                            <p className="text-gray-600">Artikel dan panduan lengkap untuk memahami konsep halal</p>
                        </div>
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Cepat & Mudah</h3>
                            <p className="text-gray-600">Pencarian instan dan antarmuka yang user-friendly</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Articles Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Artikel Terbaru</h2>
                            <p className="text-lg text-gray-600">Pelajari lebih lanjut tentang makanan halal</p>
                        </div>
                        <Link href="/articles" className="btn-secondary">
                            Lihat Semua Artikel
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.slice(0, 3).map((article: any) => (
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
                                    </div>
                                )}
                                <div className="p-6">
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
                </div>
            </section>
        </div>
    )
}

