import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const dataAccordion = [
  {
    title: "Memblokir Situs Terlarang",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias facere dolorum adipisci vero doloremque qui quas. Dolore ad praesentium quo tenetur, fugit quam voluptates harum eos magnam, sapiente, deserunt expedita iusto unde itaque assumenda modi voluptatem. Aperiam iste quasi, mollitia facilis ab eos doloremque velit reprehenderit pariatur dolores ea deleniti?",
  },
  {
    title: "Menyensor kata-kata yang berbahaya",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias facere dolorum adipisci vero doloremque qui quas. Dolore ad praesentium quo tenetur, fugit quam voluptates harum eos magnam, sapiente, deserunt expedita iusto unde itaque assumenda modi voluptatem. Aperiam iste quasi, mollitia facilis ab eos doloremque velit reprehenderit pariatur dolores ea deleniti?",
  },
  {
    title: "Lorem ipsum",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias facere dolorum adipisci vero doloremque qui quas. Dolore ad praesentium quo tenetur, fugit quam voluptates harum eos magnam, sapiente, deserunt expedita iusto unde itaque assumenda modi voluptatem. Aperiam iste quasi, mollitia facilis ab eos doloremque velit reprehenderit pariatur dolores ea deleniti?",
  },
  {
    title: "Lorem ipsum",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias facere dolorum adipisci vero doloremque qui quas. Dolore ad praesentium quo tenetur, fugit quam voluptates harum eos magnam, sapiente, deserunt expedita iusto unde itaque assumenda modi voluptatem. Aperiam iste quasi, mollitia facilis ab eos doloremque velit reprehenderit pariatur dolores ea deleniti?",
  },
];

const Purpose = () => {
  return (
    <Box id="purpose" display="flex" justifyContent="center">
      <Flex
        width="full"
        height="full"
        maxWidth={1440}
        flexDir={"column"}
        alignItems="center"
        justify="space-between"
        px={{ base: "20px", sm: "40px", lg: "60px" }}
      >
        <Text fontSize={"2xl"} fontWeight="medium">
          Tujuan
        </Text>
        <Flex w="full" justifyContent={"center"} py={30}>
          <Box w={"full"}>
            <Accordion allowToggle>
              {dataAccordion.map((data) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {data.title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{data.description}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Purpose;
