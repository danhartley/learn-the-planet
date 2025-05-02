describe('template spec', () => {
  it('passes', () => {
    cy.visit('/collections')
    cy.contains('Test score')
  })
})
