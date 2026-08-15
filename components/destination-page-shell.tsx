'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer' 
// import AssesssmentButton from '@/components/assessmentbutton'

interface DestinationPageShellProps {
  children: ReactNode
  selectedDestination?: string
  backHref?: string
  backLabel?: string
}

export default function DestinationPageShell({
  children,
  // selectedDestination,
  backHref = '/destinations',
  backLabel = 'Back to country list',
}: DestinationPageShellProps) {
  // const [isAssessmentOpen, setIsAssessmentOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
    
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      </div>

      {children}

      <Footer />
    </div>
  )
}
