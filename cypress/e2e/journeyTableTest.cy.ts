describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should have correct header", () => {
    cy.get("table thead tr th:nth-child(1)").should(
      "contain",
      "Departure station"
    );
    cy.get("table thead tr th:nth-child(2)").should(
      "contain",
      "Return Station"
    );
    cy.get("table thead tr th:nth-child(3)").should(
      "contain",
      "Covered Distance"
    );
    cy.get("table thead tr th:nth-child(4)").should("contain", "Duration");
  });
  it("should have correct number of rows", () => {
    cy.get("table tbody tr").should("have.length", 10);
  });
  it("should have the correct content in a specific cell", () => {
    cy.get("table tbody tr:nth-child(2) td:nth-child(1)").should(
      "contain",
      "Aalto-yliopisto (M), Korkeakouluaukio"
    );
    cy.get("table tbody tr:nth-child(2) td:nth-child(2)").should(
      "contain",
      "Tekniikantie"
    );
    cy.get("table tbody tr:nth-child(2) td:nth-child(3)").should(
      "contain",
      0.51
    );
    cy.get("table tbody tr:nth-child(2) td:nth-child(4)").should(
      "contain",
      2.5
    );
  });
});
