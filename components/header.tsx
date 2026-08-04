'use client'

import { useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'

interface HeaderProps {
  onAssessmentClick: () => void
}

export default function Header({ onAssessmentClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-bold text-white text-lg">MA</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-foreground">Mamun&apos;s</span>
            <p className="text-xs text-muted-foreground">Academy</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden gap-2 lg:flex items-center">
          <a href="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md transition">
            Home
          </a>
          
          <a href="#Destinations" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md transition">
            Destinations
          </a>
          
          <a href="#Services" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md transition">
            Services
          </a>

          <a href="#About" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md transition">
            About Us
          </a>
          <a href="#Testimonials" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md transition">
            Testimonials
          </a>
          
          <a href="#Contact" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md transition">
            Contact
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <a 
            href="https://wa.me/8801634000035" 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition font-medium text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={onAssessmentClick}
            className="hidden sm:flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Free Assessment
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            <a href="/" className="px-3 py-2 text-foreground hover:text-primary">Home</a>
            <a href="#" className="px-3 py-2 text-foreground hover:text-primary">About Us</a>
            <a href="#" className="px-3 py-2 text-foreground hover:text-primary">Universities</a>
            <a href="#" className="px-3 py-2 text-foreground hover:text-primary">Services</a>
            <a href="#" className="px-3 py-2 text-foreground hover:text-primary">Contact</a>
            
            <button
              type="button"
              onClick={onAssessmentClick}
              className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Free Assessment
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
