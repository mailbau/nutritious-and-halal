"use client"
import { useState } from 'react'

export default function ContactPage() {
    const [sent, setSent] = useState(false)
    function submit(e: React.FormEvent) {
        e.preventDefault(); setSent(true)
    }
    return (
        <div className="space-y-20">
            {/* Header */}
            <section className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Kontak Kami</h1>
                <div className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed space-y-2">
                    <p>Punya pertanyaan tentang makanan halal dan gizi?</p>
                    <p>Ingin mengundang mahasiswa Gizi UINSU untuk edukasi atau pelatihan?</p>
                    <p>Atau ingin menjadi mitra kami dalam menyuarakan kampanye halal?</p>
                    <p className="mt-4 font-medium">Hubungi kami melalui form di bawah atau kontak langsung tim kami!</p>
                </div>
            </section>

            {/* Contact Form and Info */}
            <section className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="card p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Anda
                                </label>
                                <input
                                    id="name"
                                    className="input-field"
                                    placeholder="Masukkan nama lengkap"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Anda
                                </label>
                                <input
                                    id="email"
                                    className="input-field"
                                    placeholder="Masukkan email"
                                    type="email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Pesan Anda
                                </label>
                                <textarea
                                    id="message"
                                    className="input-field"
                                    placeholder="Tulis pesan Anda di sini..."
                                    rows={5}
                                    required
                                />
                            </div>
                            <button className="btn-primary w-full">
                                Kirim Pesan
                            </button>
                            {sent && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <p className="text-green-600 text-center">Pesan terkirim! (demo)</p>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="card p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600">info@nay-halal.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Lokasi</h3>
                                        <p className="text-gray-600">Jl. Lap. Golf No.120, Kp. Tengah, Kec. Pancur Batu, Kabupaten Deli Serdang, Sumatera Utara 20353</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Instagram</h3>
                                        <p className="text-gray-600">@halalnutricommunity.uinsu</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Jam Operasional</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Senin - Jumat</span>
                                    <span className="font-medium">08:00 - 16:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sabtu</span>
                                    <span className="font-medium">08:00 - 12:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Minggu</span>
                                    <span className="font-medium">Tutup</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

