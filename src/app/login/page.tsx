"use client";
import Image from "next/image";
import { SplashScreen } from "@/components/SplashScreen";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const shrink = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.7);
  }
`;

export interface FormValues {
  username: string;
  jobTitle: string;
}

export default function Page() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    const timer = setTimeout(() => {
      setIsShrunk(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData: FormValues = JSON.parse(storedData);
      setValue("username", parsedData.username);
      setValue("jobTitle", parsedData.jobTitle);
    }

    // const isLoggedIn = localStorage.getItem("isLoggedIn");
    // if (isLoggedIn) {
    //   router.replace("/home");
    // }
  }, [setValue, router]);

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    localStorage.setItem("formData", JSON.stringify(data));
    console.log(data);
    // Simulate an async login process
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("isLoggedIn", "true"); // Set login status in local storage
      //   router.replace("/");
    }, 800);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div>
      <Box
        position="relative"
        width="100%"
        height="100vh"
        bgColor="brand.secondary.yellow"
      >
        <Global
          styles={css`
            .fade-in {
              animation: ${fadeIn} 2s ease-in-out;
            }
            .shrink {
              animation: ${shrink} 2s ease-in-out forwards;
            }
          `}
        />

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="center"
          align="center"
          height="100%"
          px={{ base: 4, md: 8 }}
        >
          <Image
            src="/images/pikachu.png"
            alt="Pikachu"
            layout="responsive"
            width={100}
            height={100}
            sizes="(min-width: 768px), 50vh, 70vh"
            objectFit="contain"
            objectPosition="bottom left"
            aria-hidden="true"
          />

          <Flex
            direction="column"
            justify="center"
            alignItems="center"
            order={{ base: 1, md: 2 }}
            width={{ base: "100%", md: "50%" }}
          >
            <Heading
              as="h1"
              fontWeight={900}
              color="brand.blue.900"
              fontStyle="italic"
              fontSize={{ base: "2xl", md: "2xl", lg: "80px" }}
              className={`fade-in ${isShrunk ? "shrink" : ""}`}
              style={{ transformOrigin: "center" }}
              mb={{ base: 4 }}
            >
              POKÉSAURUS
            </Heading>

            <VStack
              as="form"
              spacing={{ base: 2, md: 4 }}
              p={6}
              bgColor="white"
              boxShadow="2xl"
              rounded="md"
              bg="white"
              maxWidth="100%"
              width={{ base: "100%", md: "400px" }}
              onSubmit={handleSubmit(onSubmit)}
            >
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
              <FormControl isInvalid={!!errors.jobTitle}>
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
                    fill
                    alt="pokemon-icon"
                    objectFit="contain"
                  />
                }
                type="submit"
                color="white"
                bgColor={isValid ? "teal" : "gray"}
                isDisabled={isSubmitting || !isValid}
              >
                Go!
              </Button>
            </VStack>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}
