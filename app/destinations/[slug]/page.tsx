import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Globe, MapPin } from 'lucide-react'
import DestinationPageShell from '@/components/destination-page-shell'
import CountryFlag from '@/components/country-flag'

interface DestinationItem {
  id: string
  name: string
  location: string
  description: string
  website: string
}

interface DestinationCountry {
  id: string
  country_name: string
  country_code: string
  destinations: DestinationItem[]
  description: string
  last_updated: string
  country_study_website: string
}

interface DestinationData {
  countries: DestinationCountry[]
}

interface CountryPageProps {
  params: Promise<{ slug: string }>
}

async function getCountryData(slug: string): Promise<DestinationCountry | null> {
  const jsonPath = path.join(process.cwd(), 'app', 'destinations', 'destination.json')
  const raw = await fs.readFile(jsonPath, 'utf8')
  const destinationData = JSON.parse(raw) as DestinationData

  const countryName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    destinationData.countries.find((country) =>
      country.country_name.toLowerCase() === countryName.toLowerCase()
    ) ?? null
  )
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params
  const country = await getCountryData(slug)

  if (!country) {
    return (
      <DestinationPageShell backHref="/destinations/all" backLabel="Back to country list" selectedDestination="">
        <main className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-background p-10 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Destination not found</p>
            <h1 className="mt-4 text-3xl font-bold text-foreground">We could not find that country yet.</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Please browse our full list and choose a destination to explore universities and application support.
            </p>
            <Link
              href="/destinations/all"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              View all countries
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
      </DestinationPageShell>
    )
  }

  return (
    <DestinationPageShell backHref="/destinations/all" backLabel="Back to country list" selectedDestination={country.country_name}>
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-secondary/5 shadow-sm">
            <div className="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Study destination</p>
                <div className="mt-4 flex items-center gap-4">
                  <CountryFlag name={country.country_name} />
                  <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{country.country_name}</h1>
                </div>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">{country.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/destinations/all"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Explore other countries
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
                <div className="flex items-center gap-3 text-primary">
                  <Globe className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.3em]">Quick facts</span>
                </div>
                <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                  <div className="rounded-xl bg-muted/40 p-4">
                    <p className="font-semibold text-foreground">University options</p>
                    <p className="mt-1">{country.destinations.length} featured institutions</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-4">
                    <p className="font-semibold text-foreground">Study portal</p>
                    <p className="mt-1">{country.country_study_website}</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-4">
                    <p className="font-semibold text-foreground">Last updated</p>
                    <p className="mt-1">{country.last_updated}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-background p-8 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Top universities</p>
              <h2 className="mt-2 text-2xl font-bold text-foreground">Featured institutions in {country.country_name}</h2>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {country.destinations.map((destination) => (
                <article key={destination.id} className="rounded-2xl border border-border bg-muted/20 p-6 shadow-sm">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{destination.name}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{destination.location}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{destination.description}</p>

                  <a
                    href={destination.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                  >
                    Visit university website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </DestinationPageShell>
  )
}
