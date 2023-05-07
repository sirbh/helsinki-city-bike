describe("autocompleteInput test",()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000");
    });
    it("should contain drop down with no option when focused",()=>{
        cy.get('input').first().click();
        cy.contains('no options',{matchCase:false});
    });

    it("should show option according to what is typed in the input box",()=>{
        cy.get('input').first().click().type('aa');
        cy.get('[class^=MuiAutocomplete-popper]').contains('Aalto University (M), Korkeakoulua');

        cy.get('input').first().clear().type('z');
        cy.get('[class^=MuiAutocomplete-popper]').contains('No options');
    });
});