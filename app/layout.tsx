import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' })
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sahil Sohani — Backend Engineer',
  description:
    'Backend engineer building AI pipelines, distributed systems, and production infrastructure. FastAPI · DRDO · AdvaRisk.',
  keywords: [
    'Backend Engineer',
    'AI Systems',
    'FastAPI',
    'Distributed Systems',
    'Python',
    'Machine Learning',
    'RAG',
    'NLP',
  ],
  authors: [{ name: 'Sahil Sohani' }],
  openGraph: {
    title: 'Sahil Sohani — Backend Engineer',
    description: 'I build backend systems, AI pipelines, and distributed infrastructure.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark bg-background ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
