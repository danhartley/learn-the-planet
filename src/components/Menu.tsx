'use client'

export const Menu = () => {
  return (
    <nav>
      <section aria-labelledby="collection-menu">
        <h3 id="collection-menu" className="menu">
          Menu
        </h3>
        <ul>
          <li>
            <a href="/collections">Collections</a>
          </li>
          <li>
            <a href="/collection/create">Create collection</a>
          </li>
          <li>
            <a href="/flags">Flags</a>
          </li>
        </ul>
      </section>
    </nav>
  )
}
