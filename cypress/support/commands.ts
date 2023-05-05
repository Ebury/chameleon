/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// Cypress.Commands.add('getBySel', (selector, ...args) => cy.get(`[data-test=${selector}]`, ...args));

// Cypress.Commands.add('getBySelLike', (selector, ...args) => cy.get(`[data-test*=${selector}]`, ...args));
// Cypress.Commands.addQuery('getBySelLike', selector => subject => subject.log());
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       // login(email: string, password: string): Chainable<void>
//       // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//       getBySel(originalFn: CommandOriginalFn, selector: string): Chainable<Element>
//       getBySelLike(originalFn: CommandOriginalFn, selector: string): Chainable<Element>
//     }
//   }
// }

// eslint-disable-next-line import/no-extraneous-dependencies
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();
