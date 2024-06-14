"use client";
import { Box, Center, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};

export const LoadingSpinner = () => (
  <Center height="100vh" backgroundColor="#001640">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    >
      <Image
        src="/images/pokemon-ball.png"
        alt="Loading Spinner"
        boxSize={{ base: "60px", md: "100px" }}
      />
    </motion.div>
  </Center>
);
