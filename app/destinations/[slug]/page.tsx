import React from 'react'

interface CountryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params

  const countryName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <main className="min-h-screen bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-foreground">{countryName}</h1>
      </div>
    </main>
  )
}
