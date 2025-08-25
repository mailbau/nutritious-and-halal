export default function AboutPage() {
    const team = [
        { name: 'Fatima Khan', role: 'Lead Product Designer' },
        { name: 'Omar Hassan', role: 'Head Compliance Officer' },
        { name: 'Alana Ali', role: 'Technical Support Specialist' },
    ]
    const goals = [
        { title: 'Integritas Basis Data', desc: 'Keakuratan dan keandalan informasi halal' },
        { title: 'Aksesibilitas Pengguna', desc: 'Mudah digunakan untuk semua kalangan' },
        { title: 'Jangkauan Pendidikan', desc: 'Memperluas pemahaman masyarakat' },
    ]
    return (
        <div className="space-y-12">
            <section className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Tentang Kami</h1>
                <p className="text-lg text-gray-600">Platform tepercaya untuk membantu publik memeriksa status halal makanan.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6">Tim Kami</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {team.map((m) => (
                        <div key={m.name} className="bg-white rounded-2xl shadow p-6 text-center">
                            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-green-600">
                                {m.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3 className="mt-4 font-semibold">{m.name}</h3>
                            <p className="text-sm text-gray-600">{m.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6">Tujuan Kami</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {goals.map(g => (
                        <div key={g.title} className="bg-white rounded-2xl shadow p-6">
                            <h3 className="font-semibold mb-2">{g.title}</h3>
                            <p className="text-sm text-gray-600">{g.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

