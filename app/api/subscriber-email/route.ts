import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs/promises'



interface SubscriberLogEntry { // Define the structure of a subscriber log entry
  id: string
  email: string
  createdAt: string
  lastUpdatedAt: string
  submissionCount: number
}


const LOG_FILE_PATH = path.join(process.cwd(), 'data', 'subscriber_log.json')
const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000 // 2 minutes
const MAX_SUBMISSIONS_WITHIN_WINDOW = 1 // Number of submissions within 2 minutes

const now = new Date()
const trackingCode = `MASUB00${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`

async function readLogFile(): Promise<SubscriberLogEntry[]> { // Read the log file and return the entries
  try {
    const raw = await fs.readFile(LOG_FILE_PATH, 'utf8')
    if (!raw.trim()) return []
    return JSON.parse(raw) as SubscriberLogEntry[]
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.writeFile(LOG_FILE_PATH, '[]', 'utf8')
      return []
    }
    throw error
  }
}


async function writeLogFile(entries: SubscriberLogEntry[]) { // Write the updated entries back to the log file
  await fs.writeFile(LOG_FILE_PATH, JSON.stringify(entries, null, 2), 'utf8')
}

export async function POST(request: NextRequest) {

  try {
    const {email} = await request.json()

    
    if ( !email ) {
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
        { status: 400 }
      )
    }

    const existingEntries = await readLogFile()
    const matchedEntry = existingEntries.find((entry) => entry.email.toLowerCase() === email.toLowerCase() )

    const nowMs = Date.now()
    const recentMatches = matchedEntry
      ? existingEntries.filter((entry) => {
        if (entry.id !== matchedEntry.id) return false
        const lastUpdatedAt = Date.parse(entry.lastUpdatedAt)
        return !Number.isNaN(lastUpdatedAt) && nowMs - lastUpdatedAt <= RATE_LIMIT_WINDOW_MS
      })
      : []

    if (matchedEntry && recentMatches.length > 0 && matchedEntry.submissionCount >= MAX_SUBMISSIONS_WITHIN_WINDOW) {
      const updatedEntry: SubscriberLogEntry = {
        ...matchedEntry,
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

    const nextEntry: SubscriberLogEntry = matchedEntry
      ? { // Update existing entry
        ...matchedEntry, 
        email,
        lastUpdatedAt: new Date().toISOString(),
        submissionCount: matchedEntry.submissionCount + 1
      }
      : { // New entry
        id: trackingCode,
        email,
        createdAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
        submissionCount: 1,
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
      subject: `New Subscriber email ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Subscriber</h2>
          
          <p><strong>Email:</strong> ${email}</p>
          
        </div>
      `,
    }

    const mailToSubscriber = {
      from: process.env.ASSESSMENT_EMAIL_USER,
      to: `${email}`,
      subject: `Thank you for subscribing to our newsletter!`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Welcome to Our Newsletter!</h2>
          
          <p>We're excited to have you on board!</p>
            <p>Thank you for subscribing to our newsletter. We promise to keep you updated with the latest news, insights, and exclusive offers.</p>
          <p>Best regards,</p>
            <p style="font-weight: bold; font-size: 20px;">Mamun's Academy</p>
            <p>Visit our website: <a href="https://mamunsacademy.com" target="_blank">mamunsacademy.com</a></p>
            <p>Follow us on social media: <a href="https://www.facebook.com/mamunsacademy" target="_blank">Facebook</a> | <a href="https://www.instagram.com/mamunsacademy" target="_blank">Instagram</a></p>
            <p>Contact us: <a href="mailto:${process.env.ASSESSMENT_TO_EMAIL}">${process.env.ASSESSMENT_TO_EMAIL}</a></p>
            <p>WhatsApp: <a href="https://wa.me/8801712345678" target="_blank">+880 1712-345678</a></p>

            <p style="color: #af0000; font-size: 14px;">
              Note: If you did not subscribe to our newsletter, please ignore this email.
            </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    await transporter.sendMail(mailToSubscriber)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscriber email sending failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email.' },
      { status: 500 }
    )
  }
}
