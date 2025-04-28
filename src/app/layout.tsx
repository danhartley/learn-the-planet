import '@/css/global.css'

import { Menu } from '@/components/Menu'
import '../lib/styles/fonts.css'

export const metadata = {
  title: 'Learn the Planet',
  description: 'Lessons to help you to learn more about the natural world',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <script src="http://localhost:8097" />
      </head>
      <body>
        <header>
          <div>Learn the Planet</div>
        </header>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
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
