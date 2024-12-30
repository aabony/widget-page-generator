'use client'

import React from 'react'
import LandingPageGenerator from '../components/LandingPageGenerator'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Landing Page Generator</h1>
          <Link href="/admin" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Admin Dashboard
          </Link>
        </div>
        <LandingPageGenerator />
      </div>
    </main>
  )
}

