import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://haris-portfolio.pages.dev'),
  title: 'HARIS AL-HARRAZ // 02 | DESIGN & DEVELOP',
  description:
    'Full Stack Web Developer & Software Engineer crafting interactive 3D web experiences, Rust desktop tools, AI platforms, and scalable applications.',
  keywords: [
    'Haris Al-Harraz',
    'Full Stack Developer',
    'Software Engineer',
    '3D Portfolio',
    'Next.js',
    'Three.js',
    'React',
    'Tauri',
    'Rust',
    'Malaysia Developer',
  ],
  authors: [{ name: 'Haris Al-Harraz Bin Razali' }],
  creator: 'Haris Al-Harraz Bin Razali',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'HRZ // 02',
    title: 'HARIS AL-HARRAZ // 02 | DESIGN & DEVELOP',
    description:
      'Full Stack Web Developer & Software Engineer building interactive 3D web experiences, desktop tools, and scalable software.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HARIS AL-HARRAZ // 02 | DESIGN & DEVELOP',
    description:
      'Full Stack Web Developer & Software Engineer building interactive 3D web experiences, desktop tools, and scalable software.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,500,600,700&display=swap"
        />
        <meta name="theme-color" content="#1d1d1b" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased selection:bg-[#d32941] selection:text-white">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#1d1d1b',
              color: '#ffffff',
              border: '1px solid #ffffff',
              borderRadius: '0px',
              fontFamily: 'Clash Display, sans-serif',
              fontSize: '12px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            },
            success: {
              iconTheme: {
                primary: '#d32941',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
