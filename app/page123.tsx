'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { 
  Star, ArrowRight, CheckCircle, Users, Award, Globe, 
  BookOpen, DollarSign, Plane, FileText, ChevronRight,
  MessageCircle
} from 'lucide-react'

const services = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Study Abroad Counselling',
    description: 'Expert guidance to select the perfect university and course for your goals'
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'University Admission Support',
    description: 'Complete assistance with applications and documentation'
  },
  {
    icon: <Plane className="h-6 w-6" />,
    title: 'Visa Processing',
    description: 'Navigate visa requirements with our expert team'
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'IELTS Preparation',
    description: 'Structured coaching programs for English language proficiency'
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'PTE/TOEFL Training',
    description: 'Comprehensive preparation for alternative English exams'
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: 'Scholarship Guidance',
    description: 'Unlock funding opportunities at leading universities'
  }
]

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

const stats = [
  { label: 'Students Placed', value: '5000+', icon: <Users className="h-8 w-8" /> },
  { label: 'Visa Success Rate', value: '98%', icon: <Award className="h-8 w-8" /> },
  { label: 'Partner Universities', value: '500+', icon: <Globe className="h-8 w-8" /> },
]

const testimonials = [
  {
    name: 'Ahmed Rahman',
    university: 'University of Manchester',
    country: 'United Kingdom',
    text: 'Mamun\'s Academy helped me navigate the entire process smoothly. From application to visa approval, they were always there to guide me.',
    rating: 5
  },
  {
    name: 'Fatima Khan',
    university: 'University of Toronto',
    country: 'Canada',
    text: 'The IELTS preparation program was excellent. I scored 7.5 bands thanks to their expert instructors and structured approach.',
    rating: 5
  },
  {
    name: 'Karim Ahmed',
    university: 'University of Sydney',
    country: 'Australia',
    text: 'Professional team, transparent communication, and genuine care for student success. Highly recommended!',
    rating: 5
  },
  {
    name: 'Naima Akter',
    university: 'MIT',
    country: 'USA',
    text: 'The scholarship guidance was crucial in my application. I couldn\'t have done it without Mamun\'s Academy.',
    rating: 5
  }
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/10 to-primary/5 px-4 py-12 sm:px-6 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-block w-fit rounded-full bg-primary/10 px-4 py-2">
                <span className="text-sm font-semibold text-primary">🎓 Study Abroad with Confidence</span>
              </div>
              <h1 className="text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl text-foreground">
                Your Gateway to International Education
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Mamun&apos;s Academy is your trusted partner for international education. We&apos;ve helped thousands of Bangladeshi students achieve their dreams at leading universities worldwide.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row pt-4">
                <Button className="bg-primary hover:bg-primary/90 text-white h-12 text-base px-8 flex items-center gap-2">
                  Get Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <a 
                  href="https://wa.me/8801634000035" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 h-12 rounded-md border border-border hover:bg-muted transition text-foreground font-medium"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden bg-muted border border-border shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-secondary/20 via-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🌍</div>
                  <p className="text-muted-foreground font-semibold">Study Worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-secondary text-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-3">
                <div className="opacity-80">{stat.icon}</div>
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Popular Study Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We help students get admission to universities in 10+ countries across the globe
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {destinations.map((dest, index) => (
              <button
                key={index}
                className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition group cursor-pointer"
              >
                <div className="flex items-center gap-2 group-hover:text-primary transition">
                  <Globe className="h-5 w-5" />
                  <span className="font-semibold text-sm">{dest}</span>
                  <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support for every step of your international education journey
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="p-6 bg-background border border-border rounded-lg hover:shadow-lg hover:border-primary transition group cursor-pointer">
                <div className="text-primary mb-4 group-hover:scale-110 transition">{service.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Mamun's Academy */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">About Mamun&apos;s Academy</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Mamun&apos;s Academy is a dedicated and student-focused educational consultancy firm based in Bangladesh, founded and led by CEO MD Mamun Miah.
                </p>
                <p>
                  We specialize in providing comprehensive consultancy services for students who aspire to gain admission to internationally recognized universities.
                </p>
                <p>
                  Our core services include English language test preparation (IELTS, PTE, TOEFL), personalized counseling, visa support, and pre-departure guidance.
                </p>
              </div>

              <div className="grid gap-3 mt-8 sm:grid-cols-2">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Expert Counsellors</h4>
                    <p className="text-sm text-muted-foreground">Experienced professionals</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Transparent Process</h4>
                    <p className="text-sm text-muted-foreground">Clear communication</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">End-to-End Support</h4>
                    <p className="text-sm text-muted-foreground">Every step covered</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Student-Focused</h4>
                    <p className="text-sm text-muted-foreground">Your success matters</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-96 rounded-lg overflow-hidden bg-muted border border-border shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">👨‍💼</div>
                  <p className="text-muted-foreground font-semibold">MD Mamun Miah</p>
                  <p className="text-sm text-muted-foreground">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Student Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from students who achieved their dreams with Mamun&apos;s Academy
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 bg-background border border-border rounded-lg hover:shadow-lg transition cursor-pointer"
                onClick={() => setActiveTestimonial(index)}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 line-clamp-3">&quot;{testimonial.text}&quot;</p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.university}</p>
                  <p className="text-xs text-primary font-medium">{testimonial.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary to-primary px-4 py-12 sm:px-6 sm:py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Take the first step towards your international education. Get a free assessment today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-white/90 h-12 text-base px-8 font-semibold">
              Free Assessment
            </Button>
            <a 
              href="https://wa.me/8801634000035" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 h-12 rounded-md bg-white/20 hover:bg-white/30 transition font-semibold border border-white/50"
            >
              <MessageCircle className="h-4 w-4" />
              Chat Now
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Stay Updated</h2>
            <p className="text-muted-foreground">
              Get latest visa updates, scholarship opportunities, and study abroad tips
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/90 text-white px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
