describe("Kreditbee login", () => {
  it("Login", () => {
    //visiting app
    cy.visit(
      "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/login",
      { failOnStatusCode: false }
    );

    //wait to load
    cy.wait(2000);

    // get login with mobile button
    cy.get(
      "#app > div > div > div > div > div:nth-child(3) > div.skins__LoginBtnCon-fIoCIg.bfKfLI > div > div > div:nth-child(3) > div > a > a"
    )
      .children("span")
      .should("have.text", "Login with Registered Mobile")
      .click();

    //url assertion
    cy.url().should("contains", "/loginwithmob/mobileform");

    //get input for mobile number
    cy.get("input")
      .should("have.class", "BInput__InInp-hvYxkk ddfrol")
      .should("have.attr", "placeholder", "Enter your registered mobile number")
      .type(Cypress.env("mob"));

    //click on Get OTP
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > form > div.skins__OtpCon-gQOXOO.eVXRnx > button"
    ).click();

    //waiting for otp
    cy.wait(20000);

    //click submit
    cy
      .contains("Submit")
      // .should('have.class','BBtn__BBtn-jiCKdh dBKBDe')
      // .get('.BBtn__BBtn-jiCKdh')
      // .should('have.text','Submit')
      .click();

    //click Continue Application
    cy.get(".skins__FixedFooterBtnCon-bqFnzp > .BBtn__BBtn-jiCKdh")
      .should("have.text", "Continue Application ")
      .click({ force: true })
      .wait(2000);

    //url assertion
    cy.url().should(
      "include",
      "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/summary"
    );

    //click on additional info
    cy.get("[data-id=additionalinfo]")
      .should("have.text", "Additional InformationA few more details about you")
      .click()
      .wait(2000);

    // url assertion
    cy.url().should(
      "include",
      "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/additionalinfo"
    );

    // click on Advanced Mobile Authentication
    cy.get(".skins__SummaryCon-eWQpKA > :nth-child(3) > :nth-child(1)")
      .should(
        "have.text",
        "Advanced Mobile AuthenticationRe-verify your official mobile number"
      )
      .click()
      .wait(2000);

    // url assertion
    cy.url().should("include", "/extradetails/advanceMobAuth/info");

    //check mobile no.
    cy.get(":nth-child(1) > b").should("have.text", " 9044310437");

    // clicking continue
    cy.get(".skins__ContinueBtn-hpCLmH")
      .should("have.text", " Continue ")
      .click()
      .wait(2000);

    //url assertion
    cy.url().should("contains", "/extradetails/mobauth/consent");

    //checking text
    cy.get("div > h3 > span").should("have.text", "Letter of consent:");
  });

                                                  
                                                    // New Adv Verification with Airtel
  it("Airtel mobile operator", () => {
    cy.server();

    cy.fixture("adv_auth").as("mob");
    cy.route(
      "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile",
      "@mob"
    );

    cy.visit(
      "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/login",
      { failOnStatusCode: false }
    );

    // wait to load
    cy.wait(2000);

    // get login with mobile button
    cy.get(
      "#app > div > div > div > div > div:nth-child(3) > div.skins__LoginBtnCon-fIoCIg.bfKfLI > div > div > div:nth-child(3) > div > a > a"
    )
      .children("span")
      .should("have.text", "Login with Registered Mobile")
      .click();

    //url assertion
    cy.url().should("contains", "/loginwithmob/mobileform");

    //get input for mobile number
    cy.get("input")
      .should("have.class", "BInput__InInp-hvYxkk ddfrol")
      .should("have.attr", "placeholder", "Enter your registered mobile number")
      .type(Cypress.env("mob"));

    //click on Get OTP
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > form > div.skins__OtpCon-gQOXOO.eVXRnx > button"
    ).click();

    //waiting for otp
    cy.wait(20000);

    //click submit
    cy
      .contains("Submit")
      // .should('have.class','BBtn__BBtn-jiCKdh dBKBDe')
      // .get('.BBtn__BBtn-jiCKdh')
      // .should('have.text','Submit')
      .click();

    // click Continue Application
    cy.get(".skins__FixedFooterBtnCon-bqFnzp > .BBtn__BBtn-jiCKdh")
      .should("have.text", "Continue Application ")
      .click({ force: true })
      .wait(2000);

    //url assertion
    cy.url().should(
      "include",
      "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/summary"
    );

    //click on additional info
    cy.get("[data-id=additionalinfo]")
      .should("have.text", "Additional InformationA few more details about you")
      .click()
      .wait(2000);

    // url assertion
    cy.url().should(
      "include",
      "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/additionalinfo"
    );

    cy.get(".skins__SummaryCon-eWQpKA > :nth-child(3) > :nth-child(1)")
      .should(
        "have.text",
        "Advanced Mobile AuthenticationRe-verify your official mobile number"
      )
      .click()
      .wait(2000);

    // url assertion
    cy.url().should("include", "/extradetails/advanceMobAuth/info");

    //check mobile no.
    cy.get(":nth-child(1) > b").should("have.text", " "+Cypress.env("mob"));

    // clicking continue
    cy.get(".skins__ContinueBtn-hpCLmH")
      .should("have.text", " Continue ")
      .click()
      .wait(2000);

    //url assertion
    cy.url().should("contains", "/extradetails/mobauth/consent");

    //checking text
    cy.get("div > h3 > span").should("have.text", "Letter of consent:")

    cy.get('#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > button').click();

    // cy.fixture("process_adv_auth").as("processing");
    // cy.route(
    //   "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile",
    //   "@processing"
    // );
    cy.wait(20000);
    cy.get('.BBtn__BBtn-jiCKdh').click();

    cy.fixture("verified_adv_auth").as("done");
    cy.route(
      "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile",
      "@done"
    );


                                                        // New Adv Wrong Verification 
  // it.only("Wrong mobile operator", () => {
  //   cy.server();

  //   cy.fixture("adv_auth").as("mob");
  //   cy.route(
  //     "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile",
  //     "@mob"
  //   );

  //   cy.visit(
  //     "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/login",
  //     { failOnStatusCode: false }
  //   );

  //   // wait to load
  //   cy.wait(2000);

    // // get login with mobile button
    // cy.get(
    //   "#app > div > div > div > div > div:nth-child(3) > div.skins__LoginBtnCon-fIoCIg.bfKfLI > div > div > div:nth-child(3) > div > a > a"
    // )
    //   .children("span")
    //   .should("have.text", "Login with Registered Mobile")
    //   .click();

    // //url assertion
    // cy.url().should("contains", "/loginwithmob/mobileform");

    // //get input for mobile number
    // cy.get("input")
    //   .should("have.class", "BInput__InInp-hvYxkk ddfrol")
    //   .should("have.attr", "placeholder", "Enter your registered mobile number")
    //   .type(Cypress.env("mob"));

    // //click on Get OTP
    // cy.get(
    //   "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > form > div.skins__OtpCon-gQOXOO.eVXRnx > button"
    // ).click();

    // //waiting for otp
    // cy.wait(20000);

    // //click submit
    // cy
    //   .contains("Submit")
    //   // .should('have.class','BBtn__BBtn-jiCKdh dBKBDe')
    //   // .get('.BBtn__BBtn-jiCKdh')
    //   // .should('have.text','Submit')
    //   .click();

  //   // click Continue Application
  //   cy.get(".skins__FixedFooterBtnCon-bqFnzp > .BBtn__BBtn-jiCKdh")
  //     .should("have.text", "Continue Application ")
  //     .click({ force: true })
  //     .wait(2000);

  //   //url assertion
  //   cy.url().should(
  //     "include",
  //     "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/summary"
  //   );

  //   //click on additional info
  //   cy.get("[data-id=additionalinfo]")
  //     .should("have.text", "Additional InformationA few more details about you")
  //     .click()
  //     .wait(2000);

  //   // url assertion
  //   cy.url().should(
  //     "include",
  //     "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/additionalinfo"
  //   );

  //   cy.get(".skins__SummaryCon-eWQpKA > :nth-child(3) > :nth-child(1)")
  //     .should(
  //       "have.text",
  //       "Advanced Mobile AuthenticationRe-verify your official mobile number"
  //     )
  //     .click()
  //     .wait(2000);

  //   // url assertion
  //   cy.url().should("include", "/extradetails/advanceMobAuth/info");

  //   //check mobile no.
  //   cy.get(":nth-child(1) > b").should("have.text", " "+Cypress.env("mob"));

  //   // clicking continue
  //   cy.get(".skins__ContinueBtn-hpCLmH")
  //     .should("have.text", " Continue ")
  //     .click()
  //     .wait(2000);

  //   //url assertion
  //   cy.url().should("contains", "/extradetails/mobauth/consent");

  //   //checking text
  //   cy.get("div > h3 > span").should("have.text", "Letter of consent:")

  //   cy.get('#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > button').click();

  //   cy.fixture("process_adv_auth").as("processing");
  //   cy.route(
  //     "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile",
  //     "@processing"
  //   );
  //   cy.wait(20000);
  //   cy.get('.BBtn__BBtn-jiCKdh').click();

  //   //cy.fixture("consent_response").as('consent')
  //   //cy.route('https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile/advancemoblogin', '@consent');

  //   cy.reload()
  //   cy.fixture("verified_adv_auth").as("done");
  //   cy.route(
  //     "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile",
  //     "@done"
  //   );  
  });
});
