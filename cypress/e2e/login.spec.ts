describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display the login form with all elements", () => {
    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="jobTitle"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should fill the form and submit successfully", () => {
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="jobTitle"]').type("developer");
    cy.get('button[type="submit"]').click();

    // Validate redirection to the home page
    cy.url().should("include", "/home");
  });

  it("should display error messages for invalid inputs", () => {
    // Fill the form with invalid data and blur the inputs to trigger validation
    cy.get('input[name="username"]').type("abc").blur();
    cy.get('input[name="jobTitle"]').type("xyz").blur();

    // Check that error messages are displayed
    cy.get('input[name="username"]')
      .parent()
      .within(() => {
        cy.get(".chakra-form__error-message").should(
          "contain",
          "Minimum length should be 4"
        );
      });

    cy.get('input[name="jobTitle"]')
      .parent()
      .within(() => {
        cy.get(".chakra-form__error-message").should(
          "contain",
          "Minimum length should be 4"
        );
      });
  });
});
