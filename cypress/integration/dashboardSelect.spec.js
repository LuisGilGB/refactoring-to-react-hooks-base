/* eslint-disable no-undef */
describe("Tests Select feature on dashboard view", () => {
  before(() => {
  });
  beforeEach(() => {
    cy.intercept('/api/sales', {fixture: 'stubs/sales.json'}).as('getSales');
    cy.intercept('/api/subscriptions', {fixture: 'stubs/subscriptions.json'}).as('getSubscriptions');
    cy.visit("");
    cy.wait('@getSales');
    cy.wait('@getSubscriptions');
  });
  it("It has a Select element with the default, Sales and Subscriptions options", () => {
    cy.get('[data-testid="select"]').as("select");
    cy.get("@select").contains("--");
    cy.get("@select").contains("Sales");
    cy.get("@select").contains("Subscriptions");
  });
  it("The default value is selected at start", () => {
    cy.get('[data-testid="select"]').invoke("val").should("equal", "");
  });
  it("Selecting the Sales option sets sales as its value", () => {
    cy.get('[data-testid="select"]')
      .select("Sales")
      .invoke("val")
      .should("equal", "sales");
  });
  it("Selecting the Subscriptions option sets subscriptions as its value", () => {
    cy.get('[data-testid="select"]')
      .select("Subscriptions")
      .invoke("val")
      .should("equal", "subscriptions");
  });
  it("Displays the right sales and subscriptions values in SummaryContainer (truncated stubs version)", () => {
    cy.intercept('/api/sales', {fixture: 'stubs/truncatedSales.json'}).as('getSales');
    cy.intercept('/api/subscriptions', {fixture: 'stubs/truncatedSubscriptions.json'}).as('getSubscriptions');
    cy.visit("");
    cy.wait('@getSales');
    cy.wait('@getSubscriptions');
    cy.get('[data-cy="sales-summary"]').contains('30');
    cy.get('[data-cy="subscriptions-summary"]').contains('41');
  });
  it("Displays the right sales and subscriptions values in SummaryContainer (complete stubs version)", () => {
    cy.get('[data-cy="sales-summary"]').contains('87523');
    cy.get('[data-cy="subscriptions-summary"]').contains('2273');
  });
});
