import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Printer } from "lucide-react"

interface PatientData {
  firstName: string
  lastName: string
  age: string
  gender: string
  bloodPressure: string
  temperature: string
  heartRate: string
  respiratoryRate: string
  symptoms: string
  medicalHistory: string
  allergies: string
  currentMedications: string
  dermatology: {
    skinRash: string
    itching: string
    skinChanges: string
  }
  gastroenterology: {
    abdominalPain: string
    nausea: string
    bowelChanges: string
  }
  cardiology: {
    chestPain: string
    palpitations: string
    shortness_of_breath: string
  }
  orthopedics: {
    currentPain: string
    painLocation: string
    painDuration: string
    painWorsensWithMovement: string
    painWorsensAtNight: string
    osteoporosis: string
    knownOrthopedicIssues: string
  }
}

interface DiagnosisResultProps {
  patientData: PatientData
  diagnosisText: string
  onBack: () => void
}

export function DiagnosisResult({ patientData, diagnosisText, onBack }: DiagnosisResultProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Card className="bg-white">
      <CardHeader className="bg-blue-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-blue-900">Diagnosebericht</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Drucken
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Patienteninformationen</h3>
              <p className="text-gray-600">
                {patientData.firstName} {patientData.lastName}, {patientData.age} Jahre, {patientData.gender}
              </p>
            </div>
            <div className="text-right">
              <h3 className="font-medium text-gray-900">Datum</h3>
              <p className="text-gray-600">{formatDate(new Date())}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-b py-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Vitalzeichen</h3>
              <ul className="space-y-1 text-gray-600">
                <li>
                  <span className="font-medium">Blutdruck:</span> {patientData.bloodPressure} mmHg
                </li>
                <li>
                  <span className="font-medium">Temperatur:</span> {patientData.temperature} °C
                </li>
                <li>
                  <span className="font-medium">Herzfrequenz:</span> {patientData.heartRate || "N/A"} bpm
                </li>
                <li>
                  <span className="font-medium">Atemfrequenz:</span> {patientData.respiratoryRate || "N/A"} Atemzüge/min
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Klinische Informationen</h3>
              <ul className="space-y-1 text-gray-600">
                <li>
                  <span className="font-medium">Symptome:</span> {patientData.symptoms}
                </li>
                <li>
                  <span className="font-medium">Krankengeschichte:</span>{" "}
                  {patientData.medicalHistory || "Keine angegeben"}
                </li>
                <li>
                  <span className="font-medium">Allergien:</span> {patientData.allergies || "Keine angegeben"}
                </li>
                <li>
                  <span className="font-medium">Aktuelle Medikamente:</span>{" "}
                  {patientData.currentMedications || "Keine angegeben"}
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Fachspezifische Informationen</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-gray-800">Dermatologie</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>
                    <span className="font-medium">Hautausschlag:</span>{" "}
                    {patientData.dermatology.skinRash || "Nicht angegeben"}
                  </li>
                  <li>
                    <span className="font-medium">Juckreiz:</span>{" "}
                    {patientData.dermatology.itching || "Nicht angegeben"}
                  </li>
                  <li>
                    <span className="font-medium">Hautveränderungen:</span>{" "}
                    {patientData.dermatology.skinChanges || "Nicht angegeben"}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Gastroenterologie</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>
                    <span className="font-medium">Bauchschmerzen:</span>{" "}
                    {patientData.gastroenterology.abdominalPain || "Nicht angegeben"}
                  </li>
                  <li>
                    <span className="font-medium">Übelkeit:</span>{" "}
                    {patientData.gastroenterology.nausea || "Nicht angegeben"}
                  </li>
                  <li>
                    <span className="font-medium">Veränderungen des Stuhlgangs:</span>{" "}
                    {patientData.gastroenterology.bowelChanges || "Nicht angegeben"}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Kardiologie</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>
                    <span className="font-medium">Brustschmerzen:</span>{" "}
                    {patientData.cardiology.chestPain || "Nicht angegeben"}
                  </li>
                  <li>
                    <span className="font-medium">Herzklopfen:</span>{" "}
                    {patientData.cardiology.palpitations || "Nicht angegeben"}
                  </li>
                  <li>
                    <span className="font-medium">Kurzatmigkeit:</span>{" "}
                    {patientData.cardiology.shortness_of_breath || "Nicht angegeben"}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Orthopädie</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>
                    <span className="font-medium">Aktuelle Beschwerden:</span>{" "}
                    {patientData.orthopedics.currentPain || "Nicht angegeben"}
                  </li>
                  <li>
                    <span className="font-medium">Körperregion:</span>{" "}
                    {patientData.orthopedics.painLocation || "Nicht angegeben"}
                  </li>
                  <li>
                    <span className="font-medium">Beschwerden seit:</span>{" "}
                    {patientData.orthopedics.painDuration || "Nicht angegeben"}
                  </li>
                  <li>
                    <span className="font-medium">Schmerzen bei Bewegung:</span>{" "}
                    {patientData.orthopedics.painWorsensWithMovement || "Nicht angegeben"}
                  </li>
                  <li>
                    <span className="font-medium">Schmerzen in der Nacht:</span>{" "}
                    {patientData.orthopedics.painWorsensAtNight || "Nicht angegeben"}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">KI-unterstützte Diagnose</h3>
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <p className="text-gray-800 whitespace-pre-line">{diagnosisText}</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100 text-sm">
              <p className="text-yellow-800 font-medium">Haftungsausschluss:</p>
              <p className="text-yellow-700 mt-1">
                Diese Diagnose wurde KI-unterstützt erstellt und sollte von einem Gesundheitsexperten überprüft werden.
                Sie ersetzt keine professionelle ärztliche Beratung, Diagnose oder Behandlung.
              </p>
            </div>
          </div>

          <div className="flex justify-start">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zu Patienteninformationen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

