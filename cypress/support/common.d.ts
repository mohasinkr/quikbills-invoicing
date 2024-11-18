declare namespace Cypress {
    interface Chainable {
        login(): Chainable<Element>;
        ensureLoggedIn(): Chainable<Element>;
    }
}