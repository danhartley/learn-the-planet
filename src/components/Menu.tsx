'use client'
import Link from 'next/link'

export const Menu = () => {
  return (
    <nav>
      <section aria-labelledby="collection-menu">
        <h2 id="collection-menu" className="menu">
          Links
        </h2>
        <ul>
          <li>
            <Link href="/collections">Collections</Link>
          </li>
          <li>
            <Link href="/collection/create">Create collection</Link>
          </li>
          {/* <li>
            <Link href="/flags">Flags</Link>
          </li> */}
        </ul>
      </section>
    </nav>
  )
}
