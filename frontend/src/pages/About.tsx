
export default function About() {
  const team = [
    {
      name: 'Fatima Khan',
      role: 'Lead Product Designer',
      image: '/images/team1.jpg'
    },
    {
      name: 'Omar Hassan',
      role: 'Head Compliance Officer',
      image: '/images/team2.jpg'
    },
    {
      name: 'Alana Ali',
      role: 'Technical Support Specialist',
      image: '/images/team3.jpg'
    }
  ]

  const goals = [
    {
      title: 'Integritas Basis Data',
      description: 'Memastikan keakuratan dan keandalan informasi halal yang disediakan',
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      )
    },
    {
      title: 'Aksesibilitas Pengguna',
      description: 'Menyediakan platform yang mudah digunakan dan diakses oleh semua kalangan',
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: 'Jangkauan Pendidikan',
      description: 'Memperluas pemahaman masyarakat tentang makanan halal melalui edukasi',
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Tentang Kami</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Kami membangun platform yang menyediakan informasi tepercaya untuk membantu publik memeriksa status halal makanan dengan standar yang tinggi dan akurasi yang terjamin.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-green-50 rounded-3xl p-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Misi Kami</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Menjadi sumber informasi terpercaya dan terdepan dalam hal makanan halal, menyediakan data yang akurat, mudah diakses, dan selalu diperbarui untuk membantu masyarakat membuat pilihan makanan yang tepat sesuai dengan prinsip halal.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Tim Kami</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto flex items-center justify-center text-4xl font-bold text-green-600 group-hover:scale-105 transition-transform duration-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-green-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Goals Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Tujuan Kami</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                {goal.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{goal.title}</h3>
              <p className="text-gray-600 leading-relaxed">{goal.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
