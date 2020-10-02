describe("test", () => {
  Cypress.config("baseUrl", "https://www.royalenfield.com");
  it("royal enfield", () => {
    cy.visit("/");

    cy.contains("Accept").click().wait(1000);

    cy.contains("Locate Us").should("have.text", "Locate Us").click();

    cy.server();

    cy.fixture("country.json").as("con");
    cy.route(
      "GET",
      "https://api.royalenfield.com/v2/core/dealers/dealer-countries?searchType=dealer&isBTR=false",
      "@con"
    );
    cy.fixture("states.json").as("states");
    cy.route({
      method: "GET",
      url: "https://api.royalenfield.com/v2/core/dealers/locate-dealers?*",
      status: 200,
      response: "@states",
      delay: 500,
    });

    cy.fixture("dealers").as("dealers");

    cy.route(
      "POST",
      "https://api.royalenfield.com/v2/core/dealers/locate-dealers",
      "@dealers"
    );

    cy.contains("Find a Store")
      .should("have.class", "custom-btn arrow-r")
      .click();

    cy.url().should("contain", "/locate-us/dealers");

    cy.get("#countySel")
      .wait(1000)
      .select("India")
      .wait(1000)
      .should("have.value", "in");

    cy.get("#stateSel")
      .wait(1000)
      .select("Uttar Pradesh")
      .wait(1000)
      .should("have.value", "Uttar Pradesh");

    cy.get("#districtSel")
      .select("Lucknow")
      .wait(1000)
      .should("have.value", "Lucknow");
  });
});
