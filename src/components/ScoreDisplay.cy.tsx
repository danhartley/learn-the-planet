import React from 'react'
import { ScoreDisplay } from './ScoreDisplay'

describe('<ScoreDisplay />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ScoreDisplay />)
  })
})