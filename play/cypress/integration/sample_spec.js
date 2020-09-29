
describe("My test",()=>{
    // it('test1', () => {
    //     expect(true).to.equal(true)
    // });
    // it('test1', () => {
    //     expect(true).to.equal(false)
    // });
    it('Visit link', () => {
        cy.visit('https://example.cypress.io');

        cy.contains('type').click();

        cy.url().should('include', '/commands/actions')

        cy.get('.action-email')
        .type('fake@email.com')
        .should('have.value', 'fake@email.com')  
    });
    
    
})