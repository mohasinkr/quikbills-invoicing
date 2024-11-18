describe('Authentication Tests', () => {
  it('should log in successfully', () => {
      cy.login();
      cy.url().should('include', '/');
  });
});