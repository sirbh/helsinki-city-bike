describe("stations table tests", () => {
  beforeEach(() => {
    cy.visit("");
    cy.contains("stations", { matchCase: false }).click();
  });
  it("should contain correct headers", () => {
    const headers = ["Station Name", "City", "Address", "Capacity"];
    cy.get("table thead tr th")
      .then(($el) => {
        return Cypress._.map($el, "innerText");
      })
      .then((cellDataArray) => {
        expect(cellDataArray).to.deep.equal(headers);
      });
  });

  it("should have correct number of rows", () => {
    cy.get("table tbody tr").should("have.length", 10);
  });

  it("should have the correct content in a specific cell", () => {
    cy.get("table tbody tr:nth-child(2) td:nth-child(1)").should(
      "contain",
      "Baana"
    );
    cy.get("table tbody tr:nth-child(2) td:nth-child(2)").should(
      "contain",
      "Espoo"
    );
    cy.get("table tbody tr:nth-child(2) td:nth-child(3)").should(
      "contain",
      "Gräsviksgatan 23"
    );
    cy.get("table tbody tr:nth-child(2) td:nth-child(4)").should("contain", 16);
  });

  it("should be able to change the page when clicked on the arrows", () => {
    cy.get("[class^=MuiTablePagination]").contains("1–10 of 11");
    cy.get("[data-testid=KeyboardArrowRightIcon]").click();
    cy.wait(500);
    cy.get("[class^=MuiTablePagination]").contains("11–11 of 11");
    cy.get("[data-testid=KeyboardArrowLeftIcon]").click();
    cy.wait(500);
    cy.get("[class^=MuiTablePagination]").contains("1–10 of 11");
  });

  it("should show modal when clicked on the station", () => {
    cy.get("table tbody tr:nth-child(2) td:nth-child(1)")
      .contains("Baana")
      .click();
    cy.wait(500);
    cy.get("[class^=MuiModal-root]")
      .find("div")
      .should("have.class", "MuiPaper-root");
  });

  it("should show modal when clicked on the station shown in autocomplete dropdown", () => {
    cy.get("input").first().type("aa");
    cy.wait(500);
    cy.get("[class^=MuiAutocomplete-popper]")
      .contains("Aalto University (M), Korkeakoulua")
      .click();
    cy.wait(500);
    cy.get("[class^=MuiModal-root]")
      .find("div")
      .should("have.class", "MuiPaper-root")
      .find("div")
      .should("have.class", "MuiCardHeader-content");
  });
});
