import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/api';

export default function ArticlesList() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchArticles();
    }, [selectedCategory]);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const params = selectedCategory ? { category: selectedCategory } : {};
            const response = await axios.get(API_URL('articles'), { params });
            setArticles(response.data);
        } catch (error: any) {
            setError(error.response?.data?.error || 'Failed to fetch articles');
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { value: '', label: 'All Categories' },
        { value: 'Sertifikasi', label: 'Sertifikasi' },
        { value: 'Edukasi', label: 'Edukasi' },
        { value: 'Penelitian', label: 'Penelitian' },
        { value: 'Tips', label: 'Tips' },
        { value: 'Berita', label: 'Berita' }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">All Articles</h1>
                        </div>
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Category Filter */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => setSelectedCategory(category.value)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedCategory === category.value
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-8">
                        {error}
                    </div>
                )}

                {/* Articles Grid */}
                {articles.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                        <p className="text-gray-600">
                            {selectedCategory
                                ? `No articles in the "${selectedCategory}" category.`
                                : 'No articles available at the moment.'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
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
                                            <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                                                {article.category}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3">
                                            {article.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <span>{article.author || 'Tim NAY'}</span>
                                            <span>•</span>
                                            <span>{new Date(article.published_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}</span>
                                        </div>

                                        <Link
                                            to={`/articles/${article.id}`}
                                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors"
                                        >
                                            Baca Selengkapnya
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
