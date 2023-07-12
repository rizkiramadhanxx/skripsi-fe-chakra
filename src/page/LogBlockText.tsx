import BreadCrumbs from "@/components/section/BreadCrumbs";
import Dashboard from "@/components/section/Dashboard";
import { useGetAllClient } from "@/hooks/Client/useGetAllClient";
import { useGetBlockText } from "@/hooks/Client/useGetBlockText";
import { useGetClientByNumber } from "@/hooks/Client/useGetClientById";
import convertDate from "@/utils/convertDate";
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
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

const BREADCRUMBS_DATA = [
  {
    name: "dashboard",
    slug: "dashboard",
  },
  {
    name: "Log Blokir Teks",
    slug: "log-blokir-teks",
  },
];

const LogBlockText = () => {
  const { data } = useGetAllClient();
  const [numberClient, setNumberClient] = useState(0);
  const { data: dataByNumber } = useGetClientByNumber(numberClient);

  const optionValue = data?.data.data.map((e: any) => {
    return {
      value: e.number,
      label: e.name,
    };
  });

  const handleChangeSelect = (e: any) => {
    setNumberClient(e.value);
  };

  const { data: AllDataBlockText, isError, isSuccess } = useGetBlockText();

  return (
    <Dashboard>
      <Box bg="white" p={4}>
        <BreadCrumbs items={BREADCRUMBS_DATA} />
      </Box>
      <Box display="flex" flexDirection="column" p={4} alignItems="center">
        <Flex direction={"column"} w="full" gap={2}>
          <Text fontWeight="bold" p={2}>
            Log Akses Teks
          </Text>

          {/* <Box width="300px">
            <Select
              options={optionValue || []}
              placeholder="Cari komputer... "
              onChange={handleChangeSelect}
            />
          </Box> */}
        </Flex>
        <TableContainer w="full" mt={2}>
          <Table variant="simple" colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>IP Address</Th>
                <Th>List Text</Th>
                <Th>Domain</Th>
                <Th>Waktu Akses</Th>
                <Th>Device</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isSuccess ? (
                AllDataBlockText?.data.data ? (
                  AllDataBlockText?.data.data.map((e: any, key: number) => (
                    <Tr key={key}>
                      <Td>{key + 1}</Td>
                      <Td>{e.ip || ""}</Td>
                      <Td>{e.list_text.join(", ")}</Td>
                      <Td>
                        <Tooltip label={e.domain || ""}>
                          {(e.domain && e.domain.substring(0, 30) + "...") ||
                            ""}
                        </Tooltip>
                      </Td>

                      <Td>{convertDate(e.datetime)}</Td>
                      <Td>
                        <Tooltip label={e.userAgent || ""}>
                          {(e.userAgent &&
                            e.userAgent.substring(0, 30) + "...") ||
                            ""}
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))
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
