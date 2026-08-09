import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Mamun's Academy - UK University Representative",
  description: 'Your ultimate guide to studying in the UK. One of the largest university representatives helping students achieve their educational goals.',
  generator: 'Next.js',
  authors: [{ name: 'Shahadat Hossain (shraiyan47@gmail.com)', url: 'https://shraiyan47.github.io' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">

      <body className="antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <h1 hidden>Website Developer Name: Shahadat Hossain</h1>
        <h1 hidden>Website Developer Email: shraiyan47@gmail.com</h1>
        <h1 hidden>Website Developer URL: https://shraiyan47.github.io</h1>
      </body>

    </html>
  )
}
