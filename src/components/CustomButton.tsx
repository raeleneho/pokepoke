import { Icon, Button, Box } from "@chakra-ui/react";
import { MdErrorOutline, MdWarning, MdPerson } from "react-icons/md";

interface CustomButtonProps {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  children: React.ReactNode;
  color?: string;
  variant?: "solid" | "outline";
  isDisabled?: boolean;
}

interface IconProps {
  color?: string;
  size?: string | number;
}

const ErrorIcon = ({ color, size }: IconProps) => (
  <Icon as={MdErrorOutline} color={color} fontSize={size} />
);

const AvatarIcon = () => <Icon as={MdPerson} fontSize="1.5em" />; // Custom avatar icon

export const CustomButton = ({
  leftIcon,
  rightIcon,
  color,
  variant,
  isDisabled,
  children,
}: CustomButtonProps) => {
  return (
    <Button
      type="submit"
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      colorScheme={color}
      variant={variant}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
};
