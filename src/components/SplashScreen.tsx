"use client";
import { Center } from "@chakra-ui/react";
import { CustomSpinner } from "./CustomSpinner";

export const SplashScreen = () => (
  <Center
    height="100vh"
    backgroundColor="brand.blue.900"
    position="fixed"
    top="0"
    left="0"
    right="0"
    bottom="0"
    zIndex="9999"
  >
    <CustomSpinner />
  </Center>
);
