describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/home");
  });

  it("should navigate to the next and previous pages", () => {
    cy.get('[aria-label="Next Page"]').click();
    cy.get('[aria-label="Previous Page"]').click();
  });

  it("should open the Pokemon details modal when a card is clicked", () => {
    cy.get('[data-testid="pokemon-card"]').first().click();
    cy.wait(1000);
    cy.get('[data-testid="pokemon-details-modal"]').should("be.visible");
  });
});

describe("Search Functionality", () => {
  beforeEach(() => {
    cy.visit("/home");
  });

  it("should update search term and display results", () => {
    const searchTerm = "Pikachu"; // Example search term

    // Enter the search term in the input field and press Enter
    cy.get('[data-testid="search-input"]').type(`${searchTerm}{enter}`);

    // Check if the search results are displayed by searching for the Pokemon card title
    cy.contains(searchTerm).should("exist");
  });
});
