import { Box, keyframes } from "@chakra-ui/react";
import Image from "next/image";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const CustomSpinner = () => {
  return (
    <Box
      data-testid="custom-spinner"
      display="inline-block"
      animation={`${spin} 1s linear infinite`}
    >
      <Image
        src="/images/pokemon-ball.png"
        alt="Loading"
        width={40}
        height={40}
      />
    </Box>
  );
};
