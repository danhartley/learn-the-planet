describe('template spec', () => {
  it('passes', () => {
    cy.visit('/collections')
    cy.contains('No score')
    // cy.findByRole('button').click()
    cy.findByText('No score')
    // cy.findByRole('button', { name: /Dill/i }).click()
    // cy.contains('Question count')
    // cy.findAllByRole('definition').first().should('have.text', '1')
    // cy.findAllByRole('definition').eq(1).should('have.text', '1')
  })
})
