'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import Link from 'next/link'

import { TestStrategy } from '@/types'

import { formatHyphenatedString } from '@/utils/strings'

function TestReview<T>() {
  const { currentLayout, testHistory, startRetest } = useTestPlanner<T>()
  const [selectedOption, setSelectedOption] = useState<TestStrategy>(
    'repeat-the-test-in-full'
  )

  const isEveryAnswerCorrect = testHistory?.every(test => test.isCorrect)

  const testStrategies: TestStrategy[] = ['repeat-the-test-in-full']

  if (!isEveryAnswerCorrect) {
    testStrategies.push('repeat-failed-questions-only')
  }

  const options = testStrategies.map(strategy => {
    return (
      <div>
        <input
          type="radio"
          id={strategy}
          name="test-mode"
          value={strategy}
          checked={selectedOption === strategy}
          onChange={handleRadioChange}
        />
        <label htmlFor={strategy}>{formatHyphenatedString(strategy)}</label>
      </div>
    )
  })

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
      <section aria-labelledby="collection-name" className="group">
        <h2 id="collection-name">{currentLayout?.collection.name}</h2>
        <Link
          className="breadcrumb"
          href={`/collection/${currentLayout?.collection.id}`}
        >
          Collection notes
        </Link>
      </section>
      <section aria-labelledby="test-options" className="group-block">
        <h3 id="test-options">Test options</h3>
        <form>{options}</form>
        <button onClick={startNewTest}>Start new test</button>
      </section>
    </section>
  )
}

export default TestReview
