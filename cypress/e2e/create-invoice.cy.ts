describe("Create Invoice flow", ()=>{
    before(() => {
        cy.ensureLoggedIn();
    });
    it("display the invoice listing page",()=>{
        cy.visit("/invoice");
        cy.get("button")
        .contains("Create New Invoice").click();

        cy.get("div[role=dialog]").should("be.visible").get("h2").contains("Create Invoice");
    })
})