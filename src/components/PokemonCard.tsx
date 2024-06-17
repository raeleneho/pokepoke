import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { GetPokemonsQuery } from "../generated/graphql";

interface PokemonCardProps {
  pokemon: GetPokemonsQuery["pokemon_v2_pokemon"][0];
  bgColor: string;
  selected?: string;
  onClick: () => void;
}

const MotionBox = motion(Box);

const bounceAnimation = {
  y: ["-50%", "-55%", "-50%"],
  x: ["-50%"],
  transition: {
    duration: 0.4,
    repeat: 2,
    repeatType: "loop",
  },
};

const PokemonCard = ({
  pokemon,
  bgColor,
  onClick,
  selected,
}: PokemonCardProps) => {
  const firstLetter = pokemon.name.charAt(0).toUpperCase();
  const remainingName = pokemon.name.slice(1);

  const artworkUrl =
    pokemon.pokemon_v2_pokemonsprites[0]?.sprites.other["official-artwork"]
      .front_default;

  return (
    <MotionBox
      data-testid="pokemon-card"
      width="240px"
      bg={bgColor}
      p={4}
      rounded="sm"
      whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <MotionBox
        position="relative"
        top="200px"
        left="50%"
        transform="translate(-50%, -40%)"
        zIndex="1"
        animate={selected === artworkUrl ? bounceAnimation : {}}
      >
        {artworkUrl && (
          <Image src={artworkUrl} alt={pokemon.name} width={180} height={180} />
        )}
      </MotionBox>
      <Box textAlign="center" mt={2} position="relative" zIndex={0}>
        <Text
          fontSize="180px"
          fontWeight={900}
          color="rgba(255, 255, 255, 0.6)"
        >
          {firstLetter}
        </Text>
      </Box>
      <Text
        as="h3"
        align="center"
        fontWeight={600}
        fontSize="xl"
        letterSpacing="0.03em"
      >
        {firstLetter}
        {remainingName}
      </Text>
    </MotionBox>
  );
};

export default PokemonCard;
