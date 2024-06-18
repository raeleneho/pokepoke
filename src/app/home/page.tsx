"use client";

import { useState, useMemo, useEffect } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";

import PokemonDetailsModal from "../components/PokemonDetailsModal";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import PokemonCard from "../components/PokemonCard";
import SplashScreen from "../components/SplashScreen";
import Navbar from "../components/NavBar";
import { useAppContext } from "../../context/AppContext";

import { GetPokemonsDocument, GetPokemonsQuery } from "../../generated/graphql";
import { useQuery } from "@apollo/client";

import { FiChevronDown } from "react-icons/fi";
import { BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";

const ITEMS_PER_PAGE = 14;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const sortOrder = searchParams.get("sortOrder");
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const { searchTerm } = useAppContext();
  const theme = useTheme();
  const colors = Object.keys(theme.colors.brand.secondary);

  useEffect(() => {
    const query = `home?page=${page}&search=${searchTerm}&sortOrder=${
      sortOrder || "asc"
    }`;
    router.push(query);
  }, [searchTerm, sortOrder, page, router]);

  const {
    loading: paginatedLoading,
    error: paginatedError,
    data: paginatedData,
  } = useQuery<GetPokemonsQuery>(GetPokemonsDocument, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset,
      searchTerm: searchTerm || null,
      order: sortOrder || "asc",
    },
  });

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

  const handleSort = (order: "asc" | "desc") => {
    router.push(`home?page=${page}&search=${searchTerm}&sortOrder=${order}`);
  };

  const navigatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    const queryString = `home?page=${newPage}&search=${searchTerm}&sortOrder=${sortOrder}`;
    router.push(queryString);
  };

  const filteredData = useMemo(() => {
    return paginatedData?.pokemon_v2_pokemon ?? [];
  }, [paginatedData]);

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
        <Flex justifyContent="flex-end" mb={4}>
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
        <Flex flexWrap="wrap" justifyContent="center" py={8}>
          {paginatedLoading && <SplashScreen />}
          {!paginatedLoading &&
            filteredData.map((pokemon, index) => {
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
        pokemonID={selectedPokemonID}
      />
    </Box>
  );
}
