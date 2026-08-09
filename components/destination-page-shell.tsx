'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AssessmentModal from '@/components/assessment-modal'

interface DestinationPageShellProps {
  children: ReactNode
  selectedDestination?: string
  backHref?: string
  backLabel?: string
}

export default function DestinationPageShell({
  children,
  selectedDestination,
  backHref = '/destinations',
  backLabel = 'Back to country list',
}: DestinationPageShellProps) {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onAssessmentClick={() => setIsAssessmentOpen(true)} />
      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        defaultDestination={selectedDestination}
      />

      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        {selectedDestination ? (
          <button
            type="button"
            onClick={() => setIsAssessmentOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Apply now for {selectedDestination}
          </button>
        ) : null}
      </div>

      {children}

      <Footer />
    </div>
  )
}
