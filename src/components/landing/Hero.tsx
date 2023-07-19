import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import HeroLogo from "@/assets/hero.svg";

const Hero = () => {
  return (
    <Box display="flex" justifyContent="center" id="hero">
      <Flex
        width="full"
        height="full"
        maxWidth={1440}
        alignItems="center"
        justify="space-between"
        px={{ base: "20px", sm: "40px", lg: "60px" }}
      >
        <SimpleGrid columns={[1, 1, 2]} paddingY={10} columnGap={200}>
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
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                UMP Guard
              </span>{" "}
              adalah layanan pembatasan internet untuk memblokir layanan dan
              situs yang berbahaya untuk Universitas Muhammadiyah Purwokerto
            </Text>
            <Box>
              <Button>
                <Link
                  href="https://drive.google.com/file/d/1-vHB-uN-1xGzZk-gDYNME61sS11RNWvb/view?usp=sharing"
                  isExternal
                >
                  Unduh Ekstensi
                </Link>
              </Button>
            </Box>
          </Box>
          <Image src={HeroLogo} alt="Hero Logo" />
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default Hero;
