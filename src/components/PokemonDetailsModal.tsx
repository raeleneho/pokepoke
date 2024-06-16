import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Tag,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderTrack,
} from "@chakra-ui/react";
import Image from "next/image";
import { PokemonDetails } from "../types/pokemon";
import { CustomSpinner } from "./CustomSpinner";

interface PokemonDetailsModalProps {
  bgColor: string;
  isOpen: boolean;
  onClose: () => void;
  pokemonDetails: PokemonDetails | null;
  detailsLoading: boolean;
  pokemonImage: string;
  chidren?: React.ReactNode;
}

const PokemonDetailsModal = ({
  bgColor,
  isOpen,
  onClose,
  pokemonDetails,
  pokemonImage,
  detailsLoading,
}: PokemonDetailsModalProps) => {
  console.log("pokemonDetails", pokemonDetails);
  const firstLetter = pokemonDetails?.name.charAt(0).toUpperCase();
  const remainingName = pokemonDetails?.name.slice(1);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent bgColor={bgColor} overflow="hidden" width="360px">
        <ModalCloseButton />
        <ModalBody
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          p={8}
        >
          {detailsLoading ? (
            <CustomSpinner />
          ) : (
            <>
              <Box position="relative" mb={4}>
                <Box
                  position="relative"
                  left="50%"
                  transform="translateX(-50%)"
                  zIndex="1"
                >
                  <Image
                    src={pokemonImage || ""}
                    alt={pokemonDetails?.name}
                    width={100}
                    height={100}
                  />
                </Box>
                <Box
                  textAlign="center"
                  position="relative"
                  transform="translate(-50%, 10%)"
                  zIndex={0}
                  mt={-20}
                >
                  <Text fontSize="80px" fontWeight={900} color="white">
                    {firstLetter}
                  </Text>
                </Box>
              </Box>

              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                w="100%"
              >
                <Text
                  as="h1"
                  align="center"
                  fontWeight={800}
                  fontSize="28px"
                  letterSpacing="0.02em"
                >
                  {firstLetter}
                  {remainingName}
                </Text>
                <Flex mt={2}>
                  {pokemonDetails?.types.map((type) => (
                    <Tag
                      size="md"
                      key={type.type.name}
                      borderRadius="full"
                      variant="outline"
                      bgColor={bgColor}
                      color="brand.blue.900"
                      mr={2}
                    >
                      {type.type.name}
                    </Tag>
                  ))}
                </Flex>
                <Flex
                  my={2}
                  justify="space-between"
                  align="center"
                  w="100%"
                  color="brand.blue.900"
                >
                  <Text fontSize="14px" mr={2}>
                    Abilities:
                  </Text>
                  <Text fontSize="14px">
                    {pokemonDetails?.abilities
                      .map((ability) => ability.ability.name)
                      .join(", ")}
                  </Text>
                </Flex>
                {pokemonDetails?.stats.map((stat) => (
                  <Flex
                    key={stat.stat.name}
                    justify="space-between"
                    align="center"
                    w="100%"
                    mt={2}
                  >
                    <Text
                      fontSize="12px"
                      color="brand.blue.900"
                      key={stat.stat.name}
                    >
                      {stat.stat.name}
                    </Text>
                    <Slider
                      size="lg"
                      maxW="60%"
                      defaultValue={stat.base_stat}
                      min={0}
                      max={255}
                    >
                      <SliderTrack bg="gray.100">
                        <SliderFilledTrack bg="brand.blue.900" />
                      </SliderTrack>
                    </Slider>
                  </Flex>
                ))}
              </Flex>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonDetailsModal;
