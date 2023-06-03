describe("station modal tests", () => {
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
      cy.get("div.MuiMenu-paper").within(()=>{
        cy.contains("Add another station").click();
    });
    });

    it("should show relevant error if submitted empty",()=>{
        cy.contains('Submit').click();
        cy.get('div.MuiCardContent-root').within(()=>{
            cy.get('div.MuiGrid-container').children().eq(0).contains('required');
            cy.get('div.MuiGrid-container').children().eq(1).contains('required');
            cy.get('div.MuiGrid-container').children().eq(2).contains('required').should('not.exist');
            cy.get('div.MuiGrid-container').children().eq(3).contains('required');
            cy.get('div.MuiGrid-container').children().eq(4).contains('required');
            cy.get('div.MuiGrid-container').children().eq(5).contains('required');
        });
    });

    it("should be able to successfully add new station if provided with correct details and delete it",()=>{
        cy.get('div.MuiCardContent-root').within(()=>{
            cy.get('input[name="name"]').type('some place');
            cy.get('input[name="address"]').type('45 some address');
            cy.get('input[name="longitude"]').type('-27');
            cy.get('input[name="latitude"]').type('-89');
            cy.get('input[name="capacity"]').type('4');
            
            cy.contains('Submit').click();
        });
        cy.wait(4000);
        cy.contains('*some place added successfully');
        cy.get('body').click(0,0);
        cy.contains('stations',{matchCase:false}).click();
        cy.get('input[id="combo-box-demo"]').type('some place');
        cy.wait(4000);
        cy.get("[class^=MuiAutocomplete-popper]").contains(
            "some place"
          ).click();
        cy.wait(4000);
        cy.contains('delete station').click();
        cy.wait(4000);
        cy.contains('station deleted');      
    });
});