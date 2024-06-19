import { mocks } from "src/_mocks_/graphql/pokemonsMock";

describe("Home Page", () => {
  const GRAPHQL_ENDPOINT = "https://beta.pokeapi.co/graphql/v1beta";

  beforeEach(() => {
    //Login before each test
    cy.visit("/login");

    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="jobTitle"]').type("testjob");
    cy.get('button[type="submit"]').click();

    cy.wait(500);
    cy.url().should("include", "/home");
    cy.intercept("POST", GRAPHQL_ENDPOINT, (req) => {
      if (req.body.operationName === "GetPokemons") {
        const { searchTerm, order } = req.body.variables;

        if (searchTerm === "bulbasaur" && order === "asc") {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                pokemon_v2_pokemon: [
                  {
                    id: 1,
                    name: "bulbasaur",
                    pokemon_v2_pokemonsprites: [
                      {
                        sprites:
                          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
                      },
                    ],
                  },
                ],
                pokemon_v2_pokemon_aggregate: {
                  aggregate: {
                    count: 1,
                  },
                },
              },
            },
          });
        } else if (searchTerm === "" && order === "asc") {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                pokemon_v2_pokemon: [
                  {
                    id: 1,
                    name: "bulbasaur",
                    pokemon_v2_pokemonsprites: [
                      {
                        sprites:
                          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
                      },
                    ],
                  },
                  {
                    id: 2,
                    name: "ivysaur",
                    pokemon_v2_pokemonsprites: [
                      {
                        sprites:
                          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
                      },
                    ],
                  },
                ],
                pokemon_v2_pokemon_aggregate: {
                  aggregate: {
                    count: 2,
                  },
                },
              },
            },
          });
        }
      }

      if (req.body.operationName === "GetPokemonDetails") {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              pokemon_v2_pokemon: [
                {
                  id: 1,
                  name: "bulbasaur",
                  base_experience: 64,
                  height: 7,
                  weight: 69,
                  order: 1,
                  pokemon_v2_pokemonsprites: [
                    {
                      sprites:
                        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
                    },
                  ],
                  pokemon_v2_pokemonstats: [
                    {
                      base_stat: 45,
                      effort: 0,
                      pokemon_v2_stat: {
                        name: "hp",
                      },
                    },
                  ],
                  pokemon_v2_pokemontypes: [
                    {
                      pokemon_v2_type: {
                        name: "grass",
                      },
                    },
                    {
                      pokemon_v2_type: {
                        name: "poison",
                      },
                    },
                  ],
                  pokemon_v2_pokemonabilities: [
                    {
                      pokemon_v2_ability: {
                        name: "overgrow",
                      },
                    },
                    {
                      pokemon_v2_ability: {
                        name: "chlorophyll",
                      },
                    },
                  ],
                },
              ],
            },
          },
        });
      }
    });
  });

  it("renders a list of Pokémon", () => {
    cy.visit("/home");
    cy.contains("Bulbasaur").should("be.visible");
    cy.contains("Ivysaur").should("be.visible");
  });

  it("renders Pokémon details in a modal", () => {
    cy.visit("/home");
    cy.contains("Bulbasaur").click();
    cy.contains("hp").should("be.visible");
    cy.contains("grass").should("be.visible");
    cy.contains("poison").should("be.visible");
    cy.contains("overgrow, chlorophyll").should("be.visible");
  });

  it("renders search results correctly", () => {
    cy.visit("/home");
    cy.get('input[data-testid="search-input"]').type("bulbasaur");
    cy.get("button").contains("search").click();

    //Verify the search results
    cy.get('[data-testid="pokemon-card"]').should("have.length", 1);
    cy.contains("Ivysaur").should("not.exist");
  });

  it("renders sorted Pokémon list correctly", () => {
    cy.visit("/home");

    cy.get("button").contains("Sort by").parent().click();
    cy.get("button").contains("Alphabetical Asc.").parent().click();
    cy.wait(500);

    //Verify the search results
    cy.get('[data-testid="pokemon-card"]').first().contains("Bulbasaur");
    cy.get('[data-testid="pokemon-card"]').last().contains("Ivysaur");
  });

  it('displays a "No Pokémon found" message when search term does not match any Pokémon', () => {
    cy.get('input[data-testid="search-input"]').type("nonexistentpokemon");
    cy.get("button").contains("search").click();
    cy.contains(
      "Sorry, we can't find the Pokémon you are looking for. :("
    ).should("be.visible");
  });
});
