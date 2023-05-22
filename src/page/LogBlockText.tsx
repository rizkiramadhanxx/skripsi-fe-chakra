import BreadCrumbs from '@/components/section/BreadCrumbs';
import Dashboard from '@/components/section/Dashboard';
import { useGetClientByNumber } from '@/hooks/Client/useGetClientById';
import { useGetAllClient } from '@/hooks/Client/useGetAllClient';
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { isError } from '@tanstack/react-query';
import { Select } from 'chakra-react-select';
import * as dayjs from 'dayjs';
import { useState } from 'react';
dayjs().format();

const BREADCRUMBS_DATA = [
  {
    name: 'dashboard',
    slug: 'dashboard',
  },
  {
    name: 'Log Blokir Teks',
    slug: 'log-blokir-teks',
  },
];

const LogBlockText = () => {
  const { data } = useGetAllClient();
  const [numberClient, setNumberClient] = useState(0);
  const {
    data: dataByNumber,
    isError,
    isSuccess,
  } = useGetClientByNumber(numberClient);

  const optionValue = data?.data.data.map((e: any) => {
    return {
      value: e.number,
      label: e.name,
    };
  });

  const handleChangeSelect = (e: any) => {
    setNumberClient(e.value);
  };

  return (
    <Dashboard>
      <Box bg="white" p={4}>
        <BreadCrumbs items={BREADCRUMBS_DATA} />
      </Box>
      <Box display="flex" flexDirection="column" p={4} alignItems="center">
        <Flex direction={'column'} w="full" gap={2}>
          <Text fontWeight="bold" p={2}>
            Log Akses Teks
          </Text>
          <Box width="300px">
            <Select
              options={optionValue || []}
              placeholder="Cari komputer... "
              onChange={handleChangeSelect}
            />
          </Box>
        </Flex>
        <TableContainer w="full" mt={2}>
          <Table variant="simple" colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>List Text</Th>
                <Th>IP Address</Th>
                <Th>Waktu Akses</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isSuccess ? (
                dataByNumber?.data.data.log_BlockText ? (
                  dataByNumber?.data.data.log_BlockText.map(
                    (e: any, key: number) => (
                      <Tr key={key}>
                        <Td>{key + 1}</Td>
                        <Td>{e.list_text.join(', ')}</Td>
                        <Td>{e.ip || ''}</Td>
                        <Td>
                          {dayjs(e.datetime).format(
                            'DD/MM/YYYY, Pukul HH:mm:ss'
                          )}
                        </Td>
                      </Tr>
                    )
                  )
                ) : (
                  <Tr>
                    <Td>Data Kosong</Td>
                  </Tr>
                )
              ) : (
                <Tr>
                  <Td>Data Kosong</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Dashboard>
  );
};

export default LogBlockText;
