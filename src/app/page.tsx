import Link from 'next/link'

const Home = () => {
  return (
    <>
      <h1 className="initial">Welcome to Learn the Planet</h1>
      <div>
        The aim of this website is to encourage you to leave this website, get
        off the Internet, go outside, and observe.
      </div>
      <hr />
      <h2 className="initial">What can I do here?</h2>
      <ul className="list-group bullets">
        <li>
          Read a field guide, fieldnotes, or a nature diary. These are collected
          under <Link href="/topics">topics</Link>.
        </li>
        <li>
          Test yourself on <Link href="/taxa">taxa</Link>,{' '}
          <Link href="/traits">traits</Link> and{' '}
          <Link href="/terms">terms</Link> that are new to you.
        </li>
      </ul>
      <hr />
      <h2 className="initial">What can I create here?</h2>
      <ul className="list-group bullets">
        <li>
          <Link href="/collection/create">Create</Link> a new topic or a
          collection of taxa, traits or terms.
        </li>
        <li>
          Create a temporary collection of taxa to test yourself on the common
          and scientific names of species, and species recognition.
        </li>
      </ul>
      <hr />
      <h2 className="initial">How can I link to my content elsewhere?</h2>
      <div>
        When you create a new collection, you can credit and link to external
        content.
      </div>
    </>
  )
}

const Page = () => {
  return <Home />
}

export default Page
