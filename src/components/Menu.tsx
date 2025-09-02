'use client'
import { useState } from 'react'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export const Menu = () => {
  const { data: session } = useSession()
  const [isAdmin] = useState(
    session?.user?.id?.toString() === '6867edcb91fda094ef1fd10d'
  )
  return (
    <div className="column-group">
      <nav>
        <section aria-labelledby="collection-menu" className="list-group">
          <h2 id="collection-menu">Site Navigation</h2>
          <ul className="grid-md">
            <li>
              <Link href="/topics">Topics</Link>
            </li>
            <li>
              <Link href="/traits">Traits</Link>
            </li>
            <li>
              <Link href="/taxa">Taxa</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/collection/search">Collection search</Link>
            </li>
            <li>
              <Link href="/collection/create">Create collection</Link>
            </li>
            <li>
              <Link href="/inat">iNaturalist search</Link>
            </li>
            <li>
              <Link href="/authors">Authors</Link>
            </li>
            <li>
              <Link href="/credit">Credit</Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link href="/flags">Flags</Link>
                </li>
                <li>
                  <Link href="/admin">Admin</Link>
                </li>
              </>
            )}
          </ul>
        </section>
      </nav>
      <hr />
      <div id="copyright" className="list-group font-xs">
        <div>
          © 2025 <em>Learn the Planet</em>. Site design, code, and branding ©
          Learn the Planet.
        </div>
        <div>
          Articles and photos © their respective authors, licensed under{' '}
          <a
            href="https://creativecommons.org/licenses/by-nc/4.0/"
            target="_blank"
            rel="noopener"
          >
            CC BY-NC 4.0
          </a>
          .
        </div>
        <div>
          <Link href="/rss.xml" target="_blank">
            RSS feed
          </Link>{' '}
          |
          <Link
            href="http://validator.w3.org/feed/check.cgi?url=https%3A//learn-the-planet.com/rss.xml"
            target="_blank"
          >
            Valid RSS
          </Link>
        </div>
      </div>
    </div>
  )
}
