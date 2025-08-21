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
              <h3>
                <Link href={value.licence}>{value.credit}</Link>
                <span> ({value.taxon})</span>
              </h3>
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
      <h2 id="contributor-policy">Contributor photo policy</h2>
      <p>
        When you upload or link photos to Learn the Planet, you retain full
        ownership and rights to your images. Learn the Planet makes no claim to
        ownership of contributed photos.
      </p>
      <p>
        By contributing photos, you grant Learn the Planet permission to display
        and use these images on the platform in perpetuity for your articles and
        lessons. Your uploaded photos remain private to you and are only
        accessible when you are creating or editing your own content.
      </p>
      <p>
        <strong>Important </strong>You are responsible for ensuring you have the
        legal right to upload or link any photos you contribute. We strongly
        recommend using your own original photographs. If you use images from
        other sources, you must verify that you have proper permission or that
        the images are available under appropriate licenses for educational use
      </p>
      <p>
        Learn the Planet operates as a non-profit educational platform, and all
        contributed content supports our mission of nature education, species
        identification, and citizen science.
      </p>
    </article>
  )
}
