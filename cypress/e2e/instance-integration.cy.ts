describe("e2e", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5100");
  });

  it("instance method should be able to mount components", () => {
    cy.get("[data-test-action='render']")
      .should("exist")
      .click()
      .then(() => {
        cy.get("[data-testid='e2e']").should("exist");
      });
  });

  it("instance method should be able to destroy components", () => {
    cy.get("[data-test-action='destroy']")
      .should("exist")
      .click()
      .then(() => {
        cy.get("[data-testid='e2e']").should("not.exist");
      });
  });
});
