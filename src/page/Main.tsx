import BreadCrumbs from '@/components/section/BreadCrumbs';
import Dashboard from '@/components/section/Dashboard';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';

const BREADCRUMBS_DATA = [
  {
    name: 'dashboard',
    slug: 'dashboard',
  },
  {
    name: 'main',
    slug: 'dashboard',
  },
];

const Main = () => {
  return (
    <Dashboard>
      <Box bg="white" p={4}>
        <BreadCrumbs items={BREADCRUMBS_DATA} />
      </Box>
      <Divider />
      <SimpleGrid bg="white" columns={[1, 1, 1, 2]} p={4} gap={4}>
        <SimpleGrid columns={2}>
          <Box>
            <Text>Daftar Kategori yang diblokir :</Text>
          </Box>
          <Flex
            // bg="red.200"
            justifyContent="start"
            flexDirection="column"
            alignItems="start"
          >
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
          </Flex>
        </SimpleGrid>
        <SimpleGrid columns={2}>
          <Box>
            <Text>Blokir gambar :</Text>
          </Box>
          <Flex
            // bg="red.200"
            justifyContent="start"
            flexDirection="column"
            alignItems="start"
          >
            <Button size="sm">Aktif</Button>
          </Flex>
        </SimpleGrid>
        <SimpleGrid columns={2}>
          <Box>
            <Text>Daftar Website Blokir :</Text>
          </Box>
          <Flex
            justifyContent="start"
            flexDirection="column"
            alignItems="start"
          >
            <Textarea />
          </Flex>
        </SimpleGrid>
      </SimpleGrid>
    </Dashboard>
  );
};

export default Main;
