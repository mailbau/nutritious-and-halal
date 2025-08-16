import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ articles: 0, foods: 0, faqs: 0 });
    const [recentArticles, setRecentArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const headers = { Authorization: `Bearer ${token}` };

            const [statsResponse, articlesResponse] = await Promise.all([
                axios.get(`${API}/api/admin/stats`, { headers }),
                axios.get(`${API}/api/admin/recent-articles`, { headers })
            ]);

            setStats(statsResponse.data);
            setRecentArticles(articlesResponse.data);
        } catch (error: any) {
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

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
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/admin/articles/new"
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                            >
                                Add Article
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Articles</dt>
                                    <dd className="text-lg font-medium text-gray-900">{stats.articles}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Foods</dt>
                                    <dd className="text-lg font-medium text-gray-900">{stats.foods}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total FAQs</dt>
                                    <dd className="text-lg font-medium text-gray-900">{stats.faqs}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Articles */}
                <div className="bg-white rounded-2xl shadow-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Recent Articles</h2>
                            <Link
                                to="/admin/articles"
                                className="text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                                View all articles →
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {recentArticles.map((article: any) => (
                            <div key={article.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-900">{article.title}</h3>
                                        <p className="text-sm text-gray-500">
                                            {article.author} • {article.category} • {new Date(article.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            to={`/admin/articles/${article.id}/edit`}
                                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {recentArticles.length === 0 && (
                            <div className="px-6 py-8 text-center">
                                <p className="text-gray-500">No articles found</p>
                                <Link
                                    to="/admin/articles/new"
                                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-green-600 hover:bg-green-700"
                                >
                                    Create your first article
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
