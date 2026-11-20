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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://haris-profile.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  title: 'Haris Profile — Haris Al-Harraz | Full Stack Developer & 3D Portfolio',
  description:
    'Official Haris profile and interactive 3D portfolio of Haris Al-Harraz Bin Razali (risterz). Full Stack Web Developer & Software Engineer crafting 3D WebGL experiences, Rust desktop tools, AI platforms, and scalable web applications.',
  keywords: [
    'Haris Profile',
    'Haris Al-Harraz',
    'Haris Al-Harraz Bin Razali',
    'Haris Portfolio',
    'Haris Profile Website',
    'Haris Developer',
    'Haris Software Engineer',
    'risterz',
    'HRZ 02',
    'Full Stack Developer',
    'Software Engineer',
    '3D Portfolio',
    'Next.js',
    'Three.js',
    'React',
    'Tauri',
    'Rust',
    'Malaysia Developer',
    'UiTM Computer Science',
  ],
  authors: [{ name: 'Haris Al-Harraz Bin Razali', url: SITE_URL }],
  creator: 'Haris Al-Harraz Bin Razali',
  publisher: 'Haris Al-Harraz Bin Razali',
  openGraph: {
    type: 'profile',
    url: SITE_URL,
    locale: 'en_US',
    siteName: 'Haris Profile — HRZ // 02',
    title: 'Haris Profile — Haris Al-Harraz | Full Stack Developer & 3D Portfolio',
    description:
      'Official Haris profile and 3D portfolio of Haris Al-Harraz (risterz). Full Stack Web Developer & Software Engineer building interactive 3D web experiences, desktop tools, and scalable software.',
    firstName: 'Haris Al-Harraz',
    lastName: 'Bin Razali',
    username: 'risterz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haris Profile — Haris Al-Harraz | Full Stack Developer & 3D Portfolio',
    description:
      'Official Haris profile and 3D portfolio of Haris Al-Harraz (risterz). Full Stack Web Developer & Software Engineer.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: 'Haris Profile — Haris Al-Harraz Portfolio',
      description:
        'Official developer profile and interactive 3D portfolio of Haris Al-Harraz Bin Razali (risterz).',
      mainEntity: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Haris Al-Harraz Bin Razali',
      alternateName: ['Haris Profile', 'Haris Al-Harraz', 'risterz', 'HRZ // 02'],
      url: SITE_URL,
      email: 'mailto:harisharraz02@gmail.com',
      jobTitle: 'Full Stack Web Developer & Software Engineer',
      description:
        'Bachelor of Computer Science (Hons.) Netcentric Computing graduate from UiTM building interactive 3D web applications, Rust desktop tools, AI platforms, and full-stack software.',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Universiti Teknologi MARA (UiTM)',
      },
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Pahang',
        addressCountry: 'MY',
      },
      knowsAbout: [
        'Next.js',
        'React',
        'TypeScript',
        'Three.js',
        'WebGL',
        'GLSL Shaders',
        'Rust',
        'Tauri',
        'Python',
        'Full Stack Web Development',
      ],
      sameAs: [
        'https://github.com/risterz',
        'https://www.linkedin.com/in/haris-al-harraz/',
        'https://3d-portfolio-e1f.pages.dev',
        'https://haris-3d-world.pages.dev',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Haris Profile',
      alternateName: 'Haris Al-Harraz 3D Portfolio',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
