import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { useSearchContext } from "./SearchContext";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useSearchContext();

  const triggerSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      router.replace(`home?page=1&search=${searchTerm}`);
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
          onKeyDown={triggerSearch}
          rounded="full"
        />
      </InputGroup>
    </>
  );
};

export default SearchBar;
