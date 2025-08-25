export default function GamesPage() {
    const games = [
        { title: 'Kuis Makanan Halal', desc: 'Uji pengetahuan Anda', type: 'Pilihan Ganda' },
        { title: 'Fakta Halal', desc: 'Benar atau Salah', type: 'True/False' },
    ]
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Games</h1>
            <div className="grid md:grid-cols-2 gap-6">
                {games.map(g => (
                    <div key={g.title} className="bg-white rounded-2xl shadow p-6">
                        <div className="text-sm text-gray-500 mb-2">{g.type}</div>
                        <h3 className="font-semibold mb-1">{g.title}</h3>
                        <p className="text-sm text-gray-600">{g.desc}</p>
                        <button className="mt-4 bg-green-600 text-white rounded-xl px-4 py-2">Mulai</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

