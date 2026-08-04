'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface DestinationProps {
    onAssessmentClick: () => void
}

export default function Destination({ onAssessmentClick }: DestinationProps) {
    const destinations = [
        'United Kingdom',
        'Canada',
        'Australia',
        'USA',
        'Germany',
        'Hungary',
        'Malta',
        'Italy',
        'Greece',
        'Malaysia'
    ]
    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {destinations.map((dest, index) => (
                    <Link
                        key={index}
                        href={`/destinations/${dest.toLowerCase().replace(/\s+/g, '-')}`}
                        className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition group cursor-pointer"
                    >
                        <div className="flex items-center gap-2 group-hover:text-primary transition">
                            {/* <Globe className="h-5 w-5" /> */}
                            {dest === 'United Kingdom' && <img src="/svg/uk.svg" alt="United Kingdom" className="h-5 w-8 rounded-sm shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />}
                            {dest === 'Canada' && <img src="/svg/canada.svg" alt="Canada" className="h-5 w-8 rounded-sm shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />}
                            {dest === 'Australia' && <img src="/svg/australia.svg" alt="Australia" className="h-5 w-8 rounded-sm shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />}
                            {dest === 'USA' && <img src="/svg/usa.svg" alt="USA" className="h-5 w-8 rounded-sm shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />}
                            {dest === 'Germany' && <img src="/svg/germany.svg" alt="Germany" className="h-5 w-8 rounded-sm shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />}
                            {dest === 'Hungary' && <img src="/svg/hungary.svg" alt="Hungary" className="h-5 w-8 rounded-sm shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />}
                            {dest === 'Malta' && <img src="/svg/malta.svg" alt="Malta" className="h-5 w-8 rounded-sm shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />}
                            {dest === 'Italy' && <img src="/svg/italy.svg" alt="Italy" className="h-5 w-8 rounded-sm shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />}
                            {dest === 'Greece' && <img src="/svg/greece.svg" alt="Greece" className="h-5 w-8 rounded-sm shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />}
                            {dest === 'Malaysia' && <img src="/svg/malaysia.svg" alt="Malaysia" className="h-5 w-8 rounded-sm shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />}
                            <span className="font-semibold text-sm">{dest}</span>
                            <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition" />
                        </div>
                    </Link>
                ))}
            </div>
        </>

    )
}