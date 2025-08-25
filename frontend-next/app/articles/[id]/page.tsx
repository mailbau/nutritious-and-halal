import Image from 'next/image'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

async function getArticle(id: string) {
    const res = await fetch(`${API_BASE}/api/articles/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
}

export default async function ArticleDetail({ params }: { params: { id: string } }) {
    const article = await getArticle(params.id)
    if (!article) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">Artikel tidak ditemukan</h1>
                <Link href="/articles" className="text-green-600">Kembali ke Artikel</Link>
            </div>
        )
    }
    return (
        <article className="prose max-w-none">
            {article.image && (
                <Image src={article.image} alt={article.title} width={1200} height={600} className="w-full h-80 object-cover rounded-2xl mb-6" />
            )}
            <h1>{article.title}</h1>
            <p className="text-gray-500">{new Date(article.published_at).toLocaleDateString('id-ID')}</p>
            <p className="bg-gray-50 p-4 rounded-xl border-l-4 border-green-500">{article.summary}</p>
            <div className="whitespace-pre-wrap text-gray-800">{article.content}</div>
        </article>
    )
}

