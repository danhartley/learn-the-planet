import { Dispatch, SetStateAction } from 'react'

import { ContentHandlerType } from '@/types'

type Props = {
  startDate: string
  setStartDate: Dispatch<SetStateAction<string>>
  endDate: string
  setEndDate: Dispatch<SetStateAction<string>>
  type: ContentHandlerType
}

export const FilterByDate = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  type,
}: Props) => {
  return (
    <div>
      <div className="horizontal-group">
        <div className={`form-row ${type}`}>
          <label htmlFor="collections-start-date">From</label>
          <input
            type="date"
            id="collections-start-date"
            name="collections-start-date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>
        <div className={`form-row ${type}`}>
          <label htmlFor="collections-end-date">To</label>
          <input
            type="date"
            id="collections-end-date"
            name="collections-end-date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
