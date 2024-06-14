import Image from "next/image";
import styles from "./page.module.css";
import { getClient } from "../lib/apollo-client";
import { gql } from "@apollo/client";
import Card from "../components/Card";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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
export default async function Home() {
  const client = getClient();
  const { data } = await client.query({
    query: GET_POKEMONS,
    variables: { limit: 2, offset: 1 },
  });
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {/* {data.cards.map((card) => (
          <div key={card.id}>
            <img src={card.image} alt={card.name} />
            <h3>{card.name}</h3>
          </div>
        ))} */}
        {/* <LoadingSpinner /> */}
        <Card />
      </div>
    </main>
  );
}
