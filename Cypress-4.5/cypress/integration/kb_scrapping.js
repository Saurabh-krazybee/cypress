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

    // cy.matchImageSnapshot('nocked_offers')

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

    ///////-----------------------Assertion on Ecomm Sync page-------------------

    //url assert on ecomm
    cy.url().should("contains", "/extradetails/ecommoffers");

    //check header
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

    //checking help buuton
    cy.get(
      "#app > div > div > div > div.BPage__HeaderCon-kVnWyQ.gWQTvQ > div.BPage__RightCon-jDUJPr.ehtAlS"
    )
      .children()
      .should("have.attr", "href", "/store/support")
      .click({ force: true })
      .wait(2000);

    // cy.matchImageSnapshot('help_page')

    //check support page
    cy.url().should("contains", "contactus/home");

    //go back
    cy.get(
      "#app > div > div > div > div > div > div.BPage__HeaderCon-kVnWyQ.hklIgC > img"
    )
      .click()
      .wait(2000);

    //check continue disabled
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledOptions-flVgwh.jxcLYf.skins__PDSelFixed-ebFJqK.evbfZN > button"
    ).should("be.disabled");

    // check options
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledOptions-flVgwh.jxcLYf.skins__PDSelFixed-ebFJqK.evbfZN"
    )
      .children()
      .then((res) => {
        expect(res.eq(0)).to.have.text("Use Amazon Account");
        expect(res.eq(1)).to.have.text("Use Flipkart Account");
      });

    //Check Amazon button UI
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledOptions-flVgwh.jxcLYf.skins__PDSelFixed-ebFJqK.evbfZN > div:nth-child(1) > div > table > tbody > tr"
    );

    //select amazon
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledOptions-flVgwh.jxcLYf.skins__PDSelFixed-ebFJqK.evbfZN > div:nth-child(1) > div > table > tbody"
    )
      .should("have.text", "Use Amazon Account")
      .click()
      .wait(2000);

    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledEcommDesc-coWDCn.iwFCCW"
    )
      .then((el) => {
        expect(el).to.be.visible;
      })
      .children()
      .then((res) => {
        expect(res.eq(0)).to.have.text("Use Amazon Account");
        expect(res.eq(1)).to.have.text(
          "Provide your Amazon shopping account login credentials to avail benefits"
        );
      });

    //check continue enabled
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledOptions-flVgwh.jxcLYf.skins__PDSelFixed-ebFJqK.evbfZN > button"
    ).should("not.be.disabled");

    //url assert on ecomm
    cy.url().should("contains", "/extradetails/ecommoffers");

    // click continue
    cy.get(".BBtn__BBtn-jiCKdh")
      .should("have.text", "Continue")
      .click()
      .wait(2000);

    //cy.matchImageSnapshot('ecomm_page')

    //////----------------------Amazon Page assertions------------------------------

    //url assert on amazon page
    cy.url().should("contains", "/extradetails/amazonscrapping/info");

    //header
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__StyledHeader-bARYhf.JRMTC > table > tbody > tr"
    )
      .children()
      .then((resp) => {
        expect(resp.eq(0).children())
          .to.have.attr("src")
          .to.be.equal(
            "https://ik.imagekit.io/krazybee/pd/ic-ecom-connect_aZhsx0A1xF.svg"
          );
        expect(resp.eq(1)).to.have.text(" Amazon Sync ");
      });

    //Steps strings check
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__StyledMiddleSection-fQnHBy.ksnYpt > div"
    )
      .children()
      .then((resp) => {
        expect(resp.eq(0))
          .to.have.attr("class")
          .to.be.equal("skins__StyledSteps-kKtHyM iTkqfP");
        expect(resp.eq(0).children()).to.have.text("STEPS");
        expect(resp.eq(1).children())
          .to.have.attr("class")
          .to.be.equal("BBulletList__Table-jgUyz bjApIL");
      });

    //// strings below STEPS
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__StyledMiddleSection-fQnHBy.ksnYpt > div > div:nth-child(2) > table > tbody"
    )
      .children()
      .should("have.length", 3)
      .then((resp) => {
        expect(resp.eq(0)).to.have.text(
          "Enter the username and password of your Amazon Account."
        );
        expect(resp.eq(1)).to.have.text(
          "Enter the login OTP sent by Amazon. You will be asked to enter OTP only if you have enabled OTP based validation for your amazon account."
        );
        expect(resp.eq(2)).to.have.text(
          "Continue only if you have an Amazon account."
        );
      });

    //Box at center
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__StyledExtraInfo-NgOZX.bvXhFZ > div > table > tbody > tr"
    )
      .children()
      .should("have.length", 2)
      .then((resp) => {
        expect(resp.eq(0).children())
          .to.have.attr("src")
          .to.be.equal("/72c2d7389a323eb0aa402b3c6be31d98.svg");
        expect(resp.eq(1)).to.have.text(
          "Credentials are transmitted securely and are not stored anywhere. They are only used to fetch the required information and for no other purposes."
        );
      });

    // footer
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__StyledTnCWrapper-kQzcIn.cORojq > table > tbody > tr"
    )
      .children()
      .should("have.length", 2)
      .then((resp) => {
        expect(resp.eq(0).children())
          .to.have.attr("src")
          .to.be.equal(
            "https://ik.imagekit.io/krazybee/appImages/ic-info_-0dgpgCZ9D.svg"
          );
        expect(resp.eq(1)).to.have.text(
          "By Continuing you agree to KreditBee's Terms and Conditions and Privacy Policy"
        );
      });

    //check 'T&C' and 'Privacy Policy'
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div.skins__StyledTnCWrapper-kQzcIn.cORojq > table > tbody > tr > td:nth-child(2) > p"
    )
      .children()
      .should("have.length", 2)
      .then((resp) => {
        //not disabled
        expect(resp.eq(0).children()).not.to.be.disabled;
        expect(resp.eq(1).children()).not.to.be.disabled;
        //check src
        expect(resp.eq(0).children())
          .to.have.attr("href")
          .to.be.equal("/store/tnc");
        expect(resp.eq(1).children())
          .to.have.attr("href")
          .to.be.equal("/store/privacypolicy");
      });

    // click continue
    cy.get(".skins__ContinueBtn-dUollj")
      .should("have.text", " Continue ")
      .click()
      .wait(2000);

    //check url
    cy.url().should("contains", "/extradetails/amazonscrapping/form");

    //---------------------check amazon form--------------------

    //header
    cy.get(
      "#app > div > div > div > div.BPage__HeaderCon-kVnWyQ.hklIgC > div.BPage__TitleDiv-kyzqwI.jFENtR"
    ).should("have.text", "Amazon Sync");

    //check form elements
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.cFgZAX > div > form"
    )
      .children()
      .should("have.length", 4)
      .then((resp) => {
        expect(resp.eq(0))
          .to.have.attr("class")
          .to.be.equal("BInput__InputBox-cDivfo bTceFM");
        expect(resp.eq(1))
          .to.have.attr("class")
          .to.be.equal("BInput__InputBox-cDivfo bTceFM");
        expect(resp.eq(3)).to.be.disabled;
      });

    //Email/no. input check
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.cFgZAX > div > form > div:nth-child(1) > table > tbody > tr"
    )
      .children()
      .should("have.length", 2)
      .then((resp) => {
        expect(resp.eq(0).children())
          .to.have.attr("icon")
          .to.be.equal("icic_tab_user");
        expect(resp.eq(1).children()).to.have.lengthOf(2);
        expect(resp.eq(1).children().eq(0))
          .to.have.attr("placeholder")
          .to.be.equal("Email ID/ Mobile number");
      });

    //Password Input check
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.cFgZAX > div > form > div:nth-child(2) > table > tbody > tr"
    )
      .children()
      .should("have.length", 2)
      .then((resp) => {
        expect(resp.eq(0).children())
          .to.have.attr("icon")
          .to.be.equal("icic_otp");
        expect(resp.eq(1).children()).to.have.lengthOf(2);
        expect(resp.eq(1).children().eq(0))
          .to.have.attr("placeholder")
          .to.be.equal("Amazon  account password");
      });

    // Input Mobile no.
    cy.get(
      ":nth-child(1) > table > tbody > tr > .BInput__ErrCon-bianUW > .BInput__InInp-hvYxkk"
    )
      // .should("have.attr", "placeholder", "Email ID/ Mobile number")
      .type(Cypress.env("mob"));

    //Submit Disabled still
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.cFgZAX > div > form > button"
    ).should("be.disabled");

    // input password
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.cFgZAX > div > form > div:nth-child(2) > table > tbody > tr > td.BInput__ErrCon-bianUW.kURtGg > input"
    )
      // .should("have.attr", "placeholder", "Amazon  account password")
      .type(Cypress.env("mob"));

    //Submit Enabled now
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.cFgZAX > div > form > button"
    ).should("not.be.disabled");

    /////// cy.matchImageSnapshot('amazon');
    /////// cy.matchImageSnapshot('amazon_sp_char_input');

    // click on submit
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.cFgZAX > div > form > button"
    )
      .should("have.text", "Submit")
      .click()
      .wait(2000);

    // // ///////--------------------Verifying Details-------------------

// cy.pause();

    //url
    cy.url().should("contains", "/extradetails/amazonscrapping/status");

    //ui
    cy.get("#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div")
      .children()
      .should("have.length", 4)
      .then((resp) => {
        expect(resp.eq(0))
          .to.have.attr("src")
          .to.be.equal(
            "https://ik.imagekit.io/krazybee/pd/ic_hourglass_B3N17VOESM.svg"
          );
        expect(resp.eq(1)).to.have.text(" Verifying your details ");
        expect(resp.eq(2)).to.have.text(
          " Please wait while we are verifying your provided information. This may take a few minutes. "
        );
        expect(resp.eq(3).children()).to.have.text("Refresh");
      });

    // //// ------------------------Route for otp mock---------------------------

    cy.fixture("kb_spec/amazon_scrap").as("scrap_resp");
    cy.route("**/v1/me/extradetails/profile/amazonscraping", "@scrap_resp").as(
      "scrap"
    );
    //////////-----------------------------------------------------------------------

    //click on refresh
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledBottomBtn-lfIsBx.ghKReN > button"
    )
      .click()
      .wait(2000);

    ///////////cy.matchImageSnapshot('without_otp')

    // //// check disabled
    // cy.get(
    //   "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledBottomBtn-lfIsBx.ghKReN > button"
    // ).should("be.disabled");

    // /////-----------------------OTP testing--------------------------------
    // //// cy.wait('@scrap');
    cy.get("#app > div").should("be.visible");

    cy.get("#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div")
      .children()
      .then((resp) => {
        expect(resp.eq(0)).to.have.text(
          "Enter the OTP received on your mobile"
        );
        expect(resp.eq(2).parent()).to.have.descendants("form");
      });

    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > form > div.BOtpForm__OtpCon-cLcwUl.frFcHy > div > table > tbody > tr"
    )
      .children()
      .should("have.length", 2)
      .then((resp) => {
        expect(resp.eq(0).children())
          .to.have.attr("icon")
          .to.be.equal("icic_otp");
        expect(resp.eq(1)).to.have.descendants("input");
        expect(resp.eq(1).children())
          .to.have.attr("placeholder")
          .to.be.equal("Enter OTP Here");
      });

    //check instructions
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > form > div.informationBox__LabelCon-hwyKsY.jnxzux > table > tbody > tr"
    )
      .children()
      .should("have.length", 2)
      .then((resp) => {
        expect(resp.eq(0)).to.have.descendants("img");
        expect(resp.eq(0).children())
          .to.have.attr("src")
          .to.be.equal("/55e309241e9f6f06bac3ff2df44ee461.svg");
        expect(resp.eq(1)).to.have.text(
          "Ensure that you have access to your Amazon registered mobile number."
        );
      });

    //click on submit without otp
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > form > button"
    ).click();

    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > form > div.BOtpForm__OtpCon-cLcwUl.frFcHy > div > table > tbody > tr > td.BInput__ErrCon-bianUW.kURtGg > p"
    )
      .should("be.visible")
      .should("have.text", "This cannot be empty");

    // ///wait for otp input
    // // cy.wait(10000);

    //type otp
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > form > div.BOtpForm__OtpCon-cLcwUl.frFcHy > div > table > tbody > tr > td.BInput__ErrCon-bianUW.kURtGg > input"
    ).type("123456");

    //click on submit
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > form > button"
    ).click();

    /////cy.matchImageSnapshot('otp_');

    // ///////--------------------Verifying Details-------------------

    //url
    cy.url().should("contains", "/extradetails/amazonscrapping/status");

    //ui
    cy.get("#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div")
      .children()
      .should("have.length", 4)
      .then((resp) => {
        expect(resp.eq(0))
          .to.have.attr("src")
          .to.be.equal(
            "https://ik.imagekit.io/krazybee/pd/ic_hourglass_B3N17VOESM.svg"
          );
        expect(resp.eq(1)).to.have.text(" Verifying your details ");
        expect(resp.eq(2)).to.have.text(
          " Please wait while we are verifying your provided information. This may take a few minutes. "
        );
        expect(resp.eq(3).children()).to.have.text("Refresh");
      });

    cy.fixture("kb_spec/otp_scrap").as("otp");
    cy.route("**/v1/me/extradetails/profile/amazonscraping", "@otp").as(
      "otp_scrap"
    );

    ////// cy.request({
    //////   method: 'GET',
    //////   url: '**/v1/me/extradetails/profile/amazonscraping',
    //////   failOnStatusCode: false
    ////// });

    // //click refresh
    cy.get(
      "#app > div > div > div > div.BPage__BodyCon-hjhObv.giSHwH > div > div.skins__StyledBottomBtn-lfIsBx.ghKReN > button"
    )
      .click()
      .wait(2000);
    ////   .reload();

    ///////////cy.get('#app > div > div > div > div.BPage__HeaderCon-kVnWyQ.gWQTvQ > img').click({ force: true });
  });

  //   ////--------------------------------------------Removed Additional Info {PDinProfile=disable}----------------------------------------------------------

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
