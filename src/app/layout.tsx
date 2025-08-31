import { Metadata } from 'next'

import '@/css/global.css'

import { SessionProvider } from 'next-auth/react'
import { CollectionProvider } from '@/contexts/CollectionContext'

import { Header } from '@/components/Header'
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
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Learn the Planet - Nature Topics"
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title="Learn the Planet - Nature Topics (JSON)"
          href="/feed.json"
        />
        {/* <script src="http://localhost:8097" /> */}
        <meta
          name="google-site-verification"
          content="5g4jsd-u-eJJBXzDy87rjB7KXqe1JZWeoQ78ivfQxLA"
        />
      </head>
      <body>
        <SessionProvider>
          <CollectionProvider>
            <Header />
          </CollectionProvider>
        </SessionProvider>
        <main>
          <SessionProvider>{children}</SessionProvider>
        </main>
        <footer>
          <SessionProvider>
            <Menu />
          </SessionProvider>
        </footer>
        <script async src="https://scripts.withcabin.com/hello.js"></script>
      </body>
    </html>
  )
}

export default RootLayout
