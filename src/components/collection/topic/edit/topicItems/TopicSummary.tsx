'use client'
import React from 'react'
import { Topic } from '@/types'

interface TopicSummaryProps {
  section: Topic
}

export const TopicSummary: React.FC<TopicSummaryProps> = ({ section }) => {
  const getSummaryText = (section: Topic): React.ReactElement => {
    if (section.topic) {
      return <>{section.topic}</>
    }

    if (section.text?.length) {
      const firstText = section.text.find(t => t && t.trim())
      if (firstText) {
        return (
          <>
            {firstText.length > 100 ? firstText.slice(0, 100) + '…' : firstText}
          </>
        )
      }
    }

    if (section.images?.length) {
      const firstImage = section.images.find(i => i?.caption)
      if (firstImage?.caption) {
        return (
          <>
            <span>[Image]</span>
            {firstImage.caption}
          </>
        )
      }
      return (
        <>
          <span>[Image]</span>
          {section.images.length > 1 ? 's' : ''}
        </>
      )
    }

    if (section.examples?.length) {
      const binomials = section.examples
        .map(e => e?.binomial)
        .filter(Boolean)
        .slice(0, 3) // Show max 3 taxa

      if (binomials.length > 0) {
        const taxaText = binomials.join(', ')
        const remaining = section.examples.length - binomials.length
        return (
          <>
            <span>[Taxa]</span>
            {taxaText}
            {remaining > 0 ? ` (+${remaining} more)` : ''}
          </>
        )
      }
      return (
        <>
          <span>[Taxa]</span>`${section.examples.length} example
          {section.examples.length > 1 ? 's' : ''}`
        </>
      )
    }
    return (
      <>
        <span>Section</span> {section.id}
      </>
    )
  }

  return <div>{getSummaryText(section)}</div>
}
