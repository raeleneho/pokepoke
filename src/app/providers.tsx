"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ApolloWrapper } from "../lib/apollo-wrapper";

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-monserrat)",
    body: "var(--font-monserrat)",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ApolloWrapper>
  );
}
