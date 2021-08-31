const { get } = require("qwest");


describe('Students Screen', () => {
  beforeEach(() => {
    /*
      Cypress starts out with a blank slate for each test
      so we must tell it to visit our website with the `cy.visit()` command.
      Since we want to visit the same URL at the start of all our tests,
      we include it in our beforeEach function so that it runs before each test
    */
    cy.handleLogin()
    cy.test_students()
    
  });
  context('Testing Students Screen', () => {
    it('Validating backend response (mocked seeds)', () => {
        /* Hard coded structure to compare  */
        // cy.test_students()

        cy.log('**_____ Goin to Students Screen... _____**')
        cy.visit('/admissions/students')

        cy.wait('@test_students');
        cy.get('@test_students').then(xhr => {
        const students = xhr.response.body
        console.log("Response students:::",students) 
        
        
        }).its('response.body.results.length').should('be.eq', 2)
    });
    it('Validating pagination (offest and limit)', () => {
      // cy.test_students()

      cy.log('**_____ Goin to Students Screen... _____**')
      cy.visit('/admissions/students')

      cy.log('**_____Changing the number of rows per page shown to 40... _____**')
      cy.get('[data-testid=pagination-rows]').click({force: true})
      cy.get('[data-value="40"]').click({force: true})

      cy.log('**_____Verifying that the url changes with pagination... _____**')
      cy.url().should('include', 'limit=40&offset=0')

      // 

    });

    it('Validating search (like)', () => {
      cy.test_students()

      cy.log('**_____ Goin to Students Screen... _____**')
      cy.visit('/admissions/students')

      cy.log('**_____Making a search... _____**')
      cy.get('[data-testid=Search-iconButton]').click({force: true})
      cy.get('.MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type('Jonathan')
      cy.get('[data-testid=Search-iconButton]').click({force: true})

      cy.log('**_____Verifying that the url changes with search... _____**')
      cy.url().should('include', 'like="Jonathan"')

      // 

    });

    
  });
});
  