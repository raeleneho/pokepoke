import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { mocks } from "../graphql/pokemonsMock";

const ApolloMockedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};

export default ApolloMockedProvider;
