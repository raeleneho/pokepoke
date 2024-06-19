describe("Profile Page", () => {
  beforeEach(() => {
    // Login before each test
    cy.visit("/login");

    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="jobTitle"]').type("testjob");
    cy.get('button[type="submit"]').click();

    cy.wait(500);
    cy.get("button").contains("Hello").click();
    cy.wait(500);
    cy.url().should("include", "/profile");
  });

  it("should load the profile page and display user information", () => {
    // Verify that the profile page loads correctly
    cy.get("h1").contains("Personal Info").should("be.visible");
    cy.get('input[name="username"]').should("have.value", "testuser");
    cy.get('input[name="jobTitle"]').should("have.value", "testjob");
  });

  it("should update user information", () => {
    cy.get('input[name="username"]').clear().type("newusername");
    cy.get('input[name="jobTitle"]').clear().type("Senior Developer");
    cy.get('button[type="submit"]').click();

    cy.wait(1000);

    // Verify that the changes were saved
    cy.get("button").contains("Changes Saved").should("be.visible");
    cy.get('input[name="username"]').should("have.value", "newusername");
    cy.get('input[name="jobTitle"]').should("have.value", "Senior Developer");
  });

  it("should logout correctly and redirected to login page", () => {
    cy.get("button").contains("Logout").click();

    cy.url().should("include", "/login");
  });
});
