import './globals.css'
import Link from 'next/link'

export const metadata = {
    title: 'NAY Halal Guide',
    description: 'Panduan halal makanan',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="id">
            <body className="min-h-screen bg-gray-50 text-gray-700">
                <header className="bg-white shadow-soft border-b border-gray-100 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Link href="/" className="flex items-center gap-3 group">
                                <img src="/assets/logonay.png" className="h-10 w-10 rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-200" alt="NAY" />
                                <span className="font-bold text-xl text-gray-900 group-hover:text-green-600 transition-colors duration-200">NAY Halal Guide</span>
                            </Link>
                            <nav className="hidden md:flex items-center space-x-8">
                                <Link href="/" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors duration-200">Beranda</Link>
                                <Link href="/tentang-kami" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors duration-200">Tentang Kami</Link>
                                <Link href="/pojok-edukasi" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors duration-200">Pojok Edukasi</Link>
                                <Link href="/bahan-halal" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors duration-200">Periksa Halal</Link>
                                <Link href="/games" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors duration-200">Games</Link>
                                <Link href="/kontak" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors duration-200">Kontak</Link>
                            </nav>
                        </div>
                    </div>
                </header>

                <main className="min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </div>
                </main>

                <footer className="bg-white border-t border-gray-200 mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <img src="/assets/logonay.png" className="h-8 w-8 rounded-lg" alt="NAY" />
                                    <span className="font-bold text-lg text-gray-900">NAY Halal Guide</span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Platform tepercaya untuk membantu publik memeriksa status halal makanan dengan informasi yang akurat dan terpercaya.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900">Tautan Cepat</h3>
                                <div className="space-y-2">
                                    <Link href="/tentang-kami" className="block text-sm text-gray-600 hover:text-green-600 transition-colors duration-200">Tentang Kami</Link>
                                    <Link href="/pojok-edukasi" className="block text-sm text-gray-600 hover:text-green-600 transition-colors duration-200">Pojok Edukasi</Link>
                                    <Link href="/bahan-halal" className="block text-sm text-gray-600 hover:text-green-600 transition-colors duration-200">Periksa Halal</Link>
                                    <Link href="/games" className="block text-sm text-gray-600 hover:text-green-600 transition-colors duration-200">Games</Link>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900">Kontak</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>Email: info@nayhalalguide.com</p>
                                    <p>Telepon: +62 21 1234 5678</p>
                                    <p>Alamat: Jakarta, Indonesia</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                            <p className="text-gray-500 text-sm">
                                © {new Date().getFullYear()} NAY Halal Guide. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    )
}

