import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
        artwork
        dreamworld
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($name: String!) {
    pokemon(name: $name) {
      id
      name
      base_experience
      height
      weight
      is_default
      location_area_encounters
      order
      species {
        name
      }
      sprites {
        front_default
        front_female
        front_shiny
        front_shiny_female
      }
      stats {
        base_stat
        effort
        stat {
          name
        }
      }
      types {
        type {
          name
        }
      }
      abilities {
        ability {
          name
        }
      }
      forms {
        name
      }
      moves {
        move {
          name
        }
      }
    }
  }
`;
