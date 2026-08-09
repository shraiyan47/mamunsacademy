import fs from 'fs/promises'
import path from 'path'

export interface AdminLogEntry {
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

const LOG_FILE_PATH = path.join(process.cwd(), 'data', 'user_device_network_log.json')
const PASSCODE = process.env.ADMIN_PASSCODE || 'Mamun@@@*2026'

export function isValidAdminPasscode(passcode?: string | null) {
  return passcode === PASSCODE
}

export async function getAdminLogEntries(passcode?: string | null): Promise<AdminLogEntry[]> {
  if (!isValidAdminPasscode(passcode)) {
    throw new Error('Unauthorized admin access')
  }

  try {
    const raw = await fs.readFile(LOG_FILE_PATH, 'utf8')
    if (!raw.trim()) return []
    return JSON.parse(raw) as AdminLogEntry[]
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.writeFile(LOG_FILE_PATH, '[]', 'utf8')
      return []
    }
    throw error
  }
}
