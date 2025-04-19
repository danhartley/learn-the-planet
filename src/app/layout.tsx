import '@/css/global.css'

import { ScoreDisplay } from '@/components/ScoreDisplay'
import { Menu } from '@/components/Menu'
import '../lib/styles/fonts.css'

export const metadata = {
  title: 'Learn the Planet',
  description: 'Lessons to help you to learn more about the natural world',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head></head>
      <body>
        <header>
          <h1>Learn the Planet</h1>
        </header>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
        <footer>
          <ScoreDisplay />
          <Menu />
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
