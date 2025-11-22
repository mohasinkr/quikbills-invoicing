import React from "react";
import LoadingSpinner from "../../components/ui/loading-spinner";

describe("<LoadingSpinner />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoadingSpinner spinnerClassName="text-black" />);
  }),
    it("should have the text 'Loading'", () => {
      cy.mount(
        <LoadingSpinner spinnerClassName="text-black" label="Loading" />
      );
      cy.get("[data-cy=loading-text]").should("have.text", "Loading");
    });
});
