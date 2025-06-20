'use client'
import React, { useRef, useEffect } from 'react'

type MultiSelectListProps = {
  options: string[]
  selectedValues: string[]
  onSelectionChange: (selectedValues: string[]) => void
  onRefsReady?: (refs: Record<string, HTMLInputElement | null>) => void
  disabled?: boolean
  className?: string
}

export default function MultiSelectList({
  options,
  selectedValues,
  onSelectionChange,
  onRefsReady,
  disabled = false,
  className = '',
}: MultiSelectListProps) {
  const checkboxRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return

    const value = e.target.value
    const newSelection = selectedValues?.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues!!, value]

    onSelectionChange(newSelection)
  }

  // Make refs available to parent when they're ready
  useEffect(() => {
    if (onRefsReady) {
      onRefsReady(checkboxRefs.current)
    }
  }, [onRefsReady, options]) // Re-run when options change

  const optionElements = options.map((option: string) => (
    <div key={option} className="row-group">
      <input
        id={option}
        type="checkbox"
        onChange={handleChange}
        value={option}
        checked={selectedValues?.includes(option)}
        disabled={disabled}
        ref={el => {
          checkboxRefs.current[option] = el
        }}
      />
      <label htmlFor={option}>{option}</label>
    </div>
  ))

  return <div className={`grid-lg options ${className}`}>{optionElements}</div>
}
