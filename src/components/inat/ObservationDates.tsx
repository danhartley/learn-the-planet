import { useState } from 'react'

type Props = {
  onDateChange: (
    startDate: string | undefined,
    endDate: string | undefined
  ) => void
}

export const ObservationDates = ({ onDateChange }: Props) => {
  const [selectedMode, setSelectedMode] = useState<'range' | 'single' | 'none'>(
    'none'
  )
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [singleDate, setSingleDate] = useState('')

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const handleModeChange = (mode: 'range' | 'single' | 'none') => {
    setSelectedMode(mode)

    if (mode === 'none') {
      onDateChange(undefined, undefined)
    } else if (mode === 'range') {
      const today = getTodayDate()
      const newStartDate = startDate || today
      const newEndDate = endDate || today
      setStartDate(newStartDate)
      setEndDate(newEndDate)
      onDateChange(newStartDate, newEndDate)
    } else if (mode === 'single') {
      const today = getTodayDate()
      const newSingleDate = singleDate || today
      setSingleDate(newSingleDate)
      onDateChange(newSingleDate, newSingleDate)
    }
  }

  const handleStartDateChange = (value: string) => {
    setStartDate(value)
    onDateChange(value, endDate)
  }

  const handleEndDateChange = (value: string) => {
    setEndDate(value)
    onDateChange(startDate, value)
  }

  const handleSingleDateChange = (value: string) => {
    setSingleDate(value)
    onDateChange(value, value)
  }

  return (
    <div className="group-block">
      <fieldset id="inat-observation-dates">
        <legend>
          <h2>When the observations were made</h2>
        </legend>
        <div className="column-group">
          <div className="list-group">
            <h3>
              <label htmlFor="rbDateRange">Date range</label>
            </h3>
            <div className="form-row inat">
              {/* <input
                id="rbDateRange"
                type="radio"
                name="rbDate"
                value="range"
                checked={selectedMode === 'range'}
                onChange={() => handleModeChange('range')}
              /> */}
              <label htmlFor="observations-start-date">From</label>
              <input
                type="date"
                id="observations-start-date"
                name="observations-start-date"
                value={startDate}
                onChange={e => handleStartDateChange(e.target.value)}
              />
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
          {/* <div className="list-group">
              <h3>
                <label htmlFor="rbSingleDate">Single date</label>
              </h3>
              <div className="form-row inat">
                <input
                  id="rbSingleDate"
                  type="radio"
                  name="rbDate"
                  value="single"
                  checked={selectedMode === 'single'}
                  onChange={() => handleModeChange('single')}
                />
                <label htmlFor="single-observations-input-date">Date</label>
                <input
                  type="date"
                  id="single-observations-input-date"
                  name="single-observations-input-date"
                  value={singleDate}
                  onChange={e => handleSingleDateChange(e.target.value)}
                />
              </div>
            </div> */}
          {/* <div className="form-row inat">
            <input
              id="rbDate"
              type="radio"
              name="rbDate"
              value="none"
              checked={selectedMode === 'none'}
              onChange={() => handleModeChange('none')}
            />
            <label htmlFor="rbDate">Any time</label>
          </div> */}
        </div>
      </fieldset>
    </div>
  )
}
