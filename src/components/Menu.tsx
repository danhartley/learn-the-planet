'use client'
import Link from 'next/link'
export const Menu = () => {
  return (
    <nav>
      <section aria-labelledby="collection-menu">
        <h3 id="collection-menu" className="menu">
          Menu
        </h3>
        <ul>
          <li>
            <Link href="/collections">Collections</Link>
          </li>
          <li>
            <Link href="/collection/create">Create collection</Link>
          </li>
          <li>
            <Link href="/flags">Flags</Link>
          </li>
        </ul>
      </section>
    </nav>
  )
}
