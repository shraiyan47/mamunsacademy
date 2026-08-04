import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const {
      email
    } = await request.json()

    if ( !email ) {
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
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
            <p><strong>Mamun's Academy</strong></p>
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
