import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'Moraja3aAI',
  description: 'AI-powered Exam Simulation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={outfit.className}>{children}</body>
    </html>
  )
}
