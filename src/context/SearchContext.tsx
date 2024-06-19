import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";

const ITEMS_PER_PAGE = 14;

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  offset: number;
  sortOrder: "asc" | "desc" | undefined;
  itemsPerPage: number;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }
  return context;
};

interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const sortOrder = (searchParams.get("sortOrder") ?? undefined) as
    | "asc"
    | "desc";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const offset = (page - 1) * ITEMS_PER_PAGE;

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        page,
        sortOrder,
        offset,
        itemsPerPage: ITEMS_PER_PAGE,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
