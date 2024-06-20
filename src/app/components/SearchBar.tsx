import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { useSearchContext } from "../../context/SearchContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useSearchContext();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const triggerSearch = () => {
    if (localSearchTerm.trim() !== "") {
      setSearchTerm(localSearchTerm);
      router.push(`home?page=1&search=${localSearchTerm}`);
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
          color="brand.blue.900"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") triggerSearch();
          }}
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
