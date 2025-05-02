import React from 'react'
import { ScoreDisplay } from '@/components/ScoreDisplay'

describe('<ScoreDisplay />', () => {
  it('renders', () => {
    cy.mount(<ScoreDisplay />)
  })
  it('renders with Test score message', () => {
    cy.mount(<ScoreDisplay />)
    cy.contains('Test score')
  })
})
