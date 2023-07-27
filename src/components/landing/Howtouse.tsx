import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import "@/css/howtouse.css";

const Howtouse = () => {
  return (
    <Box id="howtouse" bg="gray.100" display="flex" justifyContent="center">
      <Flex
        width="full"
        height="full"
        maxWidth={1440}
        flexDir={"column"}
        py={5}
        alignItems="center"
        justify="space-between"
        px={{ base: "20px", sm: "40px", lg: "60px" }}
      >
        <Text fontSize={"2xl"} fontWeight="medium" mb={10}>
          Cara Pakai
        </Text>
        <div className="videowrapper">
          <iframe
            width="1000"
            height="400"
            src="https://youtu.be/XXSrxMKsO98"
          ></iframe>
        </div>
      </Flex>
    </Box>
  );
};

export default Howtouse;
