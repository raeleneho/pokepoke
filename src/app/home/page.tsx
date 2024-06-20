"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Flex,
  useTheme,
  useDisclosure,
  IconButton,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import PokemonDetailsModal from "../components/PokemonDetailsModal";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import PokemonCard from "../components/PokemonCard";
import Navbar from "../components/NavBar";

import { GetPokemonsDocument, GetPokemonsQuery } from "../../generated/graphql";
import { useQuery } from "@apollo/client";

import { FiChevronDown } from "react-icons/fi";
import { BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";
import { useSearchContext } from "src/context/SearchContext";

export default function Home() {
  const router = useRouter();

  const theme = useTheme();
  const colors = Object.keys(theme.colors.brand.secondary);

  // Fetch data
  const { searchTerm, sortOrder, page, offset, itemsPerPage } =
    useSearchContext();

  const {
    loading: paginatedLoading,
    error: paginatedError,
    data: paginatedData,
  } = useQuery<GetPokemonsQuery>(GetPokemonsDocument, {
    variables: {
      limit: itemsPerPage,
      offset,
      searchTerm: searchTerm || "",
      order: sortOrder || undefined,
    },
  });

  const pokemons = useMemo(() => {
    return paginatedData?.pokemon_v2_pokemon ?? [];
  }, [paginatedData]);

  const handleSort = (order: "asc" | "desc") => {
    router.push(`home?page=${page}&search=${searchTerm}&sortOrder=${order}`);
  };

  // Pagination
  const navigatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    const queryString = `home?page=${newPage}${
      searchTerm ? "&search=" + searchTerm : ""
    }${sortOrder ? "&sortOrder=" + sortOrder : ""}`;
    router.push(queryString);
  };

  const totalPages = Math.ceil(
    (paginatedData?.pokemon_v2_pokemon_aggregate?.aggregate?.count || 0) /
      itemsPerPage
  );

  //Handle modal
  const [clickedImage, setClickedImage] = useState("");
  const [selectedBgColor, setSelectedBgColor] = useState<string>("");
  const [selectedPokemonID, setSelectedPokemonID] = useState<number | null>(
    null
  );
  const {
    isOpen: isProfileModalOpen,
    onOpen: onProfileModalOpen,
    onClose: onProfileModalClose,
  } = useDisclosure();

  if (paginatedError) {
    return <p>Error: {paginatedError.message}</p>;
  }

  return (
    <Box position="relative" height="100vh" padding={8}>
      <Navbar displaySearch />
      <main>
        <Flex justifyContent="flex-start" pt={8}>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FiChevronDown />}
              variant="outline"
            >
              Sort by
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleSort("asc")}>
                <BsSortAlphaUp size="24px" />
                <Text ml={2}>Alphabetical Asc.</Text>
              </MenuItem>
              <MenuItem onClick={() => handleSort("desc")}>
                <BsSortAlphaDown size="24px" />
                <Text ml={2}>Alphabetical Desc.</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex flexWrap="wrap" justifyContent="center" py={6}>
          {paginatedLoading &&
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <Box
                key={index}
                padding="6"
                boxShadow="lg"
                bgColor="gray.100"
                width="240px"
                height="400px"
              />
            ))}
          {!paginatedLoading && pokemons.length === 0 && (
            <Text color="brand.blue.900">
              Sorry, we can&apos;t find the Pokémon you are looking for. :(
            </Text>
          )}
          {pokemons.map((pokemon, index) => {
            const bgColor =
              theme.colors.brand.secondary[colors[index % colors.length]];
            const imageUrl = pokemon.pokemon_v2_pokemonsprites[0].sprites;

            const selectCard = () => {
              setClickedImage(imageUrl);
              setSelectedBgColor(bgColor);
              setSelectedPokemonID(pokemon.id);
              onProfileModalOpen();
            };

            return (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                bgColor={bgColor}
                onClick={selectCard}
                selected={clickedImage}
                loading={paginatedLoading}
              />
            );
          })}
        </Flex>
        <Flex justifyContent="center" align="center" gap={4}>
          <IconButton
            icon={<RiArrowLeftSLine />}
            aria-label="Previous Page"
            onClick={() => navigatePage(page - 1)}
            isDisabled={page === 1}
          />
          <Box>
            {!paginatedLoading && pokemons.length === 0
              ? 0
              : `${page} of ${totalPages}`}
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
        pokemonID={selectedPokemonID}
      />
    </Box>
  );
}
