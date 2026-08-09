import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import nodemailer from 'nodemailer'

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

const LOG_FILE_PATH = path.join(process.cwd(), 'data', 'user_device_network_log.json') 
const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000 // 2 minutes
const MAX_SUBMISSIONS_WITHIN_WINDOW = 1 // Number of submissions within 2 minutes

async function readLogFile(): Promise<UserLogEntry[]> { // Read the log file and return the entries
  try {
    const raw = await fs.readFile(LOG_FILE_PATH, 'utf8')
    if (!raw.trim()) return []
    return JSON.parse(raw) as UserLogEntry[]
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.writeFile(LOG_FILE_PATH, '[]', 'utf8')
      return []
    }
    throw error
  }
}

async function writeLogFile(entries: UserLogEntry[]) { // Write the updated entries back to the log file
  await fs.writeFile(LOG_FILE_PATH, JSON.stringify(entries, null, 2), 'utf8')
}

function normalize(value: string | null | undefined) { // Normalize the value by trimming whitespace and returning 'Unknown' if it's null or empty
  if (!value) return 'Unknown'
  return value.trim()
}

function getClientValue(request: NextRequest, key: string) {
  return request.headers.get(key) || null
}

function getDeviceDetails(request: NextRequest) {
  const userAgent = normalize(request.headers.get('user-agent'))

  const isMobile = /android|iphone|ipad|mobile/i.test(userAgent)
  const isTablet = /ipad|tablet/i.test(userAgent)
  const deviceType = isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'

  const browser = /firefox/i.test(userAgent)
    ? 'Firefox'
    : /edg/i.test(userAgent)
      ? 'Edge'
      : /chrome|crios/i.test(userAgent)
        ? 'Chrome'
        : /safari/i.test(userAgent)
          ? 'Safari'
          : 'Other'

  const os = /windows/i.test(userAgent)
    ? 'Windows'
    : /mac/i.test(userAgent)
      ? 'macOS'
      : /linux/i.test(userAgent)
        ? 'Linux'
        : /android/i.test(userAgent)
          ? 'Android'
          : /iphone|ipad/i.test(userAgent)
            ? 'iOS'
            : 'Other'

  return { deviceType, browser, os }
}

export async function POST(request: NextRequest) {
  try {
    const {
      fullName,
      email,
      phone,
      qualification,
      completionYear,
      cgpa,
      languageTest,
      languageScore,
      destination,
    } = await request.json()

    if (!fullName || !email || !phone || !qualification) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      )
    }

    const now = new Date()
    const trackingCode = `${Math.random().toString(36).substring(2, 10).toUpperCase()}/${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`

    const ip = normalize(getClientValue(request, 'x-forwarded-for') || getClientValue(request, 'x-real-ip'))
    const location = normalize(getClientValue(request, 'x-vercel-ip-country')) || 'Unknown'
    const { deviceType, browser, os } = getDeviceDetails(request)

    const existingEntries = await readLogFile()
    const matchedEntry = existingEntries.find((entry) => entry.email.toLowerCase() === email.toLowerCase() || entry.phone === phone)

    if (matchedEntry?.ipBlock === 'yes') {
      return NextResponse.json(
        { success: false, error: 'Your access has been blocked for suspicious activity.' },
        { status: 403 }
      )
    }

    const nowMs = Date.now()
    const recentMatches = matchedEntry
      ? existingEntries.filter((entry) => {
          if (entry.id !== matchedEntry.id) return false
          const lastUpdatedAt = Date.parse(entry.lastUpdatedAt)
          return !Number.isNaN(lastUpdatedAt) && nowMs - lastUpdatedAt <= RATE_LIMIT_WINDOW_MS
        })
      : []

    if (matchedEntry && recentMatches.length > 0 && matchedEntry.submissionCount >= MAX_SUBMISSIONS_WITHIN_WINDOW) {
      const updatedEntry: UserLogEntry = {
        ...matchedEntry,
        ipBlock: 'yes',
        lastUpdatedAt: new Date().toISOString(),
        submissionCount: matchedEntry.submissionCount + 1,
      }

      const nextEntries = existingEntries.map((entry) => (entry.id === matchedEntry.id ? updatedEntry : entry))
      await writeLogFile(nextEntries)

      return NextResponse.json(
        { success: false, error: 'Too many submissions in a short time. Your access has been blocked.' },
        { status: 429 }
      )
    }

    const nextEntry: UserLogEntry = matchedEntry
      ? {
          ...matchedEntry,
          fullName,
          email,
          phone,
          deviceType,
          browser,
          os,
          location,
          ip,
          lastUpdatedAt: new Date().toISOString(),
          submissionCount: matchedEntry.submissionCount + 1,
          ipBlock: matchedEntry.ipBlock,
        }
      : {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          fullName,
          email,
          phone,
          deviceType,
          browser,
          os,
          location,
          ip,
          createdAt: new Date().toISOString(),
          lastUpdatedAt: new Date().toISOString(),
          submissionCount: 1,
          ipBlock: 'no',
        }

    const nextEntries = matchedEntry
      ? existingEntries.map((entry) => (entry.id === matchedEntry.id ? nextEntry : entry))
      : [...existingEntries, nextEntry]

    await writeLogFile(nextEntries)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ASSESSMENT_EMAIL_USER,
        pass: process.env.ASSESSMENT_EMAIL_PASS?.replace(/\s/g, ''),
      },
    })

    const mailOptions = {
      from: process.env.ASSESSMENT_EMAIL_USER,
      to: process.env.ASSESSMENT_TO_EMAIL,
      subject: `New Assessment Request from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Assessment Request</h2>
          <p><strong>Tracking Code:</strong> ${trackingCode}</p>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Qualification:</strong> ${qualification}</p>
          <p><strong>Study Destination:</strong> ${destination || 'Not provided'}</p>
          <p><strong>Year of Completion:</strong> ${completionYear || 'Not provided'}</p>
          <p><strong>CGPA Score:</strong> ${cgpa || 'Not provided'}</p>
          <p><strong>Language Proficiency:</strong> ${languageTest || 'Not provided'}</p>
          <p><strong>Language Score:</strong> ${languageScore || 'Not provided'}</p>
        </div>
      `,
    }

    const mailToStudent = {
      from: process.env.ASSESSMENT_EMAIL_USER,
      to: email,
      subject: `Assessment Request Received by Mamun's Academy`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">

          <p><strong>Dear ${fullName},</strong></p>
          <p>We have received your assessment request and our team will get back to you soon.</p>
          <p>Thank you for choosing Mamun's Academy!</p>
          <br />
          <p><strong>Summary of your submission:</strong></p>
          <p><strong>Name:</strong> ${fullName}</p>
          <br />
          <p style="color: #000000; size: 20px;"><strong>Your tracking code: </strong> ${trackingCode}</p> 
          <br />
          <p><strong>Study Destination:</strong> ${destination || 'Not provided'}</p>
          <p><strong>Qualification:</strong> ${qualification}</p>

          <p>We appreciate your interest in our services and look forward to assisting you in achieving your educational goals.</p>
          <p>If you have any questions or need further assistance, please feel free to reach out to us at <a href="mailto:${process.env.ASSESSMENT_TO_EMAIL}">${process.env.ASSESSMENT_TO_EMAIL}</a>.</p>
          <p>We are here to help you every step of the way.</p>

          <br />
          <p>Best regards,</p>
          <h3><strong>Mamun's Academy</strong></h3>
          <p>Contact us: <a href="mailto:${process.env.ASSESSMENT_TO_EMAIL}">${process.env.ASSESSMENT_TO_EMAIL}</a></p>
          <p>Visit our website: <a href="https://mamunsacademy.com">https://mamunsacademy.com</a></p>
          <p>Follow us on social media: <a href="https://www.facebook.com/mamunsacademy">Facebook</a> | <a href="https://www.instagram.com/mamunsacademy">Instagram</a> | <a href="https://www.linkedin.com/company/mamunsacademy">LinkedIn</a></p>
          <p>For any further assistance, feel free to reach out to us.</p>
          <p>Whasapp: <a href="https://wa.me/+8801634000035">+880 1634-000035</a></p>
          <br />

          <p style="color: #ff0000;">Note: This is an automated message. Please do not reply to this email.</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    await transporter.sendMail(mailToStudent)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Assessment email sending failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email.' },
      { status: 500 }
    )
  }
}
