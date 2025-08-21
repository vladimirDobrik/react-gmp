/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getCounterValue(): Chainable<JQuery<HTMLElement>>
    clickIncrement(): Chainable<JQuery<HTMLElement>>
    clickDecrement(): Chainable<JQuery<HTMLElement>>
    verifyCounterValue(expectedValue: number): Chainable<void>
  }
}
