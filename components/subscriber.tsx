"use client"

import { useEffect, useState } from "react"

type SubscriberProps = {
    isOpen: boolean
    onClose: () => void
}
import { Button } from "./ui/button"

const COOLDOWN_MS = 120_000

export default function Subscriber({ isOpen, onClose }: SubscriberProps) {
    const [formData, setFormData] = useState({
        email: ''
    })

    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const resetForm = () => {
        setFormData({
            email: ''
        })

        setErrorMessage(null)
        setSubmitted(false)
        setIsSubmitting(false)
    }

    useEffect(() => {
        if (isOpen) {
            resetForm()
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

        const lastSubmissionAt = window.sessionStorage.getItem('subscriber-last-submit-at')
        if (lastSubmissionAt) {
            const elapsed = Date.now() - Number(lastSubmissionAt)
            if (elapsed < COOLDOWN_MS) {
                const remainingSeconds = Math.ceil((COOLDOWN_MS - elapsed) / 1000)
                setErrorMessage(`Please wait ${remainingSeconds} seconds before sending another request.`)

                return
            }
        }

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/subscriber-email', {
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

            window.sessionStorage.setItem('subscriber-last-submit-at', String(Date.now()))
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
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mx-auto max-w-2xl">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button type="submit"
                            disabled={isSubmitting}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 whitespace-nowrap"
                            
                            >
                            {isSubmitting ? 'Sending...' : 'Subscribe'}
                        </Button>
                        <br/>
                        {submitted ? (
                            <p className="text-green-600 font-medium mt-2">
                                Thank you for subscribing! Please check your email for confirmation.
                            </p>
                        ) : null}
                    </div>

                    {errorMessage ? (
                        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                            {errorMessage}
                        </p>
                    ) : null}

                </div>
            </form>
        </>
    )
}
