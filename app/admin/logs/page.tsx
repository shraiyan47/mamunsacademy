import Link from 'next/link'
import AdminLogsView from '@/components/admin-logs-view'
import { getAdminLogEntries } from '@/lib/admin-logs'

export default async function AdminLogsPage({
  searchParams,
}: {
  searchParams?: Promise<{ passcode?: string }> | { passcode?: string }
}) {
  const resolvedParams = await Promise.resolve(searchParams)
  const providedPasscode = resolvedParams?.passcode || ''

  let entries: Array<{
    id: string
    fullName: string
    email: string
    phone: string
    deviceType: string
    browser: string
    os: string
    location: string
    ip: string
    createdAt: string
    lastUpdatedAt: string
    submissionCount: number
    ipBlock: 'yes' | 'no'
  }> = []
  let isAuthorized = false

  try {
    entries = await getAdminLogEntries(providedPasscode)
    isAuthorized = true
  } catch {
    entries = []
    isAuthorized = false
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Admin view</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">Submission logs</h1>
          </div>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Back to home
          </Link>
        </div>

        {!isAuthorized ? (
          <form method="GET" className="mt-8 max-w-md rounded-2xl border border-border bg-muted/30 p-6">
            <label htmlFor="passcode" className="mb-2 block text-sm font-medium text-foreground">
              Enter passcode
            </label>
            <input
              id="passcode"
              name="passcode"
              type="password"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none ring-0"
              placeholder="Enter admin passcode"
            />
            <button
              type="submit"
              className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Access logs
            </button>
          </form>
        ) : (
          <>
            <AdminLogsView entries={entries} />
          </>
        )}
      </div>
    </main>
  )
}
