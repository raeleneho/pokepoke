"use client";
import Image from "next/image";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SplashScreen from "../components/SplashScreen";

import { useUserContext } from "../../context/UserContext";

export interface FormValues {
  username: string;
  jobTitle: string;
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { userContextData, setUserContextData } = useUserContext();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      username: userContextData.username,
      jobTitle: userContextData.jobTitle,
    },
    mode: "onBlur",
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    setUserContextData(data);
    localStorage.setItem("isLoggedIn", "true");
    // Simulate an async login process
    setTimeout(() => {
      router.replace("/home");
    }, 1200);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Box
      width="100%"
      height="100vh"
      bgColor="brand.secondary.yellow"
      px={{ base: 4, md: 8 }}
    >
      <Flex direction="column" justify="center" align="center" height="100%">
        <VStack
          as="form"
          spacing={{ base: 2, md: 4 }}
          p={8}
          bgColor="white"
          boxShadow="2xl"
          rounded="md"
          maxWidth="100%"
          width={{ base: "100%", md: "600px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex
            direction="row"
            align="center"
            mb={{ base: 4 }}
            width="100%"
            justifyContent="center"
          >
            <Box
              position="relative"
              width={{ base: "40px", md: "60px", lg: "80px" }}
              height={{ base: "40px", md: "60px", lg: "80px" }}
              mr={{ base: 2, md: 4 }}
            >
              <Image
                src="/images/pikachu.png"
                alt="Pikachu"
                fill
                style={{
                  objectFit: "contain",
                }}
                aria-hidden="true"
              />
            </Box>
            <Flex direction="column" justify="center">
              <Heading
                as="h1"
                fontWeight={900}
                color="brand.blue.500"
                fontStyle="italic"
                fontSize={{ base: "2xl", md: "2xl", lg: "50px" }}
                style={{ transformOrigin: "center" }}
              >
                POKÉSAURUS
              </Heading>
              <Text
                fontWeight={440}
                color="brand.blue.500"
                letterSpacing="0.02em"
                lineHeight="1.2"
                fontSize={{ base: "12px", md: "18px" }}
              >
                Your ultimate Pokémon pocketbook.
              </Text>
            </Flex>
          </Flex>
          <FormControl isInvalid={!!errors.username}>
            <Input
              variant="flushed"
              placeholder="Username"
              type="text"
              aria-required
              {...register("username", {
                required: "This is required",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.jobTitle} mt={4}>
            <Input
              variant="flushed"
              placeholder="Job Title"
              type="text"
              aria-required
              {...register("jobTitle", {
                required: "Job title is required",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.jobTitle && errors.jobTitle.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            rightIcon={
              <Image
                src="/images/pokemon-ball.png"
                alt="pokemon-icon"
                width={24}
                height={24}
                style={{
                  objectFit: "contain",
                }}
              />
            }
            type="submit"
            color="white"
            bgColor={isValid ? "teal" : "gray"}
            isDisabled={isSubmitting || !isValid}
            mt={4}
          >
            Go!
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
}
