'use client'

import { useState } from 'react'

interface UserLogEntry {
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
}

interface AdminLogsViewProps {
  entries: UserLogEntry[]
}

export default function AdminLogsView({ entries }: AdminLogsViewProps) {
  const [selectedEntry, setSelectedEntry] = useState<UserLogEntry | null>(null)

  return (
    <>
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="px-3 py-3 font-semibold">Name</th>
              <th className="px-3 py-3 font-semibold">Email</th>
              <th className="px-3 py-3 font-semibold">Phone</th>
              <th className="px-3 py-3 font-semibold">IP</th>
              <th className="px-3 py-3 font-semibold">IP Status</th>
              <th className="px-3 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                  No submissions logged yet.
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.id} className="border-b border-border/60">
                  <td className="px-3 py-3 font-medium text-foreground">{entry.fullName}</td>
                  <td className="px-3 py-3 text-muted-foreground">{entry.email}</td>
                  <td className="px-3 py-3 text-muted-foreground">{entry.phone}</td>
                  <td className="px-3 py-3 text-muted-foreground">{entry.ip}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${entry.ipBlock === 'yes' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {entry.ipBlock === 'yes' ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => setSelectedEntry(entry)}
                      className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
                    >
                      View all
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedEntry ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl border border-border bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-foreground">Submission details</h2>
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p><span className="font-semibold text-foreground">Name:</span> {selectedEntry.fullName}</p>
              <p><span className="font-semibold text-foreground">Email:</span> {selectedEntry.email}</p>
              <p><span className="font-semibold text-foreground">Phone:</span> {selectedEntry.phone}</p>
              <p><span className="font-semibold text-foreground">IP:</span> {selectedEntry.ip}</p>
              <p><span className="font-semibold text-foreground">Device:</span> {selectedEntry.deviceType}</p>
              <p><span className="font-semibold text-foreground">Browser:</span> {selectedEntry.browser}</p>
              <p><span className="font-semibold text-foreground">OS:</span> {selectedEntry.os}</p>
              <p><span className="font-semibold text-foreground">Location:</span> {selectedEntry.location}</p>
              <p><span className="font-semibold text-foreground">Created At:</span> {selectedEntry.createdAt}</p>
              <p><span className="font-semibold text-foreground">Last Updated:</span> {selectedEntry.lastUpdatedAt}</p>
              <p><span className="font-semibold text-foreground">Submission Count:</span> {selectedEntry.submissionCount}</p>
              <p><span className="font-semibold text-foreground">IP Block:</span> {selectedEntry.ipBlock}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
