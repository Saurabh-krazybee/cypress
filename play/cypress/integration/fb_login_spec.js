describe("login", () => {
  it("Visit link", () => {
    cy.visit("https://www.facebook.com/login/");

    cy.get("#email").type(Cypress.env("Email"));
    // cy.get('#email').type();

    cy.get("#pass").type(Cypress.env("Pass"));

    cy.get("#loginbutton").click();

    cy.wait(1000);

    cy.get("[title=Profile]").click();

    cy.url().should("include", "/krazybee707");

    cy.get("#userNavigationLabel").wait(10000).click();

    cy.wait(5000);

    cy.contains("Log Out").click();
  });
});
