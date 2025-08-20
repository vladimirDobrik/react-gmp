Cypress.Commands.add('getCounterValue', () => {
  return cy.get('[data-testid="counter-value"]').should('be.visible')
})

Cypress.Commands.add('clickIncrement', () => {
  return cy.get('[data-testid="increment-button"]').click()
})

Cypress.Commands.add('clickDecrement', () => {
  return cy.get('[data-testid="decrement-button"]').click()
})

Cypress.Commands.add('verifyCounterValue', (expectedValue: number) => {
  cy.get('[data-testid="counter-value"]').should('contain.text', expectedValue.toString().trim())
})

export {}
