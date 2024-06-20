import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { IoSearch, IoPersonCircle } from "react-icons/io5";
import SearchBar from "./SearchBar";
import SearchModal from "./SearchModal";
import { useUserContext } from "../../context/UserContext";

interface NavbarProps {
  displaySearch?: boolean;
}

const Navbar = ({ displaySearch }: NavbarProps) => {
  const { userContextData } = useUserContext();
  const router = useRouter();
  const isTablet = useBreakpointValue({ base: true, md: false });
  const {
    isOpen: isSearchModalOpen,
    onOpen: onSearchModalOpen,
    onClose: onSearchModalClose,
  } = useDisclosure();

  return (
    <>
      <Flex justify="space-between" align="center">
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "flex-start", lg: "center" }}
          gap={{ base: 1, lg: 4 }}
        >
          <Text
            as="h1"
            fontWeight={900}
            color="brand.blue.900"
            fontStyle="italic"
            textAlign={{ base: "left" }}
            fontSize={{ md: "2xl" }}
            cursor="pointer"
            onClick={() => router.push("/home")}
          >
            POKÉSAURUS
          </Text>
          <Text
            fontWeight={440}
            fontSize={{ base: "12px", lg: "16px" }}
            lineHeight={{ base: "1.2", lg: "1.5" }}
            textAlign={{ base: "right", md: "left" }}
            color="brand.blue.500"
            letterSpacing="0.02em"
          >
            Your ultimate Pokémon pocketbook.
          </Text>
        </Flex>
        {isTablet ? (
          <Flex align="center" gap={2}>
            {displaySearch && (
              <IconButton
                isRound
                icon={<IoSearch />}
                fontSize="20px"
                aria-label="Search Pokémon"
                bgColor="brand.blue.900"
                color="white"
                onClick={onSearchModalOpen}
              />
            )}
            <Box alignItems="center">
              <IconButton
                isRound
                icon={<IoPersonCircle />}
                fontSize="26px"
                bgColor="brand.yellow"
                color="brand.blue.900"
                onClick={() => router.push("/profile")}
                aria-label={`Profile of ${userContextData.username}`}
              />
            </Box>
          </Flex>
        ) : (
          <Flex align="center" gap={2}>
            {displaySearch && <SearchBar />}
            <Button
              leftIcon={<IoPersonCircle size="24px" />}
              bgColor="brand.secondary.yellow"
              rounded="full"
              onClick={() => router.push("/profile")}
              aria-label={`Profile of ${userContextData.username}`}
            >
              <Text color="brand.blue.500">
                Hello, {userContextData.username}
              </Text>
            </Button>
          </Flex>
        )}
      </Flex>
      <SearchModal isOpen={isSearchModalOpen} onClose={onSearchModalClose} />
    </>
  );
};

export default Navbar;
