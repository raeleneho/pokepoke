import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { useAppContext } from "../../context/AppContext";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useAppContext();

  const triggerSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`home?page=1&search=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      <InputGroup
        display={{ base: "flex" }}
        width={{ base: "100%", md: "300px", lg: "400px", xl: "600px" }}
      >
        <InputLeftElement pointerEvents="none">
          <IoSearch color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          data-testid="search-input"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          rounded="full"
        />
        <InputRightElement width="min-content" mr={1}>
          <Button rounded="full" size="sm" onClick={triggerSearch}>
            search
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default SearchBar;
