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
import { CustomSpinner } from "./CustomSpinner";
import {
  GetPokemonDetailsDocument,
  GetPokemonDetailsQuery,
} from "../../generated/graphql";
import { useQuery } from "@apollo/client";

interface PokemonDetailsModalProps {
  bgColor: string;
  pokemonID: number | null;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const PokemonDetailsModal = ({
  isOpen,
  onClose,
  bgColor,
  pokemonID,
}: PokemonDetailsModalProps) => {
  const { data, loading, error } = useQuery<GetPokemonDetailsQuery>(
    GetPokemonDetailsDocument,
    { variables: { id: pokemonID } }
  );

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const pokemonDetails = data?.pokemon_v2_pokemon[0];
  const firstLetter = pokemonDetails?.name?.charAt(0).toUpperCase();
  const remainingName = pokemonDetails?.name?.slice(1);
  const pokemonImage = pokemonDetails?.pokemon_v2_pokemonsprites[0]?.sprites;

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
          data-testid="pokemon-details-modal"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          p={8}
        >
          {loading ? (
            <CustomSpinner />
          ) : (
            <>
              <Box position="relative" mb={4}>
                <Box
                  position="relative"
                  top="50px"
                  left="50%"
                  transform="translate(-50%, -40%)"
                  zIndex="1"
                >
                  <Image
                    src={pokemonImage || ""}
                    alt={pokemonDetails?.name || "Pokemon"}
                    width={100}
                    height={100}
                  />
                </Box>
                <Box textAlign="center" position="relative" mt={-10} zIndex={0}>
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
                  {pokemonDetails?.pokemon_v2_pokemontypes?.map((type) => (
                    <Tag
                      size="md"
                      key={type.pokemon_v2_type?.name}
                      borderRadius="full"
                      variant="outline"
                      bgColor={bgColor}
                      color="brand.blue.900"
                      mr={2}
                    >
                      {type.pokemon_v2_type?.name}
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
                    {pokemonDetails?.pokemon_v2_pokemonabilities
                      ?.map((ability) => ability.pokemon_v2_ability?.name)
                      .join(", ")}
                  </Text>
                </Flex>
                {pokemonDetails?.pokemon_v2_pokemonstats?.map((stat) => (
                  <Flex
                    key={stat.pokemon_v2_stat?.name}
                    justify="space-between"
                    align="center"
                    w="100%"
                    mt={2}
                  >
                    <Text
                      fontSize="12px"
                      color="brand.blue.900"
                      key={stat.pokemon_v2_stat?.name}
                    >
                      {stat.pokemon_v2_stat?.name}
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
