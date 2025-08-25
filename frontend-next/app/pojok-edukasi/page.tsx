import Link from 'next/link'
import Image from 'next/image'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

async function getArticles() {
    const res = await fetch(`${API_BASE}/api/articles`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    return res.json()
}

async function getFAQs() {
    const res = await fetch(`${API_BASE}/api/faqs`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    return res.json()
}

export default async function EducationPage() {
    const [articles, faqs] = await Promise.all([getArticles(), getFAQs()])

    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="text-center space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                    Pojok <span className="text-gradient">Edukasi</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Pelajari dasar-dasar kehalalan, praktik terbaik, dan informasi terkini tentang makanan halal untuk meningkatkan pemahaman Anda.
                </p>
            </section>

            {/* Featured Articles */}
            <section>
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Artikel Terbaru</h2>
                        <p className="text-lg text-gray-600">Pelajari dari artikel-artikel terbaru kami</p>
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
            </section>

            {/* FAQ Section */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Pertanyaan Umum</h2>
                    <p className="text-lg text-gray-600">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
                </div>
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.slice(0, 6).map((faq: any, index: number) => (
                        <div key={faq.id} className="card p-6">
                            <h3 className="font-bold text-lg text-gray-900 mb-3">{faq.question}</h3>
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Resources */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Sumber Daya Cepat</h2>
                    <p className="text-lg text-gray-600">Akses informasi penting dengan mudah</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="card p-8 text-center group hover:shadow-medium transition-all duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-200">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Periksa Halal</h3>
                        <p className="text-gray-600 mb-6">Cek status halal makanan dan produk dengan cepat</p>
                        <Link href="/bahan-halal" className="btn-primary">
                            Mulai Periksa
                        </Link>
                    </div>

                    <div className="card p-8 text-center group hover:shadow-medium transition-all duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-200">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Panduan Lengkap</h3>
                        <p className="text-gray-600 mb-6">Pelajari semua tentang makanan halal</p>
                        <Link href="/articles" className="btn-primary">
                            Baca Panduan
                        </Link>
                    </div>

                    <div className="card p-8 text-center group hover:shadow-medium transition-all duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-200">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Games Edukatif</h3>
                        <p className="text-gray-600 mb-6">Belajar sambil bermain dengan kuis halal</p>
                        <Link href="/games" className="btn-primary">
                            Main Games
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

