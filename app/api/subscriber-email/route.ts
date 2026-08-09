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
