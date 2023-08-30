import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider, UserButton } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextmatch',
  description: 'Encuentra tu próximo encuentro...',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <body className={inter.className}>
          <UserButton afterSignOutUrl="/" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
