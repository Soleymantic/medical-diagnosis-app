import { DiagnosisForm } from "@/components/diagnosis-form"
import { Header } from "@/components/header"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Dr.GPT Diagnosis Assistant</h1>
          <p className="mt-2 text-red-600">Enter patient details to receive an AI-assisted diagnosis</p>
        </div>
        <DiagnosisForm />
      </main>
    </div>
  )
}

