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
    <nav>
      <section aria-labelledby="collection-menu">
        <h2 id="collection-menu">Site Navigation</h2>
        <ul className="list-group">
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
  )
}
