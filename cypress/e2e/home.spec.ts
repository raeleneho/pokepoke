import { mount } from "cypress/react";
import { mocks } from "src/_mocks_/graphql";
import { MockedProvider } from "@apollo/client/testing";

describe("Homepage", () => {
  it("displays loading state initially", () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    cy.get('[data-testid="loading-spinner"]').should("exist");
  });

  it("displays the pokemon cards", () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    cy.get('[data-testid="pokemon-card"]').should("have.length", 1);
  });

  it("displays a message when no pokemon found", () => {
    const emptyMocks = [
      {
        request: {
          query: GET_POKEMONS,
          variables: {
            limit: 14,
            offset: 0,
            searchTerm: "unknown",
            order: "asc",
          },
        },
        result: {
          data: {
            pokemon_v2_pokemon: [],
            pokemon_v2_pokemon_aggregate: {
              aggregate: {
                count: 0,
              },
            },
          },
        },
      },
    ];

    mount(
      <MockedProvider mocks={emptyMocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    cy.get('[data-testid="no-pokemon-message"]').should(
      "contain.text",
      "Sorry, we couldn't find any Pokémon matching your search."
    );
  });
});
