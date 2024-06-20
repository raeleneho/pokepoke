"use client";
import {
  Flex,
  Heading,
  VStack,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "../login/page";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";

import { useUserContext } from "../../context/UserContext";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Save changes");
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
  });

  const updateUser = (data: FormValues) => {
    setIsLoading(true);
    setUserContextData(data);

    setButtonText("Changes Saved");
    setIsLoading(false);
    setTimeout(() => setButtonText("Save changes"), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("userContextData");
    localStorage.removeItem("isLoggedIn");
    setUserContextData({ username: "", jobTitle: "" });

    router.replace("/login");
  };

  return (
    <Box position="relative" height="100vh" padding={8}>
      <NavBar />
      <Flex height="100vh" flexDir="column" align="center" justify="center">
        <Heading as="h1" color="brand.blue" size="md" mb={2}>
          Personal Info
        </Heading>

        <VStack
          as="form"
          align="start"
          spacing={8}
          p={8}
          bgColor="white"
          boxShadow="2xl"
          rounded="md"
          bg="white"
          width={{ base: "auto", lg: "800px" }}
          onSubmit={handleSubmit(updateUser)}
        >
          <Box width="100%">
            <FormLabel m={0} htmlFor="username">
              Username
            </FormLabel>

            <FormControl isInvalid={!!errors.username}>
              <Input
                variant="flushed"
                placeholder="Username"
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
          </Box>

          <Box width="100%">
            <FormLabel m={0} htmlFor="jobTitle">
              Job Title
            </FormLabel>
            <FormControl isInvalid={!!errors.jobTitle}>
              <Input
                variant="flushed"
                placeholder="Job Title"
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
          </Box>

          {/* Logout */}

          <Flex justify="space-between" width="100%">
            <Button
              onClick={handleLogout}
              color="brand.blue.500"
              variant="ghost"
            >
              Logout
            </Button>
            <Button
              type="submit"
              color="white"
              alignSelf="flex-end"
              bgColor={isValid ? "teal" : "gray"}
              isDisabled={isSubmitting || !isValid}
            >
              {buttonText}
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}
