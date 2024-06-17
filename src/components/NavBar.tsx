import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoSearch, IoPersonCircle } from "react-icons/io5";
import SearchBar from "./SearchBar";
import SearchModal from "./SearchModal";

interface NavbarProps {
  displaySearch?: boolean;
}

const Navbar = ({ displaySearch }: NavbarProps) => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const isTablet = useBreakpointValue({ base: true, md: false });
  const {
    isOpen: isSearchModalOpen,
    onOpen: onSearchModalOpen,
    onClose: onSearchModalClose,
  } = useDisclosure();

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
  return (
    <>
      <Flex justify="space-between" align="center">
        <Flex justify="flex-start" align="center" gap={4}>
          <LinkBox>
            <LinkOverlay href="/home">
              <Text
                as="h1"
                fontWeight={900}
                color="brand.blue.900"
                fontStyle="italic"
                fontSize={{ md: "2xl" }}
                cursor="pointer"
              >
                POKÉSAURUS
              </Text>
            </LinkOverlay>
          </LinkBox>
          <Text
            fontWeight={440}
            color="brand.blue.500"
            letterSpacing="0.02em"
            display={{ base: "none", md: "block" }}
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
                name={username}
                onClick={() => router.push("/profile")}
                aria-label={`Profile of ${username}`}
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
              aria-label={`Profile of ${username}`}
            >
              <Text color="brand.blue.500">Hello, {username}</Text>
            </Button>
          </Flex>
        )}
      </Flex>
      <SearchModal isOpen={isSearchModalOpen} onClose={onSearchModalClose} />
    </>
  );
};

export default Navbar;
