import Link from 'next/link'

import { taxonUrls } from '@/api/phylopic/api'

export default function Page() {
  return (
    <article>
      <h1>Credit</h1>
      <p>
        This site depends on two principle resources:{' '}
        <Link href="https://en.wikipedia.org/">Wikipedia</Link> and{' '}
        <Link href="https://www.inaturalist.org/">iNaturalist</Link>.
      </p>
      <hr />
      <h2>Taxon icons</h2>
      <p>
        The taxon icons (plantae, aves, etc.) are hosted by{' '}
        <Link href="https://www.phylopic.org/">PhyloPic</Link>.
      </p>
      <p>Learn the Planet thanks the following people for their icons:</p>
      <ul className="list-group">
        {Object.entries(taxonUrls).map(([key, value]) => {
          return (
            <li key={key}>
              <Link href={value.licence}>{value.credit}</Link>
              <span> ({value.taxon})</span>
            </li>
          )
        })}
      </ul>
      <p> </p>
      <hr />
      <h2 id="taxa-licencing">Taxa photo credits and licencing</h2>
      <p>
        All taxa photographs used on this site are sourced from iNaturalist and
        are used under Creative Commons licences or are in the public domain
        (CC0). We respect the rights of photographers and only use images with
        permissive licences that allow educational and non-commercial use.
      </p>
      <p>
        This is a non-profit educational platform dedicated to nature education,
        species identification, and citizen science, and will always remain free
        to use. Photos are used solely to supplement educational articles and
        enhance learning through visual recognition exercises and tests.
      </p>
      <p>
        We acknowledge and thank the iNaturalist community of photographers
        whose contributions make this educational resource possible. Individual
        photo attributions and licence information are displayed by clicking on
        images where technically feasible (note: this feature is not available
        during interactive tests to preserve the testing experience).
      </p>
      <p>
        NB Photos that have the "All rights reserved" licence or null (i.e. no
        licence stipulated), are excluded.
      </p>
      <p>Photos with the following licences are included:</p>
      <ul>
        <li>CC0</li>
        <li>CC-BY</li>
        <li>CC-BY-SA</li>
        <li>CC-BY-NC</li>
        <li>CC-BY-ND</li>
        <li>CC-BY-NC-SA</li>
        <li>CC-BY-NC-ND</li>
      </ul>
      <p>
        These licences allow educational and non-commercial use while respecting
        photographers' rights.
      </p>
      <p>
        If you are a photographer and have concerns about the use of your image,
        please contact us at{' '}
        <Link
          href="mailto:danhartleybcn@gmail.com?subject=iNaturalist%20photo%20rights%20enquiry"
          rel="noreferrer"
          target="_blank"
        >
          danhartleybcn@gmail.com
        </Link>
        .
      </p>
      <hr />
      <section aria-labelledby="contributor-policy" className="column-group">
        <section>
          <h2 id="contributor-policy">Contributor Content Policy</h2>
          <p>
            When you contribute articles, notes, lessons, or photos to{' '}
            <em>Learn the Planet</em>, you retain full ownership and copyright
            of your work. <em>Learn the Planet</em> makes no claim to ownership
            of contributed content.
          </p>
          <p>
            By contributing, you grant <em>Learn the Planet</em> a{' '}
            <strong>non-exclusive, perpetual licence</strong> to publish,
            display, and archive your text and images on the platform. This
            licence allows us to share your contributions with the community in
            support of our educational mission. You remain free to republish
            your work elsewhere at any time.
          </p>
        </section>
        <section>
          <h3>Contributor responsibilities</h3>
          <p>
            You are responsible for ensuring that any material you contribute is
            either your own original work or used with proper permission or
            licence.
          </p>
          <p>
            Photos should preferably be your own. If you use images from other
            sources, you must confirm that you have the right to do so.
          </p>
          <p>
            Plagiarism, unauthorised reproductions, or unlicensed use of
            material are not permitted.
          </p>
        </section>

        <section>
          <h3>Visitor use of content</h3>
          <p>
            Visitors to <em>Learn the Planet</em> may print or download articles
            and photos <strong>for personal or educational use only</strong>.
            Any other use, including commercial redistribution or publication on
            other platforms, requires permission from the original author or
            photographer.
          </p>
          <p>
            <em>Learn the Planet</em> operates as a non-profit educational
            platform. All contributed content supports our shared mission of
            nature education, species identification, and citizen science.
          </p>
        </section>

        <section>
          <h3>Usage note</h3>
          <p>
            Unless otherwise stated, contributed content is made available under
            a{' '}
            <strong>
              Creative Commons Attribution–NonCommercial (CC BY-NC) licence
            </strong>
            . This means visitors may copy, print, and share articles and photos
            for personal or educational purposes, provided proper credit is
            given to the author and <em>Learn the Planet</em>. Commercial use is
            not permitted without permission.
          </p>
        </section>
      </section>
    </article>
  )
}
