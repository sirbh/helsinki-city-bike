describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.contains('citybike',{matchCase:false});
    cy.contains('stations',{matchCase:false});
    cy.contains('journeys',{matchCase:false});
  });
});