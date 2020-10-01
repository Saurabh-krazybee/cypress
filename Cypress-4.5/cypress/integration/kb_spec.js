describe('login',()=>{
    it('Visit link', () => {
        cy.visit('http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/login', {failOnStatusCode: false});

        cy.wait(1000);

        cy         
            .contains('Continue Application')
            .should('have.text','Continue Application')
            .wait(1000)
            .click({force:true})
            .wait(1000);

        cy
            .url()
            .should('include','http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/summary');

        cy
            // .get('table')
            // .should('have.attr','class','skins__SumTable-jlNanu iJOTsf')
            // .get('tbody>tr')
            .get('[data-id=additionalinfo]')
            .click()
            .wait(1000);

        cy
            .url()
            .should('include','http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/additionalinfo');      
    }); 
})