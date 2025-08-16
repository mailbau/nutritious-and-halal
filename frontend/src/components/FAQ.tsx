
import { useEffect, useState } from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function FAQ() {
  const [faqs, setFaqs] = useState<{ q: string, a: string }[]>([])
  const [open, setOpen] = useState<number | null>(0)

  useEffect(() => {
    axios.get(`${API}/api/faqs`).then(r => setFaqs(r.data))
  }, [])

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="font-medium text-gray-900">{faq.q}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open === index ? 'rotate-180' : ''
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
