'use client'
import React from 'react'
import { Topic } from '@/types'

interface TopicSummaryProps {
  section: Topic
}

export const TopicSummary: React.FC<TopicSummaryProps> = ({ section }) => {
  const getSummaryText = (section: Topic): string => {
    if (section.topic) {
      return `Text: ${section.topic}`
    }

    if (section.text?.length) {
      const firstText = section.text.find(t => t && t.trim())
      if (firstText) {
        return `Text: ${firstText.length > 100 ? firstText.slice(0, 100) + '…' : firstText}`
      }
    }

    if (section.images?.length) {
      const firstImage = section.images.find(i => i?.caption)
      if (firstImage?.caption) {
        return `Image: ${firstImage.caption}`
      }
      return `Image: ${section.images.length} image${section.images.length > 1 ? 's' : ''}`
    }

    if (section.examples?.length) {
      const binomials = section.examples
        .map(e => e?.binomial)
        .filter(Boolean)
        .slice(0, 3) // Show max 3 taxa

      if (binomials.length > 0) {
        const taxaText = binomials.join(', ')
        const remaining = section.examples.length - binomials.length
        return `Taxa: ${taxaText}${remaining > 0 ? ` (+${remaining} more)` : ''}`
      }
      return `Taxa: ${section.examples.length} example${section.examples.length > 1 ? 's' : ''}`
    }

    return `Section ${section.id}`
  }

  return <div>{getSummaryText(section)}</div>
}
