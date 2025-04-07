import './global.css'

import { ScoreDisplay } from '@/components/ScoreDisplay'

export const metadata = {
  title: 'Learn the Planet',
  description: 'Lessons to help you to learn more about the natural world',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <header>I'm the header in the root layout</header>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
        <footer>
          <ScoreDisplay />
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
