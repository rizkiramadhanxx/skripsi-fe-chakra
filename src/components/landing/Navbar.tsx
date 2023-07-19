import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Logo from "@/assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const navigate = useNavigate();

  /*
   * Sticky Navigation
   * @see https://theodorusclarence.com/library/sticky-nav
   */

  const [onTop, setOnTop] = useState(true);

  const handleScroll = () => {
    if (onTop !== (window.pageYOffset === 0)) {
      setOnTop(window.pageYOffset === 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Box
      style={{
        backdropFilter: "blur(12px)",
      }}
      zIndex={100}
      display="flex"
      top="0"
      position="sticky"
      as="nav"
      justifyContent="center"
      shadow={onTop ? "none" : "sm"}
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
        <Image src={Logo} alt="Logo" height={12} />
        <Flex gap={10} display={{ base: "none", lg: "flex" }}>
          <HashLink to="#hero" smooth>
            <Text fontSize="lg" fontWeight="medium">
              Tentang
            </Text>
          </HashLink>
          <HashLink to="#purpose" smooth>
            <Text fontSize="lg" fontWeight="medium">
              Tujuan
            </Text>
          </HashLink>
          <HashLink to="#howtouse" smooth>
            <Text fontSize="lg" fontWeight="medium">
              Cara Pakai
            </Text>
          </HashLink>
          <Text fontSize="lg" fontWeight="medium">
            Keunggulan
          </Text>
        </Flex>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
