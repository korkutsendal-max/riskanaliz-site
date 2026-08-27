'use client'
import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-12 bg-white/3 text-gray-200">
      <div className="max-w-6xl mx-auto p-6 flex justify-between items-center">
        <div>
          <div className="font-bold">RiskAnaliz</div>
          <div className="text-sm text-gray-400">© {new Date().getFullYear()} RiskAnaliz</div>
        </div>
        <div className="text-sm text-gray-400">info@riskanaliz.com.tr</div>
      </div>
    </footer>
  )
}
