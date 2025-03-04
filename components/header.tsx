import { UserCircle } from "lucide-react"
import Link from "next/link"

function HeartRateAnimation() {
  return (
    <svg viewBox="0 0 100 30" width="32" height="32" className="text-red-500">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="0,15 10,15 15,5 20,25 25,15 30,15 35,15 40,5 45,15 50,15 55,5 60,25 65,15 70,15 75,15 80,5 85,15 90,15 95,15 100,15"
        className="animate-pulse"
      />
    </svg>
  )
}

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <HeartRateAnimation />
          </div>
          <span className="font-bold text-xl text-gray-900">Dr.GPT</span>
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Dr. Roya Kargar</span>
          <UserCircle className="h-8 w-8 text-gray-700" />
        </div>
      </div>
    </header>
  )
}

