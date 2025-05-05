'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import Link from 'next/link'

import { TestStrategy } from '@/types'

function TestReview<T>() {
  const { currentLayout, startRetest } = useTestPlanner<T>()
  const [selectedOption, setSelectedOption] =
    useState<TestStrategy>('incorrect-only')

  const router = useRouter()

  const startNewTest = () => {
    startRetest(selectedOption)
    router.push('/test')
  }
  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(event.target.value as TestStrategy)
  }

  return (
    <section aria-labelledby="test-review">
      <h1 id="test-review">Test review</h1>
      <section aria-labelledby="collection-name">
        <h2 id="collection-name">{currentLayout?.collection.name}</h2>
        <Link
          className="breadcrumb"
          href={`/collection/${currentLayout?.collection.id}`}
        >
          Collection notes
        </Link>
      </section>
      <section aria-labelledby="test-options">
        <h3 id="test-options">Test options</h3>
        <form>
          <div>
            <input
              type="radio"
              id="all-radio"
              name="test-mode"
              value="all"
              checked={selectedOption === 'all'}
              onChange={handleRadioChange}
            />
            <label htmlFor="all-radio">Repeat the test in full</label>
          </div>
          <div>
            <input
              type="radio"
              id="incorrect-only-radio"
              name="test-mode"
              value="incorrect-only"
              checked={selectedOption === 'incorrect-only'}
              onChange={handleRadioChange}
            />
            <label htmlFor="incorrect-only-radio">
              Repeat failed questions only
            </label>
          </div>
        </form>
        <button onClick={startNewTest}>Start new test</button>
      </section>
    </section>
  )
}

export default TestReview
