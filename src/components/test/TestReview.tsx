'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import { TestStrategy } from '@/types'

function TestReview<T>() {
  const { startRetest } = useTestPlanner<T>()
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
    <div className="p-4">
      <h2 className="text-xl mb-4">Select test mode:</h2>

      <div className="mb-2">
        <input
          type="radio"
          id="all-radio"
          name="test-mode"
          value="all"
          checked={selectedOption === 'all'}
          onChange={handleRadioChange}
          className="mr-2"
        />
        <label htmlFor="all-radio">All questions</label>
      </div>

      <div className="mb-4">
        <input
          type="radio"
          id="incorrect-only-radio"
          name="test-mode"
          value="incorrect-only"
          checked={selectedOption === 'incorrect-only'}
          onChange={handleRadioChange}
          className="mr-2"
        />
        <label htmlFor="incorrect-only-radio">Failed questions only</label>
      </div>

      <button onClick={startNewTest}>Start new test</button>
    </div>
  )
}

export default TestReview
