'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import { HistoryItem, Layout, isDefined } from '@/types'

function TestReview<T>() {
  const { testHistory, layouts, startRetest } = useTestPlanner<T>()
  const [selectedOption, setSelectedOption] = useState('failed')

  const router = useRouter()

  const newLayouts = layouts
    ?.map(layout => {
      const score = (testHistory as HistoryItem<T>[]).find(
        (history: HistoryItem<T>) => history.layoutId === layout.id
      )
      if (!score?.isCorrect) {
        return layout
      }
    })
    .filter(isDefined) as Layout<T>[]

  const handleChange = (option: string) => {
    setSelectedOption(option)
    console.log(option)
  }

  const startNewTest = () => {
    startRetest(newLayouts)
    router.push('/test')
  }

  return (
    <>
      <div>
        <input
          type="radio"
          id="all"
          name="test"
          value="all"
          checked={selectedOption === 'all'}
          onChange={e => handleChange(e.target.value)}
        />
        <label htmlFor="all">All</label>
      </div>
      <div>
        <input
          type="radio"
          id="failed"
          name="test"
          value="failed"
          checked={selectedOption === 'failed'}
          onChange={e => handleChange(e.target.value)}
        />
        <label htmlFor="failed">Failed only</label>
      </div>
      <button onClick={startNewTest}>Start new test</button>
    </>
  )
}

export default TestReview
