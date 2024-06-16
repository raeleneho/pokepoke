"use client";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Avatar,
  useTheme,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { IoPersonCircle } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { GET_POKEMONS, GET_POKEMON_DETAILS } from "./queries";
import { PokemonData } from "../../types/pokemon";
import PokemonDetailsModal from "@/components/PokemonDetailsModal";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { SplashScreen } from "@/components/SplashScreen";
import { PokemonCard } from "@/components/PokemonCard";

const ITEMS_PER_PAGE = 14;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const theme = useTheme();
  const colors = Object.keys(theme.colors.brand.secondary);

  const { loading, error, data } = useQuery<{ pokemons: PokemonData }>(
    GET_POKEMONS,
    {
      variables: { limit: ITEMS_PER_PAGE, offset },
    }
  );

  const [username, setUsername] = useState("");
  const [clickedImage, setClickedImage] = useState("");
  const [selectedBgColor, setSelectedBgColor] = useState<string>("");
  const [
    getPokemonDetails,
    {
      data: pokemonDetailsData,
      loading: pokemonDetailsLoading,
      error: pokemonDetailsError,
    },
  ] = useLazyQuery(GET_POKEMON_DETAILS);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const formData = JSON.parse(storedData);
      const username = formData.username;
      setUsername(username);
    } else {
      console.log("No username found in localStorage");
    }
  }, []);

  const navigatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    router.push(`home?page=${newPage}`);
  };

  const totalPages = Math.ceil((data?.pokemons?.count || 0) / ITEMS_PER_PAGE);

  if (loading) return <SplashScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box position="relative" height="100vh" padding={8}>
      <Flex justify="space-between" align="center">
        <Flex justify="flex-start" align="flex-end" gap={4}>
          <Heading
            as="h1"
            fontWeight={900}
            color="brand.blue.900"
            fontStyle="italic"
            fontSize={{ md: "2xl" }}
          >
            POKÉSAURUS
          </Heading>
          <Text
            fontWeight={440}
            color="brand.blue.500"
            letterSpacing="0.02em"
            display={{ base: "none", md: "block" }}
          >
            Your ultimate Pokémon pocketbook.
          </Text>
        </Flex>
        {username && (
          <>
            <Box
              display={{ base: "inline-flex", md: "none" }}
              alignItems="center"
            >
              <Avatar
                bgColor="brand.yellow"
                color="brand.blue.900"
                name={username}
                onClick={() => router.push("/profile")}
                aria-label={`Profile of ${username}`}
              />
            </Box>

            <Button
              leftIcon={<IoPersonCircle size="24px" />}
              bgColor="brand.secondary.yellow"
              rounded="full"
              onClick={() => router.push("/profile")}
              display={{ base: "none", md: "inline-flex" }}
              aria-label={`Profile of ${username}`}
            >
              <Text color="brand.blue.500">Hello, {username}</Text>
            </Button>
          </>
        )}
      </Flex>
      <main>
        <Flex flexWrap="wrap" justifyContent="center" py={8}>
          {data?.pokemons.results.map((pokemon, index) => {
            const bgColor =
              theme.colors.brand.secondary[colors[index % colors.length]];

            const selectCard = () => {
              setClickedImage(pokemon.artwork);
              setSelectedBgColor(bgColor);
              getPokemonDetails({ variables: { name: pokemon.name } });
              onOpen();
            };

            return (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                bgColor={bgColor}
                onClick={selectCard}
                selected={clickedImage}
              />
            );
          })}
        </Flex>
        <Flex justifyContent="center" align="center" mt="4" gap={4}>
          <IconButton
            icon={<RiArrowLeftSLine />}
            aria-label="Previous Page"
            onClick={() => navigatePage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </IconButton>
          <Box>
            {page} of {totalPages}
          </Box>
          <IconButton
            icon={<RiArrowRightSLine />}
            aria-label="Next Page"
            onClick={() => navigatePage(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </IconButton>
        </Flex>
      </main>
      <PokemonDetailsModal
        isOpen={isOpen}
        bgColor={selectedBgColor}
        onClose={onClose}
        pokemonImage={clickedImage}
        detailsLoading={pokemonDetailsLoading}
        pokemonDetails={pokemonDetailsData?.pokemon}
      />
    </Box>
  );
}
