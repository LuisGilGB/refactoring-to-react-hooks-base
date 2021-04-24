describe("Tests Select feature on dashboard view", () => {
  beforeEach(() => {
    cy.visit("");
  });
  it("It has a Select element with the default, Sales and Subscriptions options", () => {
    cy.get('[data-cy="select"]').as("select");
    cy.get("@select").contains("--");
    cy.get("@select").contains("Sales");
    cy.get("@select").contains("Subscriptions");
  });
  it("The default value is selected at start", () => {
    cy.get('[data-cy="select"]').invoke("val").should("equal", "");
  });
  it("Selecting the Sales option sets sales as its value", () => {
    cy.get('[data-cy="select"]')
      .select("Sales")
      .invoke("val")
      .should("equal", "sales");
  });
  it("Selecting the Subscriptions option sets subscriptions as its value", () => {
    cy.get('[data-cy="select"]')
      .select("Subscriptions")
      .invoke("val")
      .should("equal", "subscriptions");
  });
});
