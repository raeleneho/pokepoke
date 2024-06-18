"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ApolloWrapper } from "../lib/apollo-wrapper";
import { AppContextProvider } from "../context/AppContext";
import useAuth from "./hooks/useAuth";
import { FormDataProvider } from "../context/FormDataContext";

export const theme = extendTheme({
  colors: {
    brand: {
      yellow: "#FFD55C",
      blue: {
        500: "#1C3A74",
        900: "#001640",
      },
      secondary: {
        yellow: "#FFEAAF",
        blue: "#C6ECED",
        green: "#C8EDCB",
        orange: "#EFD3BB",
        coral: "#EBBCB4",
      },
    },
    fonts: {
      heading: "var(--font-monserrat)",
      body: "var(--font-monserrat)",
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  useAuth();
  return (
    <ApolloWrapper>
      <ChakraProvider theme={theme}>
        <AppContextProvider>
          <FormDataProvider>{children}</FormDataProvider>
        </AppContextProvider>
      </ChakraProvider>
    </ApolloWrapper>
  );
}
