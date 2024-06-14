"use client";
import { useSuspenseQuery, gql } from "@apollo/client";

const GET_POKEMONS = gql`
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
      }
    }
  }
`;

const gqlVariables = {
  limit: 2,
  offset: 1,
};

export default function Card() {
  const { error, data } = useSuspenseQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  if (error) return `Error! ${error.message}`;

  console.log("Response from server", data);
  return "Success!";
}
