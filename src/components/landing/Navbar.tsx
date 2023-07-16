import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Logo from "@/assets/react.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      as="nav"
      justifyContent="center"
      shadow="sm"
      height={{ base: "70px", lg: "70px" }}
    >
      <Flex
        width="full"
        height="full"
        maxWidth={1440}
        alignItems="center"
        justify="space-between"
        px={{ base: "20px", sm: "40px", lg: "60px" }}
      >
        <Image src={Logo} alt="Logo" />
        <Flex gap={10} display={{ base: "none", lg: "flex" }}>
          <Text fontSize="lg" fontWeight="medium">
            Tentang
          </Text>
          <Text fontSize="lg" fontWeight="medium">
            Tujuan
          </Text>
          <Text fontSize="lg" fontWeight="medium">
            Cara Pakai
          </Text>
          <Text fontSize="lg" fontWeight="semibold">
            Keunggulan
          </Text>
        </Flex>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
