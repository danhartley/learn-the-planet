import React from 'react'
import { ScoreDisplay } from './ScoreDisplay'

describe('<ScoreDisplay />', () => {
  it('renders', () => {
    cy.mount(<ScoreDisplay />)
  })
  it('renders with No Score message', () => {
    cy.mount(<ScoreDisplay />)
    cy.contains('No score')
  })
})
