describe("Kreditbee login", () => {
  // it("Login", () => {
  //   //visiting app
  //   cy.visit(
  //     "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/login",
  //     { failOnStatusCode: false }
  //   );

  //   //wait to load
  //   cy.wait(2000);

  //   // get login with mobile button
  //   cy.get(
  //     "#app > div > div > div > div > div:nth-child(3) > div.skins__LoginBtnCon-fIoCIg.bfKfLI > div > div > div:nth-child(3) > div > a > a"
  //   )
  //     .children("span")
  //     .should("have.text", "Login with Registered Mobile")
  //     .click();

  //   //url assertion
  //   cy.url().should("contains", "/loginwithmob/mobileform");

  //   //get input for mobile number
  //   cy.get("input")
  //     .should("have.class", "BInput__InInp-hvYxkk ddfrol")
  //     .should("have.attr", "placeholder", "Enter your registered mobile number")
  //     .type(Cypress.env("mob"));

  //   //click on Get OTP
  //   cy.get(
  //     "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > form > div.skins__OtpCon-gQOXOO.eVXRnx > button"
  //   ).click();

  //   //waiting for otp
  //   cy.wait(20000);

  //   //click submit
  //   cy
  //     .contains("Submit")
  //     // .should('have.class','BBtn__BBtn-jiCKdh dBKBDe')
  //     // .get('.BBtn__BBtn-jiCKdh')
  //     // .should('have.text','Submit')
  //     .click();
  //   });

  // it("Flow", () => {

  //   //click Continue Application
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

  //   // click on Advanced Mobile Authentication
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
  //   cy.get(":nth-child(1) > b").should("have.text", " 9044310437");

  //   // clicking continue
  //   cy.get(".skins__ContinueBtn-hpCLmH")
  //     .should("have.text", " Continue ")
  //     .click()
  //     .wait(2000);

  //   //url assertion
  //   cy.url().should("contains", "/extradetails/mobauth/consent");

  //   //checking text
  //   cy.get("div > h3 > span").should("have.text", "Letter of consent:");
  // });

  //                                                   // New Adv Verification with Airtel
  // it("Airtel mobile operator", () => {
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

  //   // cy.fixture("process_adv_auth").as("processing");
  //   // cy.route(
  //   //   "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile",
  //   //   "@processing"
  //   // );
  //   cy.wait(20000);
  //   cy.get('.BBtn__BBtn-jiCKdh').click();

  //   cy.fixture("verified_adv_auth").as("done");
  //   cy.route(
  //     "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile",
  //     "@done"
  //   );

  //                                                                     // New Adv Wrong Verification
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
  // });

  it("Amazon Flow", () => {
    
    cy.server();

    cy.fixture("kb_spec/home").as('home');
    cy.fixture("kb_spec/me").as('me');
    cy.fixture("kb_spec/me?").as('me_')

  
    // cy.route(
    //   '**/v1/home**',
    //   '@home'
    // ).as('h');

    cy.route(
      '**/v1/me**',
      '@me'
    ).as('m'); 
   
    
    cy.visit(
      "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/newhome",
      { failOnStatusCode: false }
    );

    // cy.wait('@h').then((response)=>{
    //   cy.log(response.body)
    //   expect(response.status).to.equal(200);
    //   expect(response.response.body.model.me).to.have.property('pdInProfile').to.equal('disable')

    // })

    //wait to load
    cy.wait(2000);

    //  click Continue Application
    cy
      .get(".skins__FixedFooterBtnCon-bqFnzp > .BBtn__BBtn-jiCKdh")
      .should(
        "have.text", 
        "Continue Application "
      )
      .click({ force: true })
      .wait(2000);

    //url assertion
    cy.url().should(
      "include",
      "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/summary"
    );

    // //click on additional info
    // cy.get("[data-id=additionalinfo]")
    //   .should(
    //     "have.text", 
    //     "Additional InformationA few more details about you"
    //   )
    //   .click()
    //   .wait(2000);

    // // url assertion
    // cy
    //   .url()
    //   .should(
    //     "include",
    //     "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/additionalinfo"
    //   );

    // //click on E-comm
    // cy
    //   .get("#app > div > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__SummaryCon-eWQpKA.gXiRNK > div:nth-child(5) > div > table > tbody > tr")
    //   .should(
    //     "have.text",
    //     "E-commerce ConnectProvide your shopping account details"
    //   )
    //   .click()
    //   .wait(2000);

    // //url assert on ecomm
    // cy
    //   .url()
    //   .should(
    //     "contains",
    //     "/extradetails/ecommoffers"
    //   );

    // // select amazon
    // cy
    //   .get("#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledOptions-flVgwh.jxcLYf.skins__PDSelFixed-ebFJqK.evbfZN > div:nth-child(1) > div > table > tbody")
    //   .should(
    //     "have.text",
    //     "Use Amazon Account"
    //   )
    //   .click()
    //   .wait(2000);

    // // click continue
    // cy
    //   .get(".BBtn__BBtn-jiCKdh")
    //   .should(
    //     "have.text", 
    //     "Continue"
    //   )
    //   .click()
    //   .wait(2000);

    // //url assert on amazon page
    // cy
    //   .url()
    //   .should(
    //     "contains", 
    //     "/extradetails/amazonscrapping/info"
    //   );

    // // click continue
    // cy
    //   .get(".skins__ContinueBtn-dUollj")
    //   .should(
    //     "have.text", 
    //     " Continue "
    //   )
    //   .click()
    //   .wait(2000);

    // // Input Mobile no.
    // cy
    //   .get(":nth-child(1) > table > tbody > tr > .BInput__ErrCon-bianUW > .BInput__InInp-hvYxkk")
    //   .should(
    //     "have.attr", 
    //     "placeholder", 
    //     "Email ID/ Mobile number"
    //   )
    //   .type(Cypress.env("mob"));

    // // input password
    // cy
    // .get("#app > div > div > div > div.BPage__BodyCon-hjhObv.cFgZAX > div > form > div:nth-child(2) > table > tbody > tr > td.BInput__ErrCon-bianUW.kURtGg > input")
    //   .should(
    //     "have.attr", 
    //     "placeholder", 
    //     "Amazon  account password"
    //   )
    //   .type(Cypress.env("mob"));

    // // click on submit
    // cy
    // .get(
    //   "#app > div > div > div > div.BPage__BodyCon-hjhObv.cFgZAX > div > form > button")
    //   .should(
    //     "have.text", 
    //     "Submit"
    //   );







    //   .click()
    //   .wait(2000);

    // cy.get('#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > button')
    // .should("have.text", "Continue")
    // .click()
    // .wait(2000);

    // cy.fixture("kb_amazon_verify").as("amz_process");
    // cy.route(
    //   "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile/amazonscraping",
    //   "@amz_process"
    // );

    // cy.fixture("kb_amazon_resp_verified").as("amz_verified");
    // cy.route(
    //   "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile/amazonscraping",
    //   "@amz_verified"
    // );

    // cy.get(
    //   "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledBottomBtn-lfIsBx.ghKReN > button"
    // ).click();

    // cy.fixture("kb_amazon_verify").as("amz_done");
    // cy.route(
    //   "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile",
    //   "@amz_done"
    // );

    // cy.wait(5000).reload();

    // cy.visit("http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/additionalinfo");

    // cy.get(
    //   "#app > div > div > div > div.BPage__HeaderCon-kVnWyQ.gWQTvQ > img"
    // ).click();
  });
});
