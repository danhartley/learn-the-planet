import { useState } from 'react'

type Props = {
  onDateChange: (
    startDate: string | undefined,
    endDate: string | undefined
  ) => void
}

export const ObservationDates = ({ onDateChange }: Props) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleStartDateChange = (value: string) => {
    setStartDate(value)
    onDateChange(value, endDate)
  }

  const handleEndDateChange = (value: string) => {
    setEndDate(value)
    onDateChange(startDate, value)
  }

  return (
    <div className="group-block">
      <fieldset id="inat-observation-dates">
        <legend>
          <h2>When the observations were made</h2>
        </legend>
        <div className="list-group">
          <h3>
            <div>Date range</div>
          </h3>
          <div className="inat-group">
            <div className="form-row inat">
              <label htmlFor="observations-start-date">From</label>
              <input
                type="date"
                id="observations-start-date"
                name="observations-start-date"
                value={startDate}
                onChange={e => handleStartDateChange(e.target.value)}
              />
            </div>
            <div className="form-row inat">
              <label htmlFor="observations-end-date">To</label>
              <input
                type="date"
                id="observations-end-date"
                name="observations-end-date"
                value={endDate}
                onChange={e => handleEndDateChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
