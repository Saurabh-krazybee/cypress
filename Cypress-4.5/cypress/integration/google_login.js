describe("Login", () => {
  it("Login through Google", () => {
    // Cypress.Cookies.debug(true);
    const username = Cypress.env("googleSocialLoginUsername");
    const password = Cypress.env("googleSocialLoginPassword");
    const loginUrl = Cypress.env("loginUrl");
    const cookieName = Cypress.env("cookieName");
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: true,
      logs: false,
      loginSelector: 'body > div.user-screen.login-page > div.oauth-provider-div > div:nth-child(4) > a',
      postLoginSelector: "#nav-dLabel",
    };

    return cy
      .task("GoogleSocialLogin", socialLoginOptions)
      .then(({ cookies }) => {
        cy.clearCookies();

        const cookie = cookies
          .filter((cookie) => cookie.name === cookieName)
          .pop();
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure,
          });

          Cypress.Cookies.defaults({
            preserve: cookieName,
          });
        }
      });
  });
});
