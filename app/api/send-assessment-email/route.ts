import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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
    } = await request.json()

    if (!fullName || !email || !phone || !qualification) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      )
    }

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
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Qualification:</strong> ${qualification}</p>
          <p><strong>Year of Completion:</strong> ${completionYear || 'Not provided'}</p>
          <p><strong>CGPA Score:</strong> ${cgpa || 'Not provided'}</p>
          <p><strong>Language Proficiency:</strong> ${languageTest || 'Not provided'}</p>
          <p><strong>Language Score:</strong> ${languageScore || 'Not provided'}</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Assessment email sending failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email.' },
      { status: 500 }
    )
  }
}
