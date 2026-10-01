import React from "react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-4xl font-extrabold mb-2 text-[#00e676]">404</h2>
      <p className="text-slate-400 mb-6">Page Not Found</p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-[#00e676] text-black font-semibold hover:bg-emerald-400 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}
