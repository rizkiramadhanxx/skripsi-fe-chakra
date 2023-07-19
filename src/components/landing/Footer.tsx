import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Flex
        width="full"
        height="full"
        maxWidth={1440}
        alignItems="center"
        shadow={"md"}
        bgColor="blue.500"
        justify="end"
        h={20}
        color="white"
        px={{ base: "25px", sm: "40px", lg: "60px" }}
      >
        Copyright UMP Guard 2020
      </Flex>
    </Box>
  );
};

export default Footer;
