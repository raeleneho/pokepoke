import {
  GetPokemonsDocument,
  GetPokemonDetailsDocument,
} from "../../../generated/graphql";
import { MockedResponse } from "@apollo/client/testing";

export const mocks: MockedResponse[] = [
  {
    request: {
      query: GetPokemonsDocument,
      variables: {
        limit: 14,
        offset: 0,
        searchTerm: "",
        order: "asc",
      },
    },
    result: {
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
          // Add more mock Pokémon as needed
        ],
        pokemon_v2_pokemon_aggregate: {
          aggregate: {
            count: 1,
          },
        },
      },
    },
  },
  {
    request: {
      query: GetPokemonDetailsDocument,
      variables: {
        id: 1,
      },
    },
    result: {
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
              // Add more stats as needed
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
  },
];
