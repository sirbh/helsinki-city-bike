describe("single station modal view test", () => {
  beforeEach(() => {
    cy.visit("");
    cy.contains("stations", { matchCase: false }).click();
    cy.get("table tbody tr:nth-child(2) td:nth-child(1)").click();
    cy.wait(500);
  });
  it("should contain the correct heading and station name", () => {
    cy.contains("Baana Station");
    cy.contains("Gräsviksgatan 23");
  });

  it("should contain correct popular stations", () => {
    cy.contains("1. Sähkömies");
    cy.contains("1. Otaranta");
  });
});
