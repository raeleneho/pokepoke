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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "../login/page";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      jobTitle: "",
    },
  });

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData: FormValues = JSON.parse(storedData);
      setValue("username", parsedData.username);
      setValue("jobTitle", parsedData.jobTitle);
    }
  }, [setValue]);

  useEffect(() => {
    if (isSubmitting && isValid) {
      setIsSaved(true);
      const timeout = setTimeout(() => setIsSaved(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isSubmitting, isValid]);

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    localStorage.setItem("formData", JSON.stringify(data));

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("isLoggedIn");
    setValue("username", "");
    setValue("jobTitle", "");

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
          onSubmit={handleSubmit(onSubmit)}
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
              {isSaved ? "Changes Saved" : "Save changes"}
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}
