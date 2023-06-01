describe("menu test", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("");
    cy.contains("login", { matchCase: false }).click();
    cy.get("div.MuiCardContent-root").within(() => {
      cy.get('input[name="username"]').type("tempusername");
      cy.get('input[name="password"]').type("password!2A");
      cy.contains("login").click();
    });
    cy.get("div.MuiAvatar-root").click();
  });

  it("should contain name and username of the logged in user",()=>{
    cy.get("div.MuiMenu-paper").within(()=>{
        cy.contains("tempusername");
        cy.contains("tempuser");
    });
  });

  it("should contain logout and add station menu item",()=>{
    cy.get("div.MuiMenu-paper").within(()=>{
        cy.contains("Add another station");
        cy.contains("Logout");
    });
  });

  it("should logout if clicked on logout menu item",()=>{
    cy.get("div.MuiMenu-paper").within(()=>{
        cy.contains("Logout").click();
    });
    cy.contains('login',{matchCase:false});
    cy.get("div.MuiMenu-paper").should("not.exist");
  });

  it("should open add station form if clicked on add station menu item",()=>{
    cy.get("div.MuiMenu-paper").within(()=>{
        cy.contains("Add another station").click();
    });
    cy.get("div.css-3tfy7s").children().eq(2).within(()=>{
        cy.get("div.MuiCardHeader-root").within(()=>{
            cy.contains("Add Station");
            cy.contains("Enter Details Of New Station");
        });
        cy.get("div.MuiCardContent-root").within(()=>{
            cy.contains("name");
            cy.contains("address");
            cy.contains("city");
            cy.contains("latitude");
            cy.contains("longitude");
            cy.contains("capacity");
            cy.contains("Submit");
        });
    });
   

  });
});
