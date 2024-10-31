describe("Authentication", () => {
  it("Login flow", () => {
    cy.visit("/login");
    // Type email and password into form fields
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("password123");
  });
});
