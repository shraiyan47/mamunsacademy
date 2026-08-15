"use client"

import { useState } from "react"

import AssessmentModal from '@/components/assessment-modal'


interface assessmentButtonProps {
    selectedDestination?: string
}

export default function Subscriber({ selectedDestination }: assessmentButtonProps) {

    const [isAssessmentOpen, setIsAssessmentOpen] = useState(false)

    return (
        <>
            <AssessmentModal
                isOpen={isAssessmentOpen}
                onClose={() => setIsAssessmentOpen(false)}
                defaultDestination={selectedDestination}
            />
            <button
                type="button"
                onClick={() => setIsAssessmentOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
                Apply now for {selectedDestination}
            </button>
        </>
    )
}
