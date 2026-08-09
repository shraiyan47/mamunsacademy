interface CountryFlagProps {
  name: string
  className?: string
}

const flagMap: Record<string, string> = {
  'united kingdom': 'uk',
  uk: 'uk',
  'united states': 'usa',
  usa: 'usa',
  canada: 'canada',
  australia: 'australia',
  germany: 'germany',
  france: 'france',
  netherlands: 'netherlands',
  italy: 'italy',
  malta: 'malta',
  greece: 'greece',
  hungary: 'hungary',
  malaysia: 'malaysia',
}

export default function CountryFlag({ name, className = '' }: CountryFlagProps) {
  const normalized = name.toLowerCase()
  const flagKey = flagMap[normalized]

  if (flagKey && ['uk', 'canada', 'australia', 'usa', 'germany', 'hungary', 'italy', 'malta', 'greece', 'malaysia'].includes(flagKey)) {
    return (
      <div className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-border bg-white shadow-sm ${className}`}>
        <img src={`/svg/${flagKey}.svg`} alt={name} className="h-full w-full object-cover" />
      </div>
    )
  }

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <div className={`flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-primary/10 text-sm font-semibold text-primary ${className}`}>
      {initials}
    </div>
  )
}
