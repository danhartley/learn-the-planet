import Link from 'next/link'

import { Metadata } from 'next'

import '@/css/global.css'

import { SessionProvider } from 'next-auth/react'

import { Menu } from '@/components/Menu'

import { Playfair_Display, Open_Sans } from 'next/font/google'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], // Regular, Medium, Semi-bold, Bold
  display: 'swap', // Prevents layout shift
  variable: '--font-family-serif',
  style: ['normal', 'italic'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '800'], // Light, Regular, Medium, Semi-bold, Bold
  display: 'swap',
  variable: '--font-family-sans-serif',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Learn the Planet',
  description:
    'Lessons to help you to learn more about the natural world. Overcoming plant blindness. Prevent the extinction of experience.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${openSans.variable}`}
    >
      <head>{/* <script src="http://localhost:8097" /> */}</head>
      <body>
        <header>
          <div>
            <Link href="/">Learn the Planet</Link>
          </div>
        </header>
        <main>
          <SessionProvider>{children}</SessionProvider>
        </main>
        <footer>
          <div></div>
          <SessionProvider>
            <Menu />
          </SessionProvider>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
