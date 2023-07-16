import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import HeroLogo from "@/assets/hero.svg";

const Hero = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Flex
        width="full"
        height="full"
        maxWidth={1440}
        alignItems="center"
        justify="space-between"
        px={{ base: "20px", sm: "40px", lg: "60px" }}
      >
        <SimpleGrid columns={[1, 1, 2]} paddingY={10}>
          <Box
            minH={{ base: "450px", md: "fit-content" }}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            gap={5}
          >
            <Text fontSize="4xl" fontWeight="semibold">
              Apa itu{" "}
              <span
                style={{
                  color: "blue",
                  fontWeight: 600,
                }}
              >
                UMP Guard
              </span>{" "}
              ?
            </Text>
            <Text>
              UMP Guard Adalah layanan pembatasan internet yang berada area ump,
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
              tempora porro voluptates quibusdam ab voluptatem optio dolorem
              odio sed explicabo!
            </Text>
            <Box>
              <Button>Unduh Ekstensi</Button>
            </Box>
          </Box>
          <Image src={HeroLogo} alt="Hero Logo" />
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default Hero;
