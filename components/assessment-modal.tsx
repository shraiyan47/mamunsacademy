'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AssessmentModalProps {
  isOpen: boolean
  onClose: () => void
}

const COOLDOWN_MS = 120_000

export default function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    completionYear: '',
    cgpa: '',
    languageTest: '',
    languageScore: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [captchaInput, setCaptchaInput] = useState('')
  const [captcha, setCaptcha] = useState({
    a: 0,
    b: 0,
    operator: '+',
    answer: 0,
  })

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      qualification: '',
      completionYear: '',
      cgpa: '',
      languageTest: '',
      languageScore: '',
    })
    setCaptchaInput('')
    setErrorMessage(null)
    setSubmitted(false)
    setIsSubmitting(false)
  }

  const generateCaptcha = () => {
    const operators = ['+', '-', '×'] as const
    const operator = operators[Math.floor(Math.random() * operators.length)]
    const a = Math.floor(Math.random() * 12) + 1
    const b = Math.floor(Math.random() * 12) + 1

    let answer = 0
    if (operator === '+') answer = a + b
    if (operator === '-') answer = a - b
    if (operator === '×') answer = a * b

    setCaptcha({ a, b, operator, answer })
    setCaptchaInput('')
  }

  useEffect(() => {
    if (isOpen) {
      resetForm()
      generateCaptcha()
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    const lastSubmissionAt = window.sessionStorage.getItem('assessment-last-submit-at')
    if (lastSubmissionAt) {
      const elapsed = Date.now() - Number(lastSubmissionAt)
      if (elapsed < COOLDOWN_MS) {
        const remainingSeconds = Math.ceil((COOLDOWN_MS - elapsed) / 1000)
        setErrorMessage(`Please wait ${remainingSeconds} seconds before sending another request.`)
        generateCaptcha()
        return
      }
    }

    if (Number(captchaInput) !== captcha.answer) {
      setErrorMessage('Please solve the captcha correctly before submitting.')
      generateCaptcha()
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-assessment-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Unable to send email right now.')
      }

      window.sessionStorage.setItem('assessment-last-submit-at', String(Date.now()))
      setSubmitted(true)

      // Reset form after 2 seconds
      setTimeout(() => {
        resetForm()
        onClose()
      }, 2000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to send email right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-lg bg-background shadow-lg">
          {/* Header */}
          <div className="border-b border-border bg-primary px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary-foreground">Free Assessment</h2>
            <button
              onClick={onClose}
              className="text-primary-foreground hover:opacity-80 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-4 sm:p-6">
            {submitted ? (
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Thank You!</h3>
                <p className="text-muted-foreground text-sm">
                  Your assessment request has been received. Our team will contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="+880 1XXXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="qualification" className="block text-sm font-medium text-foreground mb-2">
                    Last Academic Qualification *
                  </label>
                  <select
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select your qualification</option>
                    <option value="O Level">O Level</option>
                    <option value="A Level">A Level</option>
                    <option value="SSC">SSC</option>
                    <option value="HSC">HSC</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor&apos;s Degree</option>
                    <option value="Master">Master&apos;s Degree</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="completionYear" className="block text-sm font-medium text-foreground mb-2">
                      Year of Completion
                    </label>
                    <input
                      type="number"
                      id="completionYear"
                      name="completionYear"
                      value={formData.completionYear}
                      onChange={handleChange}
                      min="1900"
                      max="2100"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="e.g. 2024"
                    />
                  </div>

                  <div>
                    <label htmlFor="cgpa" className="block text-sm font-medium text-foreground mb-2">
                      CGPA Score
                    </label>
                    <input
                      type="text"
                      id="cgpa"
                      name="cgpa"
                      value={formData.cgpa}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="e.g. 3.80"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <label htmlFor="languageTest" className="block text-sm font-medium text-foreground mb-2">
                      Language Proficiency
                    </label>
                    <select
                      id="languageTest"
                      name="languageTest"
                      value={formData.languageTest}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Select test</option>
                      <option value="IELTS">IELTS</option>
                      <option value="TOEFL">TOEFL</option>
                      <option value="PTE">PTE</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="languageScore" className="block text-sm font-medium text-foreground mb-2">
                      Score
                    </label>
                    <input
                      type="text"
                      id="languageScore"
                      name="languageScore"
                      value={formData.languageScore}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="e.g. 6.5"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <label htmlFor="captcha" className="block text-sm font-medium text-foreground mb-2">
                    Solve this to continue: {captcha.a} {captcha.operator} {captcha.b}
                  </label>
                  <input
                    type="number"
                    id="captcha"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter the answer"
                  />
                </div>

                {errorMessage ? (
                  <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                    {errorMessage}
                  </p>
                ) : null}

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Assessment'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We&apos;ll review your information and contact you within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
