import '@/css/global.css'

import { ScoreDisplay } from '@/components/ScoreDisplay'
import { Menu } from '@/components/Menu'

export const metadata = {
  title: 'Learn the Planet',
  description: 'Lessons to help you to learn more about the natural world',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        {/* <script src="http://localhost:8097"></script> */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        ></link>
      </head>
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
