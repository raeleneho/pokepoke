import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
import SearchBar from "./SearchBar";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="50vw"
      motionPreset="slideInTop"
    >
      <ModalContent mt={0} py={4}>
        <ModalHeader>Search Pokémon</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchBar />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
