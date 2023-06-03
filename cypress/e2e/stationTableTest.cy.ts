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
    cy.get("p.MuiTablePagination-displayedRows").contains("1–10 of 11");
    cy.get("[data-testid=KeyboardArrowRightIcon]").click();
    cy.wait(500);
    cy.get("p.MuiTablePagination-displayedRows").contains("11–11 of 11");
    cy.get("[data-testid=KeyboardArrowLeftIcon]").click();
    cy.wait(500);
    cy.get("p.MuiTablePagination-displayedRows").contains("1–10 of 11");
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

  it("should not show checkbox if user is not logged in",()=>{
    cy.get("span.MuiCheckbox-root").should('not.exist');
  });
});


describe("station table test that require authentication", () => {
  before(() => {
    cy.visit("");
    cy.clearLocalStorage();
    cy.contains("login", { matchCase: false }).click();
    cy.get("div.MuiCardContent-root").within(() => {
      cy.get('input[name="username"]').type("tempusername");
      cy.get('input[name="password"]').type("password!2A");
      cy.contains("login").click();
    });
    cy.get("div.MuiAvatar-root").click();
    cy.get("div.MuiMenu-paper").within(() => {
      cy.contains("Add another station").click();
    });
    cy.get("div.MuiCardContent-root").within(() => {
      cy.get('input[name="name"]').type("some place");
      cy.get('input[name="address"]').type("45 some address");
      cy.get('input[name="longitude"]').type("-27");
      cy.get('input[name="latitude"]').type("-89");
      cy.get('input[name="capacity"]').type("4");

      cy.contains("Submit").click();
    });
    cy.wait(4000);
    cy.get("body").click(0, 0);
  });


  after(()=>{
    cy.get('input[id="combo-box-demo"]').type('some place');
    cy.wait(4000);
    cy.get("[class^=MuiAutocomplete-popper]").contains(
        "some place"
      ).click();
    cy.wait(4000);
    cy.contains('delete station').click();
    cy.get('body').click(0,0);
  });

  it("should contain checkbox to filter station based on user", () => {
    cy.contains("stations", { matchCase: false }).click();
    cy.get("span.MuiCheckbox-root")
      .siblings()
      .first()
      .contains("Show Stations Added By You");
    cy.get("span.MuiCheckbox-root").click();
    cy.get("table tbody tr").should("have.length", 1);
  });
});
