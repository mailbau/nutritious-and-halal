"use client"
import { useState } from 'react'

export default function ContactPage() {
    const [sent, setSent] = useState(false)
    function submit(e: React.FormEvent) {
        e.preventDefault(); setSent(true)
    }
    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Kontak Kami</h1>
            <form onSubmit={submit} className="bg-white rounded-2xl shadow p-6 space-y-4">
                <input className="w-full border rounded-xl px-4 py-3" placeholder="Nama Anda" required />
                <input className="w-full border rounded-xl px-4 py-3" placeholder="Email Anda" type="email" required />
                <textarea className="w-full border rounded-xl px-4 py-3" placeholder="Pesan Anda" rows={5} required />
                <button className="bg-green-600 text-white px-6 py-3 rounded-xl">Kirim</button>
                {sent && <p className="text-green-600">Pesan terkirim! (demo)</p>}
            </form>
        </div>
    )
}

