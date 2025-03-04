"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Loader2 } from "lucide-react"
import { DiagnosisResult } from "@/components/diagnosis-result"

type PatientDataNestedFields = {
  [K in "dermatology" | "gastroenterology" | "cardiology"]: {
    [field: string]: string
  }
}

interface PatientData extends PatientDataNestedFields {
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
}

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
}

const initialPatientData: PatientData = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  bloodPressure: "",
  temperature: "",
  heartRate: "",
  respiratoryRate: "",
  symptoms: "",
  medicalHistory: "",
  allergies: "",
  currentMedications: "",
  dermatology: {
    skinRash: "",
    itching: "",
    skinChanges: "",
  },
  gastroenterology: {
    abdominalPain: "",
    nausea: "",
    bowelChanges: "",
  },
  cardiology: {
    chestPain: "",
    palpitations: "",
    shortness_of_breath: "",
  },
}

const API_URL = "https://drgpt-backend.onrender.com/api/diagnosis";

export function DiagnosisForm() {
  const [patientData, setPatientData] = useState<PatientData>(initialPatientData)
  const [isLoading, setIsLoading] = useState(false)
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("patient-info")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPatientData((prev) => ({ ...prev, [name]: value }))
  }

  type NestedCategory = Extract<keyof PatientData, "dermatology" | "gastroenterology" | "cardiology">

  const handleNestedInputChange = (category: NestedCategory, field: string, value: string) => {
    setPatientData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      } as PatientData[NestedCategory],
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setPatientData((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = () => {
    const requiredFields = ["firstName", "lastName", "age", "gender", "bloodPressure", "temperature", "symptoms"]
    return requiredFields.every((field) => patientData[field as keyof PatientData].toString().trim() !== "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      alert("Bitte füllen Sie alle erforderlichen Felder aus")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: generatePrompt(patientData),
      })

      if (!res.ok) throw new Error("Fehler beim Laden der Diagnose")

      const data = await res.json()
      setDiagnosisResult(data.diagnosis)
      setActiveTab("diagnosis")
    } catch (error) {
      console.error("API Fehler:", error)
      alert("Fehler beim Abrufen der Diagnose. Bitte versuchen Sie es erneut.")
    } finally {
      setIsLoading(false)
    }
  }

  const generatePrompt = (data: PatientData): string => {
    return `Based on the patients informations, can you make a diagnosis what it can be? ${JSON.stringify(data)}. Can you suggest next steps what to do? Act like a doctor and suggest what to do. Also add a diagnostic. Can you also add the medicines which is needed for the diagnosis? Add a good structure and 
    translate it in german. `;
  }

  const resetForm = () => {
    setPatientData(initialPatientData)
    setDiagnosisResult(null)
    setActiveTab("patient-info")
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="patient-info">Patienteninformationen</TabsTrigger>
          <TabsTrigger value="diagnosis" disabled={!diagnosisResult}>
            Diagnose
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patient-info">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={patientData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={patientData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">
                      Age <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      min="0"
                      max="120"
                      value={patientData.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select value={patientData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Vitalzeichen</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bloodPressure">
                        Blood Pressure (mmHg) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="bloodPressure"
                        name="bloodPressure"
                        placeholder="e.g., 120/80"
                        value={patientData.bloodPressure}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="temperature">
                        Temperature (°C) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="temperature"
                        name="temperature"
                        placeholder="e.g., 37.0"
                        value={patientData.temperature}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                      <Input
                        id="heartRate"
                        name="heartRate"
                        placeholder="e.g., 75"
                        value={patientData.heartRate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="respiratoryRate">Respiratory Rate (breaths/min)</Label>
                      <Input
                        id="respiratoryRate"
                        name="respiratoryRate"
                        placeholder="e.g., 16"
                        value={patientData.respiratoryRate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Fachspezifische Fragen</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="dermatology">
                      <AccordionTrigger>Dermatologische Fragen</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="skinRash">Hautausschlag</Label>
                            <Textarea
                              id="skinRash"
                              value={patientData.dermatology.skinRash}
                              onChange={(e) => handleNestedInputChange("dermatology", "skinRash", e.target.value)}
                              placeholder="Beschreiben Sie den Hautausschlag"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="itching">Juckreiz</Label>
                            <Textarea
                              id="itching"
                              value={patientData.dermatology.itching}
                              onChange={(e) => handleNestedInputChange("dermatology", "itching", e.target.value)}
                              placeholder="Beschreiben Sie den Juckreiz"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="skinChanges">Hautveränderungen</Label>
                            <Textarea
                              id="skinChanges"
                              value={patientData.dermatology.skinChanges}
                              onChange={(e) => handleNestedInputChange("dermatology", "skinChanges", e.target.value)}
                              placeholder="Beschreiben Sie die Hautveränderungen"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="gastroenterology">
                      <AccordionTrigger>Gastroenterologische Fragen</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="abdominalPain">Bauchschmerzen</Label>
                            <Textarea
                              id="abdominalPain"
                              value={patientData.gastroenterology.abdominalPain}
                              onChange={(e) =>
                                handleNestedInputChange("gastroenterology", "abdominalPain", e.target.value)
                              }
                              placeholder="Beschreiben Sie die Bauchschmerzen"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nausea">Übelkeit</Label>
                            <Textarea
                              id="nausea"
                              value={patientData.gastroenterology.nausea}
                              onChange={(e) => handleNestedInputChange("gastroenterology", "nausea", e.target.value)}
                              placeholder="Beschreiben Sie die Übelkeit"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bowelChanges">Veränderungen des Stuhlgangs</Label>
                            <Textarea
                              id="bowelChanges"
                              value={patientData.gastroenterology.bowelChanges}
                              onChange={(e) =>
                                handleNestedInputChange("gastroenterology", "bowelChanges", e.target.value)
                              }
                              placeholder="Beschreiben Sie die Veränderungen des Stuhlgangs"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="cardiology">
                      <AccordionTrigger>Kardiologische Fragen</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="chestPain">Brustschmerzen</Label>
                            <Textarea
                              id="chestPain"
                              value={patientData.cardiology.chestPain}
                              onChange={(e) => handleNestedInputChange("cardiology", "chestPain", e.target.value)}
                              placeholder="Beschreiben Sie die Brustschmerzen"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="palpitations">Herzklopfen</Label>
                            <Textarea
                              id="palpitations"
                              value={patientData.cardiology.palpitations}
                              onChange={(e) => handleNestedInputChange("cardiology", "palpitations", e.target.value)}
                              placeholder="Beschreiben Sie das Herzklopfen"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="shortness_of_breath">Kurzatmigkeit</Label>
                            <Textarea
                              id="shortness_of_breath"
                              value={patientData.cardiology.shortness_of_breath}
                              onChange={(e) =>
                                handleNestedInputChange("cardiology", "shortness_of_breath", e.target.value)
                              }
                              placeholder="Beschreiben Sie die Kurzatmigkeit"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Allgemeine klinische Informationen</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="symptoms">
                        Presenting Symptoms <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="symptoms"
                        name="symptoms"
                        placeholder="Describe the patient's symptoms"
                        rows={3}
                        value={patientData.symptoms}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicalHistory">Medical History</Label>
                      <Textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        placeholder="Relevant medical history"
                        rows={3}
                        value={patientData.medicalHistory}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        name="allergies"
                        placeholder="Known allergies"
                        rows={2}
                        value={patientData.allergies}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentMedications">Current Medications</Label>
                      <Textarea
                        id="currentMedications"
                        name="currentMedications"
                        placeholder="Current medications and dosages"
                        rows={2}
                        value={patientData.currentMedications}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Zurücksetzen
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-400" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Diagnose wird generiert...
                      </>
                    ) : (
                      "Diagnose generieren"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnosis">
          {diagnosisResult && (
            <DiagnosisResult
              patientData={patientData}
              diagnosisText={diagnosisResult}
              onBack={() => setActiveTab("patient-info")}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

