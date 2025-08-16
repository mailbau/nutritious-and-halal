
import axios from 'axios'
import { useEffect, useState } from 'react'
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Ingredients() {
  const categories = [
    {
      title: 'Sumber Karbohidrat',
      icon: '🌾',
      description: 'Nasi, roti, pasta, dan sumber karbohidrat lainnya'
    },
    {
      title: 'Sumber Protein',
      icon: '🥩',
      description: 'Daging, ikan, telur, dan sumber protein lainnya'
    },
    {
      title: 'Sumber Vitamin',
      icon: '🥕',
      description: 'Sayuran, buah-buahan, dan sumber vitamin lainnya'
    },
    {
      title: 'Sumber Mineral',
      icon: '🥛',
      description: 'Susu, keju, dan sumber mineral lainnya'
    },
    {
      title: 'Bahan Tambahan Pangan',
      icon: '🧪',
      description: 'Pengawet, pewarna, dan bahan tambahan lainnya'
    },
    {
      title: 'Bahan Siap Saji',
      icon: '🍔',
      description: 'Makanan kemasan dan produk siap konsumsi'
    }
  ]

  const questions = [
    'Apakah boleh mengonsumsi makanan yang mengandung gelatin?',
    'Apakah boleh mengonsumsi makanan yang mengandung MSG?',
    'Apakah boleh mengonsumsi makanan yang mengandung emulsifier?',
    'Apakah boleh mengonsumsi makanan yang mengandung ragi?',
    'Is it permissible to consume food containing food coloring?',
    'Is it permissible to consume food containing food flavoring?',
    'Is it permissible to consume food containing food preservatives?',
    'Is it permissible to consume food containing food thickeners?'
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Bahan Makanan Halal</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Periksa status halal berbagai bahan makanan dan pahami kandungan yang perlu diperhatikan dalam memilih makanan halal.
        </p>
      </section>

      {/* Periksa Status Halal Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Periksa Status Halal</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center group cursor-pointer transform hover:-translate-y-2">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
              <p className="text-gray-600 leading-relaxed">{category.description}</p>
              <button className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200">
                Periksa
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Observasi Makanan Halal Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Observasi Makanan Halal</h2>
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer group">
                <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                  {question}
                </span>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Check Halal Certified Products from BPJPH
            </button>
          </div>
        </div>
      </section>

      {/* Quick Guide Section */}
      <section className="bg-green-50 rounded-3xl p-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Panduan Cepat</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Pelajari cara mengidentifikasi bahan halal dan non-halal dengan mudah melalui panduan visual dan penjelasan yang komprehensif.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Halal</h3>
              <p className="text-sm text-gray-600">Bahan yang diperbolehkan untuk dikonsumsi</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Haram</h3>
              <p className="text-sm text-gray-600">Bahan yang tidak diperbolehkan untuk dikonsumsi</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Syubhat</h3>
              <p className="text-sm text-gray-600">Bahan yang meragukan status halalnya</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
