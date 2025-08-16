
export default function Games() {
  const games = [
    {
      title: 'Kuis Makanan Halal',
      type: 'Pilihan Ganda',
      description: 'Uji pengetahuan Anda tentang makanan halal dengan pertanyaan pilihan ganda yang interaktif',
      image: '/images/coffee.jpg',
      icon: '☕',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Fakta Halal',
      type: 'Benar atau Salah',
      description: 'Tebak apakah pernyataan tentang makanan halal benar atau salah',
      image: '/images/burger.jpg',
      icon: '🍔',
      color: 'from-green-500 to-teal-600'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Games</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Belajar tentang makanan halal dengan cara yang menyenangkan melalui berbagai permainan edukatif yang interaktif.
        </p>
      </section>

      {/* Games Grid */}
      <section>
        <div className="grid md:grid-cols-2 gap-8">
          {games.map((game, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={game.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={game.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur text-gray-800 text-sm px-4 py-2 rounded-full font-medium">
                    {game.type}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="text-4xl mb-2">{game.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
                  <p className="text-white/90 text-sm max-w-xs">{game.description}</p>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{game.title}</h4>
                    <p className="text-gray-600 text-sm">{game.description}</p>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Mulai
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-green-50 rounded-3xl p-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fitur Games</h2>
          <p className="text-lg text-gray-700">
            Nikmati pengalaman belajar yang menyenangkan dengan fitur-fitur interaktif yang dirancang khusus untuk meningkatkan pemahaman Anda tentang makanan halal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Belajar Interaktif</h3>
            <p className="text-gray-600">Gunakan metode pembelajaran yang menyenangkan dan mudah dipahami</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Skor Real-time</h3>
            <p className="text-gray-600">Dapatkan feedback langsung dan pantau kemajuan belajar Anda</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Waktu Fleksibel</h3>
            <p className="text-gray-600">Mainkan kapan saja dan di mana saja sesuai waktu luang Anda</p>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Papan Skor</h2>
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="space-y-4">
            {[
              { name: 'Ahmad Fauzi', score: 950, rank: 1 },
              { name: 'Siti Nurhaliza', score: 920, rank: 2 },
              { name: 'Muhammad Rizki', score: 890, rank: 3 },
              { name: 'Fatima Zahra', score: 870, rank: 4 },
              { name: 'Omar Abdullah', score: 850, rank: 5 }
            ].map((player, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${player.rank === 1 ? 'bg-yellow-500' :
                      player.rank === 2 ? 'bg-gray-400' :
                        player.rank === 3 ? 'bg-yellow-600' : 'bg-green-600'
                    }`}>
                    {player.rank}
                  </div>
                  <span className="font-medium text-gray-900">{player.name}</span>
                </div>
                <span className="font-bold text-green-600">{player.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
