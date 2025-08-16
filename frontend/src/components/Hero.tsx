
export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Panduan Anda untuk{' '}
                <span className="text-green-600">Makanan Halal</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Temukan status halal makanan, pahami bahan baku, dan pelajari praktik terbaik bersantap halal dengan informasi yang akurat dan terpercaya.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Pelajari
              </button>
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold px-8 py-4 rounded-xl transition-colors duration-200">
                Periksa Status
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/images/burger.jpg"
                alt="Burger Halal"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-100 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
