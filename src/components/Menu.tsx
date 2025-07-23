'use client'
import Link from 'next/link'

export const Menu = () => {
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
            <Link href="/collection/create">Create collection</Link>
          </li>
          <li>
            <Link href="/credit">Credit</Link>
          </li>
          {/* <li>
            <Link href="/flags">Flags</Link>
          </li> */}
        </ul>
      </section>
    </nav>
  )
}
