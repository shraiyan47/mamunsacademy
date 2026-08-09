import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import DestinationPageShell from '@/components/destination-page-shell'
import CountryFlag from '@/components/country-flag'

interface DestinationCountry {
  id: string
  country_name: string
  country_code: string
  description: string
  destinations: Array<{
    id: string
    name: string
    location: string
    description: string
    website: string
  }>
}

interface DestinationData {
  countries: DestinationCountry[]
}

async function getCountries(): Promise<DestinationCountry[]> {
  const jsonPath = path.join(process.cwd(), 'app', 'destinations', 'destination.json')
  const raw = await fs.readFile(jsonPath, 'utf8')
  const data = JSON.parse(raw) as DestinationData
  return data.countries
}

export default async function AllCountriesPage() {
  const countries = await getCountries()

  return (
    <DestinationPageShell selectedDestination="" backHref="/" backLabel="Back to home">
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Destination list</p>
              <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Explore all study destinations</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Browse countries with trusted university options and start your application journey with expert support.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {countries.map((country) => {
              const slug = country.country_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
              return (
                <Link
                  key={country.id}
                  href={`/destinations/${slug}`}
                  className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <CountryFlag name={country.country_name} />
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">{country.country_name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{country.destinations.length} universities listed</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-muted-foreground">{country.description}</p>

                  <div className="mt-6 inline-flex items-center text-sm font-medium text-primary transition group-hover:translate-x-1">
                    View country details
                    <span className="ml-2">→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </DestinationPageShell>
  )
}
