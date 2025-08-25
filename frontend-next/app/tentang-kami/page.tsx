"use client"

export default function AboutPage() {
    return (
        <div className="space-y-20">
            {/* Header */}
            <section className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Tentang Kami</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    NAY (Nutritious and Halal for You) adalah sarana edukasi gizi halal yang diinisiasi oleh Program Studi Gizi, Fakultas Kesehatan Masyarakat, Universitas Islam Negeri Sumatera Utara (UIN SU).
                </p>
            </section>

            {/* Main Content */}
            <section className="max-w-4xl mx-auto space-y-8">
                <div className="card p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Visi Kami</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Website ini lahir sebagai bentuk aktualisasi Latsar CPNS Dosen Prodi Gizi yang melihat adanya kebutuhan akan wadah terintegrasi untuk menyebarkan edukasi gizi halal kepada masyarakat sesuai visi misi Prodi Gizi FKM UINSU.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Melalui website ini, Prodi Gizi FKM UIN SU berkomitmen menghadirkan edukasi yang sejalan dengan visi dan misi program studi, yaitu mengembangkan ilmu gizi dengan perspektif halal, khususnya untuk masyarakat pesisir dan komunitas luas.
                    </p>
                </div>

                <div className="card p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Komunitas Halalnutri</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Selain itu, website ini juga menjadi cikal bakal lahirnya Halalnutri Community, sebuah komunitas mahasiswa Prodi Gizi yang berperan aktif dalam pengembangan dan penyebarluasan literasi gizi halal.
                    </p>
                </div>

                <div className="card p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Tujuan Ke Depan</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Ke depan, website ini diharapkan menjadi wadah bagi mahasiswa untuk:
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-green-600 font-bold text-sm">1</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                Menuangkan gagasan edukasi gizi halal
                            </p>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-green-600 font-bold text-sm">2</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                Mengembangkan media pembelajaran
                            </p>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-green-600 font-bold text-sm">3</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                Serta berkontribusi langsung dalam kegiatan pengabdian kepada masyarakat
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-green-50 rounded-3xl p-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Hubungi Kami</h2>
                    <div className="text-lg text-gray-700 mb-8 leading-relaxed space-y-2">
                        <p>Punya pertanyaan tentang makanan halal dan gizi?</p>
                        <p>Ingin mengundang mahasiswa Gizi UINSU untuk edukasi atau pelatihan?</p>
                        <p>Atau ingin menjadi mitra kami dalam menyuarakan kampanye halal?</p>
                        <p className="mt-4 font-medium">Hubungi kami melalui form di bawah atau kontak langsung tim kami!</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="card p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                            <p className="text-sm text-gray-600">info@nay-halal.com</p>
                        </div>
                        <div className="card p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Lokasi</h3>
                            <p className="text-sm text-gray-600">Jl. Lap. Golf No.120, Kp. Tengah, Kec. Pancur Batu, Kabupaten Deli Serdang, Sumatera Utara 20353</p>
                        </div>
                        <div className="card p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Instagram</h3>
                            <p className="text-sm text-gray-600">@halalnutricommunity.uinsu</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

