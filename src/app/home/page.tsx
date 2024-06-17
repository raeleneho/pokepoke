"use client";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Flex,
  useTheme,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

import PokemonDetailsModal from "@/components/PokemonDetailsModal";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import PokemonCard from "@/components/PokemonCard";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/NavBar";
import { useSearchContext } from "@/components/SearchContext";

import {
  GetPokemonDetailsDocument,
  GetPokemonDetailsQuery,
  GetPokemonsDocument,
  GetPokemonsQuery,
} from "../../generated/graphql";

const ITEMS_PER_PAGE = 14;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const theme = useTheme();
  const colors = Object.keys(theme.colors.brand.secondary);
  const { searchTerm, setSearchTerm } = useSearchContext();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery, setSearchTerm]);

  const {
    loading: paginatedLoading,
    error: paginatedError,
    data: paginatedData,
  } = useQuery<GetPokemonsQuery>(GetPokemonsDocument, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset,
      searchTerm: searchQuery,
    },
  });

  const [clickedImage, setClickedImage] = useState("");
  const [selectedBgColor, setSelectedBgColor] = useState<string>("");

  const filteredData = useMemo(() => {
    return paginatedData?.pokemon_v2_pokemon ?? [];
  }, [paginatedData]);

  const [
    getPokemonDetails,
    {
      data: pokemonDetailsData,
      loading: pokemonDetailsLoading,
      error: pokemonDetailsError,
    },
  ] = useLazyQuery<GetPokemonDetailsQuery>(GetPokemonDetailsDocument);

  const {
    isOpen: isProfileModalOpen,
    onOpen: onProfileModalOpen,
    onClose: onProfileModalClose,
  } = useDisclosure();

  const navigatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    const queryString = searchQuery
      ? `?page=${newPage}&search=${searchQuery}`
      : `?page=${newPage}`;
    router.push(`home${queryString}`);
  };

  useEffect(() => {
    if (searchQuery) {
      router.replace(`home?page=${page}&search=${searchQuery}`);
    } else {
      router.replace(`home?page=${page}`);
    }
  }, [page, searchQuery, router]);

  const totalPages = Math.ceil(
    (paginatedData?.pokemon_v2_pokemon_aggregate?.aggregate?.count || 0) /
      ITEMS_PER_PAGE
  );
  if (paginatedLoading) return <SplashScreen />;
  if (paginatedError) return <p>Error: {paginatedError?.message}</p>;

  return (
    <Box position="relative" height="100vh" padding={8}>
      <Navbar displaySearch />
      <main>
        <Flex flexWrap="wrap" justifyContent="center" py={8}>
          {filteredData.map((pokemon, index) => {
            const bgColor =
              theme.colors.brand.secondary[colors[index % colors.length]];
            const spriteUrl =
              pokemon.pokemon_v2_pokemonsprites[0].sprites.other[
                "official-artwork"
              ].front_default;

            const selectCard = () => {
              setClickedImage(spriteUrl);
              setSelectedBgColor(bgColor);
              getPokemonDetails({ variables: { name: pokemon.name } });
              onProfileModalOpen();
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
            isDisabled={page === 1}
          />
          <Box>
            {page} of {totalPages}
          </Box>
          <IconButton
            icon={<RiArrowRightSLine />}
            aria-label="Next Page"
            onClick={() => navigatePage(page + 1)}
            isDisabled={page >= totalPages}
          />
        </Flex>
      </main>
      <PokemonDetailsModal
        isOpen={isProfileModalOpen}
        bgColor={selectedBgColor}
        onClose={onProfileModalClose}
        pokemonImage={clickedImage}
        detailsLoading={pokemonDetailsLoading}
        pokemonDetails={pokemonDetailsData?.pokemon_v2_pokemon[0] || null}
      />
    </Box>
  );
}
