/// <reference types="cypress" />

describe('Counter', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  describe('Renders correctly', () => {
    it('should have proper button styling and text', () => {
      cy.get('[data-testid="decrement-button"]')
        .should('be.visible')
        .should('contain.text', '-')
        .should('be.enabled');

      cy.get('[data-testid="increment-button"]')
        .should('be.visible')
        .should('contain.text', '+')
        .should('be.enabled');
    })

    it('should display counter value prominently', () => {
      cy.get('[data-testid="counter-value"]')
        .should('be.visible')
        .should('contain.text', '0');
    })
  });

  describe('Initial value', () => {
    it('renders initial value', () => {
      cy.get('[data-testid="counter-value"]').should('be.visible');
      cy.get('[data-testid="decrement-button"]').should('be.visible');
      cy.get('[data-testid="increment-button"]').should('be.visible');

      cy.verifyCounterValue(0);
    });
  });

  describe('Increment', () => {
    it('increments the displayed value on click', () => {
      cy.verifyCounterValue(0);

      cy.clickIncrement();

      cy.verifyCounterValue(1);
    });
  })

  describe('Decrement', () => {
    it('decrements the displayed value on click', () => {
      cy.clickIncrement();
      cy.verifyCounterValue(1);

      cy.clickDecrement();

      cy.verifyCounterValue(0);
    });

    it('decrement button does not go below 0', () => {
      cy.verifyCounterValue(0);

      cy.clickDecrement();
      
      cy.verifyCounterValue(0);
    });
  });
});
