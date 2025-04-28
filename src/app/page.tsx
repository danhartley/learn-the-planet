'use client'

import Link from 'next/link'

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <p>
        <Link href="/about">About</Link>
      </p>
      <p>
        See LaunchDarkly <Link href="/flags">flags</Link>
      </p>
      <p>
        <Link href="/collections">Collections</Link>
      </p>
    </>
  )
}

const Page = () => {
  return <Home />
}

export default Page
