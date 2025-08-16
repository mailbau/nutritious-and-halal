import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function ArticleDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API}/api/articles/${id}`);
            setArticle(response.data);
        } catch (error: any) {
            setError(error.response?.data?.error || 'Failed to fetch article');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
                    <p className="text-gray-600 mb-6">{error || 'The article you are looking for does not exist.'}</p>
                    <Link
                        to="/pojok-edukasi"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 transition-colors"
                    >
                        ← Back to Articles
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => navigate('/pojok-edukasi')}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Articles
                        </button>
                        <div className="flex items-center space-x-4">
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                {article.category}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Article Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    {article.image && (
                        <div className="relative h-64 md:h-96">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    )}

                    <div className="p-8">
                        <div className="mb-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {article.title}
                            </h1>
                            <div className="flex items-center text-gray-600 text-sm space-x-4">
                                <span>By {article.author || 'Tim NAY'}</span>
                                <span>•</span>
                                <span>{new Date(article.published_at).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                                {article.category && (
                                    <>
                                        <span>•</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                            {article.category}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {article.summary && (
                            <div className="mb-8">
                                <p className="text-lg text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl border-l-4 border-green-500">
                                    {article.summary}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Article Content */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {article.content}
                        </div>
                    </div>

                    {/* Article Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-medium text-sm">
                                        {article.author ? article.author.charAt(0).toUpperCase() : 'N'}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {article.author || 'Tim NAY'}
                                    </p>
                                    <p className="text-sm text-gray-500">Author</p>
                                </div>
                            </div>

                            <Link
                                to="/pojok-edukasi"
                                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                ← Back to Articles
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
