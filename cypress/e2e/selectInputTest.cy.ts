describe("select input test",()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000");
    });
    it("should have Departure selected by default",()=>{
        cy.get('[id=journey-type]').contains('Departure');
    });
    it("should contain drop down with two option Departure and Return",()=>{
        cy.get('[id=journey-type]').first().click();
        cy.get('ul li:nth-child(1)').contains('Departure');
        cy.get('ul li:nth-child(2)').contains('Return');
    });
});