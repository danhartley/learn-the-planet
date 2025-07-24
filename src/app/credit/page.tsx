import Link from 'next/link'

import { taxonUrls } from '@/api/phylopic/api'

export default function Page() {
  return (
    <div className="column-group">
      <h1>Credit</h1>
      <div>
        This site depends on two principle resources:{' '}
        <Link href="https://en.wikipedia.org/">Wikipedia</Link> and{' '}
        <Link href="https://www.inaturalist.org/">iNaturalist</Link>.
      </div>
      <hr />
      <h2>Taxon icons</h2>
      <div>
        The taxon icons (plantae, aves, etc.) are hosted by{' '}
        <Link href="https://www.phylopic.org/">PhyloPic</Link>.
      </div>
      <div>Learn the Planet thanks the following people for their icons.</div>
      <div>
        <em>
          (The link takes you to details of the icon and the licence agreement).
        </em>
      </div>
      {Object.entries(taxonUrls).map(([key, value]) => {
        return (
          <ul key={key}>
            <li>
              <h3>
                <Link href={value.licence}>{value.credit}</Link>
                <span> ({value.taxon})</span>
              </h3>
            </li>
          </ul>
        )
      })}
    </div>
  )
}
