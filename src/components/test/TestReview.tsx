'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import { HistoryItem, Layout, isDefined } from '@/types'

function TestReview<T>() {
  const { testHistory, layouts, startRetest } = useTestPlanner<T>()
  const [selectedOption, setSelectedOption] = useState('failed')

  const router = useRouter()

  const failedLayouts = layouts
    ?.map(layout => {
      const score = (testHistory as HistoryItem<T>[]).find(
        (history: HistoryItem<T>) => history.layoutId === layout.id
      )
      if (!score?.isCorrect) {
        return layout
      }
    })
    .filter(isDefined) as Layout<T>[]

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(event.target.value)
  }

  const startNewTest = () => {
    const layoutsToTest = (
      selectedOption === 'all' ? layouts : failedLayouts
    ) as Layout<T>[]
    startRetest(layoutsToTest)
    router.push('/test')
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
          id="failed-radio"
          name="test-mode"
          value="failed"
          checked={selectedOption === 'failed'}
          onChange={handleRadioChange}
          className="mr-2"
        />
        <label htmlFor="failed-radio">Failed questions only</label>
      </div>

      <button onClick={startNewTest}>Start new test</button>
    </div>
  )
}

export default TestReview
