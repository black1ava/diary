describe('renders homepage', () => {
  it('Change route', () => {
    cy.visit('/diaries');
    cy.get('#title').should('exist').focus().type('This diary is written by cypress').blur();
    cy.get('#description').should('exist').focus().type('Well, \nI wrote some command to make it do all of these things and it sounds like a robot to me').blur();
    cy.contains('Save Diary').should('exist').click();
    cy.wait(2000);
    cy.visit('/');
    cy.get('#user').should('exist').click();
    cy.get('#theme').should('exist').click();
    cy.wait(2000)
    cy.get('#delete-this-diary-is-written-by-cypress').should('exist').click();
    cy.contains('Delete').should('exist').click();
    cy.wait(2000);
    cy.get('#edit-lorem').should('exist').click();
    cy.get('#title').should('exist').focus().clear().type('I still dont know what is lorem').blur();
    cy.get('#save-change').should('exist').click();
    cy.get('#more-i-still-dont-know-what-is-lorem').should('exist').click();
    cy.wait(2000);
    cy.visit('/');
    cy.get('#edit-i-still-dont-know-what-is-lorem').click();
    cy.get('#title').focus().clear().type('Lorem');
    cy.get('#save-change').click();
  })
}) 