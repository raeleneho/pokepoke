import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons(
    $limit: Int
    $offset: Int
    $searchTerm: String
    $order: order_by
  ) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: { name: { _iregex: $searchTerm } }
      order_by: { name: $order }
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
    }
    pokemon_v2_pokemon_aggregate(where: { name: { _iregex: $searchTerm } }) {
      aggregate {
        count
      }
    }
  }
`;
export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      name
      base_experience
      height
      weight
      order
      pokemon_v2_pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      pokemon_v2_pokemonstats {
        base_stat
        effort
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
    }
  }
`;
