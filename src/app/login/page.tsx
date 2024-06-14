"use client";
import { CustomButton } from "@/components/CustomButton";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  VStack,
  keyframes,
  useBreakpointValue,
} from "@chakra-ui/react";

import { css, Global } from "@emotion/react";
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
    transform: scale(0.5);
  }

`;
interface FormValues {
  username: string;
  jobTitle: string;
}

export default function Page() {
  const [isShrunk, setIsShrunk] = useState(false);
  //   const [formData, setFormData] = useState<FormValues | null>({
  //     username: "",
  //     jobTitle: "",
  //   });
  const direction = useBreakpointValue<"row" | "column">({
    base: "column",
    md: "row",
  });

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
  }, [setValue]);

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target as HTMLInputElement;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  const onSubmit = (data: FormValues) => {
    localStorage.setItem("formData", JSON.stringify(data));
    console.log(data);
  };
  return (
    <div>
      <Box position="relative" width="100%" height="100vh" bgColor="#FFD55C">
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

        {/* <Box
          position="absolute"
          bottom={0}
          left={0} // Align to the right side
          width="40%" // Take up 30% width on larger screens
          height="100%" // Take up full screen height
          boxShadow={{ base: "none", md: "xl" }} // No shadow on mobile, xl shadow on larger screens
          bgColor="#FFD55C"
          zIndex={-1}
          transformOrigin="top right" // Set transform origin
          transform="skewX(-15deg)"
        ></Box> */}
        <Flex
          direction={direction}
          justify="space-evenly"
          align="center"
          height="100%"
          color="black"
          px={{ base: 4 }}
        >
          <Image
            src="/images/pikachu.png"
            alt="Pikachu"
            order={{ base: 2, md: 1 }}
            width={{ base: "50%", md: "auto" }}
            height={{ base: "auto", md: "50vh", lg: "70vh" }}
            objectFit="contain"
            objectPosition="bottom left"
            aria-hidden="true"
          />
          {/* <Image
            src="/images/pikachu.png"
            alt="Pikachu"
            width={{ base: "100%", md: "auto" }}
            height={{ base: "auto", md: "50vh", lg: "70vh" }}
            objectFit="contain"
            objectPosition="bottom left"
            aria-hidden="true"
          /> */}

          {/* <Image
            src="/images/pikachu.png"
            alt="Pikachu"
            position="absolute"
            bottom={0}
            left={0}
            width={{ base: "100%", md: "auto" }}
            height={{ base: "auto", md: "50vh", lg: "100vh" }}
            objectFit="cover"
            objectPosition="bottom left"
            zIndex={1}
            aria-hidden="true"
          /> */}

          <Flex
            direction="column"
            justify="center"
            alignItems="center"
            order={{ base: 1, md: 2 }}
          >
            <Heading
              as="h1"
              fontStyle="italic"
              fontWeight={900}
              fontSize={{ md: "2xl", lg: "80px" }}
              className={`fade-in ${isShrunk ? "shrink" : ""}`}
              style={{ transformOrigin: "center" }}
            >
              POKÉSAURUS
            </Heading>

            <VStack
              as="form"
              spacing={4}
              p={6}
              bgColor="white"
              boxShadow="2xl"
              rounded="md"
              bg="white"
              onSubmit={handleSubmit(onSubmit)}
            >
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

              <CustomButton
                rightIcon={
                  <Image
                    src="images/pokemon-ball.png"
                    width="20px"
                    height="100%"
                    alt="pokemon-icon"
                    objectFit="contain"
                  />
                }
                color={isValid ? "teal" : "gray"}
                isDisabled={isSubmitting || !isValid}
              >
                Go!
              </CustomButton>
            </VStack>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}
