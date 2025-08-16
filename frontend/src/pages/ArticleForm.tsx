import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function ArticleForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
        category: '',
        author: '',
        image: null as File | null
    });

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        if (id) {
            fetchArticle();
        }
    }, [id, navigate]);

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`${API}/api/articles/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const article = response.data;
            setFormData({
                title: article.title || '',
                summary: article.summary || '',
                content: article.content || '',
                category: article.category || '',
                author: article.author || '',
                image: null
            });
        } catch (error: any) {
            setError(error.response?.data?.error || 'Failed to fetch article');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const token = localStorage.getItem('adminToken');
            const formDataToSend = new FormData();

            formDataToSend.append('title', formData.title);
            formDataToSend.append('summary', formData.summary);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('author', formData.author);

            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            };

            if (id) {
                await axios.put(`${API}/api/articles/${id}`, formDataToSend, { headers });
            } else {
                await axios.post(`${API}/api/articles`, formDataToSend, { headers });
            }

            navigate('/admin/dashboard');
        } catch (error: any) {
            setError(error.response?.data?.error || 'Failed to save article');
        } finally {
            setSaving(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
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
                            <h1 className="text-2xl font-bold text-gray-900">
                                {id ? 'Edit Article' : 'Create New Article'}
                            </h1>
                        </div>
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                                Summary *
                            </label>
                            <textarea
                                id="summary"
                                required
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                value={formData.summary}
                                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <textarea
                                id="content"
                                required
                                rows={10}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Select category</option>
                                    <option value="Sertifikasi">Sertifikasi</option>
                                    <option value="Edukasi">Edukasi</option>
                                    <option value="Penelitian">Penelitian</option>
                                    <option value="Tips">Tips</option>
                                    <option value="Berita">Berita</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                                    Author
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                Featured Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                onChange={handleFileChange}
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Upload an image (JPG, PNG, GIF). Maximum size: 5MB.
                            </p>
                        </div>

                        <div className="flex items-center justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/dashboard')}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </div>
                                ) : (
                                    id ? 'Update Article' : 'Create Article'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
