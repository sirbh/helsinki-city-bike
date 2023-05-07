describe("layout should have all the routes", () => {
  it("should contain jourenys and station navigators", () => {
    cy.visit("");
    cy.contains("citybike", { matchCase: false });
    cy.contains("stations", { matchCase: false });
    cy.contains("journeys", { matchCase: false });
  });
});
