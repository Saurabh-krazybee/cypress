describe("Amazon Scrapping", () => {
  // ////--------------Login flow-------------------------
  //     it("Login", () => {
  //     //visiting app
  //     cy.visit(
  //       "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/login",
  //       { failOnStatusCode: false }
  //     );

  //     //wait to load
  //     cy.wait(2000);

  //     // get login with mobile button
  //     cy.get(
  //       "#app > div > div > div > div > div:nth-child(3) > div.skins__LoginBtnCon-fIoCIg.bfKfLI > div > div > div:nth-child(3) > div > a > a"
  //     )
  //       .children("span")
  //       .should("have.text", "Login with Registered Mobile")
  //       .click();

  //     //url assertion
  //     cy.url().should("contains", "/loginwithmob/mobileform");

  //     //get input for mobile number
  //     cy.get("input")
  //       .should("have.class", "BInput__InInp-hvYxkk ddfrol")
  //       .should("have.attr", "placeholder", "Enter your registered mobile number")
  //       .type(Cypress.env("mob"));

  //     //click on Get OTP
  //     cy.get(
  //       "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > form > div.skins__OtpCon-gQOXOO.eVXRnx > button"
  //     ).click();

  //     //waiting for otp
  //     cy.wait(20000);

  //     //click submit
  //     cy
  //       .contains("Submit")
  //       // .should('have.class','BBtn__BBtn-jiCKdh dBKBDe')
  //       // .get('.BBtn__BBtn-jiCKdh')
  //       // .should('have.text','Submit')
  //       .click();
  //     });

  //--------------------------Amazon Flow ----------------------

  it("Amazon Correct Flow", () => {
    cy.visit(
      "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/newhome",
      { failOnStatusCode: false }
    );

    //wait to load
    cy.wait(2000);

    // cy.matchImageSnapshot('profile');

    //  click Continue Application
    cy.get(".skins__FixedFooterBtnCon-bqFnzp > .BBtn__BBtn-jiCKdh")
      .should("have.text", "Continue Application ")
      .click({ force: true })
      .wait(2000);

    //url assertion
    cy.url().should(
      "include",
      "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/summary"
    );

    // mocking offers
    cy.fixture("kb_spec/profile").as("profile");
    cy.server();
    cy.route(
      "https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile",
      "@profile"
    ).as("offers");

    // cy.matchImageSnapshot('additional_info')

    //checking additional info button
    const addInfo = cy
      .get("[data-id=additionalinfo]")
      .children()
      .then((arr) => {
        expect(arr.eq(0)).to.have.html(
          '<i class="icic_invitecx skins__ItemIcon-bdQQrv cMlWdK"></i>'
        );
        expect(arr.eq(1)).to.have.text(
          "Additional InformationA few more details about you"
        );
        expect(arr.eq(2)).to.have.html(
          '<i class="icic_right skins__StatusIcon-gTCkuh dvMark"></i>'
        );
      });

    //click on additional info
    cy.get("[data-id=additionalinfo]")
      .should("have.text", "Additional InformationA few more details about you")
      .click()
      .wait(2000);

    // ////-----------------------Assertion on Addition Info Screen---------------

    // url assertion
    cy.url().should(
      "include",
      "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/additionalinfo"
    );

    //check header
    cy.get(".BTypo__TS-ggygQn")
      .children()
      .should("have.text", "Additional Information");

    //check offers from BE

    //This Api returning 403 I don't understand what's the point of it????? whether we mock by ourself? [if logged in then it should refreshable to get current status not giving an error]
    // cy.request({
    //     method: 'GET',
    //     url: 'https://uf2b19n372.execute-api.ap-south-1.amazonaws.com/v1/me/extradetails/profile'
    // });

    //wait for mock offers and check offers no.
    cy.wait("@offers").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.response.body.model.availableOffers).to.have.lengthOf(6);
    });

    //  //check offers in UI
    cy.get(
      "#app > div > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__SummaryCon-eWQpKA.gXiRNK"
    )
      .children()
      .should("have.length", 7);

    cy.get(
      "#app > div > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__SummaryCon-eWQpKA.gXiRNK"
    )
      .children()
      .eq(0)
      .should("have.text", "Verify IncomeProvide Income details");
    cy.get(
      "#app > div > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__SummaryCon-eWQpKA.gXiRNK"
    )
      .children()
      .eq(1)
      .should(
        "have.text",
        "Mobile Number VerificationRe-verify your official mobile number"
      );
    cy.get(
      "#app > div > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__SummaryCon-eWQpKA.gXiRNK"
    )
      .children()
      .eq(2)
      .should(
        "have.text",
        "Advanced Mobile AuthenticationRe-verify your official mobile number"
      );
    cy.get(
      "#app > div > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__SummaryCon-eWQpKA.gXiRNK"
    )
      .children()
      .eq(3)
      .should(
        "have.text",
        "Salary SlipProvide Paytm account credentials to sync your wallet information"
      );
    cy.get(
      "#app > div > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__SummaryCon-eWQpKA.gXiRNK"
    )
      .children()
      .eq(4)
      .should(
        "have.text",
        "E-commerce ConnectProvide your shopping account details"
      );
    cy.get(
      "#app > div > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__SummaryCon-eWQpKA.gXiRNK"
    )
      .children()
      .eq(5)
      .should(
        "have.text",
        "Sync Wallet detailsProvide Paytm account credentials to sync your wallet information"
      );

    //check back button
    cy.get(".BPage__GoBack-efhxbH").click().wait(2000);

    //come back to additional info
    cy.get("[data-id=additionalinfo]")
      .should("have.text", "Additional InformationA few more details about you")
      //   .wait(2000)
      .click()
      .wait(2000);

    // click on E-comm
    cy.get(
      "#app > div > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__SummaryCon-eWQpKA.gXiRNK > div:nth-child(5) > div > table > tbody > tr"
    )
      .should(
        "have.text",
        "E-commerce ConnectProvide your shopping account details"
      )
      .click()
      .wait(2000);

    //url assert on ecomm
    cy.url().should("contains", "/extradetails/ecommoffers");

    ///////-----------------------Assertion on Ecomm Sync page-------------------

    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > p"
    )
      .children()
      .then((arr) => {
        expect(arr.eq(0)).to.have.attr(
          "src",
          "/729f398925bafcf7ac1cccd7a84780ce.svg"
        );
        expect(arr.eq(1)).to.have.text("Sync Shopping Details");
      });

    // select amazon
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledOptions-flVgwh.jxcLYf.skins__PDSelFixed-ebFJqK.evbfZN > div:nth-child(1) > div > table > tbody"
    )
      .should("have.text", "Use Amazon Account")
      .click()
      .wait(2000);

    cy.get('#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledEcommDesc-coWDCn.iwFCCW')
        .then(el=>{
            expect(el).to.be.visible;
        })
        .children()
        .then(res=>{
            expect(res.eq(0)).to.have.text('Use Amazon Account');
            expect(res.eq(1)).to.have.text('Provide your Amazon shopping account login credentials to avail benefits');
        })

    //     // click continue
    //     cy.get(".BBtn__BBtn-jiCKdh")
    //       .should("have.text", "Continue")
    //       .click()
    //       .wait(2000);

    //     //url assert on amazon page
    //     cy.url().should("contains", "/extradetails/amazonscrapping/info");

    //     // click continue
    //     cy.get(".skins__ContinueBtn-dUollj")
    //       .should("have.text", " Continue ")
    //       .click()
    //       .wait(2000);

    //     // Input Mobile no.
    //     cy.get(
    //       ":nth-child(1) > table > tbody > tr > .BInput__ErrCon-bianUW > .BInput__InInp-hvYxkk"
    //     )
    //       .should("have.attr", "placeholder", "Email ID/ Mobile number")
    //       .type(Cypress.env("mob"));

    //     // input password
    //     cy.get(
    //       "#app > div > div > div > div.BPage__BodyCon-hjhObv.cFgZAX > div > form > div:nth-child(2) > table > tbody > tr > td.BInput__ErrCon-bianUW.kURtGg > input"
    //     )
    //       .should("have.attr", "placeholder", "Amazon  account password")
    //       .type(Cypress.env("mob"));

    //     // click on submit
    //     cy.get(
    //       "#app > div > div > div > div.BPage__BodyCon-hjhObv.cFgZAX > div > form > button"
    //     ).should("have.text", "Submit");
  });

  //   ////-----------------Removed Additional Info {PDinProfile=disable}---------------

  // it("Amazon No Additional Info", () => {
  //   cy.server();

  //   cy.fixture("kb_spec/home").as("home");
  //   cy.fixture("kb_spec/me").as("me");
  //   cy.fixture("kb_spec/me?").as("me_");

  //   cy.route("**/v1/home**", "@home").as("mockedHome");

  //   cy.route("**/v1/me**", "@me").as("mockedMe");

  //   cy.visit(
  //     "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/newhome",
  //     { failOnStatusCode: false }
  //   );

  // //   cy.wait("@mockedHome").then((response) => {
  // //     cy.log(response.body);
  // //     expect(response.status).to.equal(200);
  // //     expect(response.response.body.model.me)
  // //       .to.have.property("pdInProfile")
  // //       .to.equal("disable");
  // //   });

  //   //wait to load
  //   cy.wait(2000);

  //   // cy.matchImageSnapshot('profile');

  //   //  click Continue Application
  //   cy.get(".skins__FixedFooterBtnCon-bqFnzp > .BBtn__BBtn-jiCKdh")
  //     .should("have.text", "Continue Application ")
  //     .click({ force: true })
  //     .wait(2000);

  // //   cy.wait("@mockedMe").then((response) => {
  // //     cy.log(response.body);
  // //     expect(response.status).to.equal(200);
  // //     expect(response.response.body.model)
  // //       .to.have.property("pdInProfile")
  // //       .to.equal("disable");
  // //   });

  //   //url assertion
  //   cy.url().should(
  //     "include",
  //     "http://react-app-monica.s3-website-ap-southeast-1.amazonaws.com/profile/summary"
  //   );

  // //   cy.matchImageSnapshot('additional_info')

  // });
});
