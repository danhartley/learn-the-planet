import Link from 'next/link'

import { RotatingTaxonIcons } from '@/components/image/common/RotatingTaxonIcons'

const Home = () => {
  return (
    <>
      <article>
        <div className="rotating-icons-container">
          <h1>Welcome to Learn the Planet</h1>
          <RotatingTaxonIcons />
        </div>
        <p>
          This website is dedicated to natural history, to the observation of
          species in their environment, to seeing what is and what is not
          present, and to asking questions.
        </p>
        <p>
          Writing is grouped under topics which take many forms: fieldnotes,
          nature diaries, essays, field guides, and lessons.
        </p>
        <p>
          Collections are accompanied by tests because classification,
          identification, and understanding lead to more questions.
        </p>
        <p>
          Questions lead to itchy feet, an eagerness to get out, look around,
          and see things for ourselves.
        </p>
        <hr />
        <h2>What can I do here?</h2>
        <ul className="list-group bullets">
          <li>
            <p>
              Read a field guide, fieldnotes, or a nature diary. These are
              collected under <Link href="/topics">topics</Link>.
            </p>
          </li>
          <li>
            <p>
              Test yourself on <Link href="/taxa">taxa</Link>,{' '}
              <Link href="/traits">traits</Link> and{' '}
              <Link href="/terms">terms</Link>.
            </p>
          </li>
        </ul>
        <hr />
        <h2>What can I create here?</h2>
        <ul className="list-group bullets">
          <li>
            <p>
              <Link href="/collection/create">Create</Link> a new topic or a
              collection of taxa, traits or terms.
            </p>
          </li>
          <li>
            <p>
              Create a <Link href="/inat">temporary collection</Link> of
              iNaturalist taxa to test yourself on the common and scientific
              names of species, and species recognition.
            </p>
          </li>
        </ul>
        <hr />
        <h2>How can I link to my content elsewhere?</h2>
        <ul className="list-group bullets">
          <li>
            <p>
              When you{' '}
              <Link href="/collection/create">create a new collection</Link>,
              you can credit and link to external content.
            </p>
          </li>
        </ul>
      </article>
    </>
  )
}

const Page = () => {
  return <Home />
}

export default Page
