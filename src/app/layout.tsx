import Link from 'next/link'

import '@/css/global.css'
import '@/css/fonts.css'

import { Menu } from '@/components/Menu'

export const metadata = {
  title: 'Learn the Planet',
  description:
    'Lessons to help you to learn more about the natural world. Overcoming plant blindness. Prevent the extinction of experience.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>{/* <script src="http://localhost:8097" /> */}</head>
      <body>
        <header>
          <div>
            <Link href="/">Learn the Planet</Link>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div></div>
          <Menu />
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
