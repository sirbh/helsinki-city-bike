describe("authentication modal test", () => {
  beforeEach(() => {
    cy.visit("");
    cy.contains("login", { matchCase: false }).click();
  });
  it("should contain modal with login form", () => {
    cy.get("div.MuiCardHeader-content").within(() => {
      cy.contains("Login");
      cy.contains("Please Login To Add More Stations");
    });

    cy.get("div.MuiCardContent-root").within(() => {
      cy.contains("username");
      cy.contains("login");
      cy.contains("password");
      cy.contains("No Account? Kindly Register");
    });
    //   cy.contains("Gräsviksgatan 23");
  });

  it("should contain link to the registeration form", () => {
    cy.contains("No Account? Kindly Register").click();
    cy.get("div.MuiCardHeader-content").within(() => {
      cy.contains("Looks Like You Are New Here !!");
      cy.contains("Register Here To Unlock More Features");
    });

    cy.get("div.MuiCardContent-root").within(() => {
      cy.contains("Already Registred? Login Here");
      cy.contains("name");
      cy.contains("username");
      cy.contains("password");
      cy.contains("confirm password");
      cy.contains("submit");
    });
  });
});

describe("login form test",()=>{
    beforeEach(() => {
        cy.visit("");
        cy.contains("login", { matchCase: false }).click();
      });

    it("should through error if submitted empty",()=>{
        cy.get("div.MuiCardContent-root").within(() => {
            cy.contains("login").click();
          });
        cy.contains('username is required');
        cy.contains('password is required');
    });

    it("should show avatar icon if provided with correct credentials",()=>{
        cy.get("div.MuiCardContent-root").within(() => {
            cy.get('input[name="username"]').type('tempusername');
            cy.get('input[name="password"]').type('password!2A');
            cy.contains("login").click();
          });

        cy.get("div.MuiAvatar-root").contains("T");    
    });
});

describe("register form test",()=>{
    beforeEach(() => {
        cy.visit("");
        cy.contains("login", { matchCase: false }).click();
        cy.contains("No Account? Kindly Register", { matchCase: false }).click();
      });

    it("should through error if submitted empty",()=>{
        cy.get("div.MuiCardContent-root").within(() => {
            cy.contains("submit").click();
          });
        cy.contains('username is required');
        cy.contains('password is required');
        cy.contains('confirm password is required');
        cy.contains('password is required');
    });

    it("should through error if password and confirm password do not match",()=>{
        cy.get("div.MuiCardContent-root").within(() => {
            cy.get('input[name="name"]').type('testUser');
            cy.get('input[name="username"]').type('testUsername');
            cy.get('input[name="password"]').type('password');
            cy.get('input[name="confirmPass"]').type('password2');
            cy.contains("submit").click();
          });
       cy.contains('Passwords must match');
    });
});
