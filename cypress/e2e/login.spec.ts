describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("displays validation errors when trying to submit an empty form", () => {
    // Focus and blur each input to trigger validation
    cy.get('input[placeholder="Username"]').focus().blur();
    cy.get('input[placeholder="Job Title"]').focus().blur();

    // Check validation errors
    cy.contains("This is required").should("be.visible");
    cy.contains("Job title is required").should("be.visible");
  });

  it("displays validation errors when input values are too short", () => {
    cy.get('input[placeholder="Username"]').type("abc").blur();
    cy.get('input[placeholder="Job Title"]').type("dev").blur();

    // Ensure the button is still disabled
    cy.get('button[type="submit"]').should("be.disabled");

    // Check validation errors
    cy.contains("Minimum length should be 4").should("be.visible");
    cy.contains("Minimum length should be 4").should("be.visible");
  });

  it("logs in successfully with valid credentials", () => {
    cy.get('input[placeholder="Username"]').type("testuser");
    cy.get('input[placeholder="Job Title"]').type("Developer");
    cy.get('button[type="submit"]').click();

    // Verify successful login
    cy.url().should("include", "/home");
  });
});
