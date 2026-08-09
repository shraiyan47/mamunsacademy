import { NextRequest, NextResponse } from 'next/server'
import { getAdminLogEntries } from '@/lib/admin-logs'

export async function GET(request: NextRequest) {
  const passcode = request.headers.get('x-admin-passcode') || request.nextUrl.searchParams.get('passcode')

  try {
    const entries = await getAdminLogEntries(passcode)
    return NextResponse.json({ success: true, entries })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized admin access' },
      { status: 403 }
    )
  }
}
