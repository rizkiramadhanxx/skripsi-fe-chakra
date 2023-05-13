import AddCategory from '@/components/feature/AddCategory';
import BreadCrumbs from '@/components/section/BreadCrumbs';
import Dashboard from '@/components/section/Dashboard';
import { useDeleteCategory } from '@/hooks/Category/useDeleteCategory';
import { useGetCategory } from '@/hooks/Category/useGetCategory';

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
const BREADCRUMBS_DATA = [
  {
    name: 'dashboard',
    slug: 'dashboard',
  },
  {
    name: 'Kategori',
    slug: 'kategori',
  },
];

interface ConfimDeleteModalProps {
  onClose: () => void;
  isOpen: boolean;
  confirm: () => void;
  name: string;
}
const ConfimDeleteModal = ({
  onClose,
  isOpen,
  confirm,
  name,
}: ConfimDeleteModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Apakah anda ingin menghapus data kategori "{name}"" ?
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue">
            Close
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              confirm();
              onClose();
            }}
            ml={2}
          >
            Hapus
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Category = () => {
  // toast START
  const toast = useToast();
  const toastSuccess = () => {
    toast({
      title: 'Data berhasil dihapus',
      position: 'top-right',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  };

  const toastError = (desc: string) => {
    toast({
      title: 'Data gagal diperbarui',
      position: 'top-right',
      description: desc,
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
  };
  // toast END

  const { data, refetch, isFetched } = useGetCategory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenConfirmDelete,
    onOpen: onOpenConfirmDelete,
    onClose: onCloseConfirmDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenEditCategory,
    onOpen: onOpenEditCategory,
    onClose: onCloseEditCategory,
  } = useDisclosure();

  // **START** DELETE CATEGORY //

  const { mutate } = useDeleteCategory();

  const handleDelete = (e: string) => {
    mutate(
      {
        id: e,
      },
      {
        onSuccess: () => {
          refetch();
          return toastSuccess();
        },
      }
    );
  };

  // **END** DELETE CATEGORY //

  return (
    <Dashboard>
      <Box bg="white" p={4}>
        <BreadCrumbs items={BREADCRUMBS_DATA} />
      </Box>
      <Box display="flex" flexDirection="column" p={4} alignItems="center">
        <Flex direction={'column'} w="full" gap={2}>
          <Text fontWeight="bold">Daftar Kategori Kata</Text>
          <Button colorScheme="blue" w="80px" onClick={onOpen}>
            Tambah
          </Button>
          <AddCategory
            // @ts-ignore
            refetch={refetch()}
            isOpen={isOpen}
            type="ADD"
            onClose={onClose}
          />
        </Flex>
        <TableContainer w="full" mt={2}>
          <Table variant="simple" colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Nama</Th>
                <Th>Daftar Kata</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data && !data.data.data.category[0] && (
                <Td colSpan={4}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    height="100px"
                    alignItems="center"
                  >
                    <Text fontWeight="bold"> Data Kosong</Text>
                  </Box>
                </Td>
              )}
              {data ? (
                data.data.data.category.map((data: any, key: number) => (
                  <Tr key={key}>
                    <Td>{key + 1}</Td>
                    <Td>{data.name}</Td>

                    <Td>{data.list.slice(0, 3).join(', ')}</Td>
                    <Td>
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        onClick={onOpenEditCategory}
                      >
                        Edit
                      </Button>
                      <AddCategory
                        // @ts-ignore
                        refetch={refetch()}
                        isOpen={isOpenEditCategory}
                        type="EDIT"
                        defaultValue={{
                          _id: data._id,
                          list: data.list.join('\n'),
                          name: data.name,
                        }}
                        onClose={onCloseEditCategory}
                      />
                      <Button
                        ml={2}
                        variant="solid"
                        colorScheme="red"
                        onClick={onOpenConfirmDelete}
                      >
                        Hapus
                      </Button>
                      <ConfimDeleteModal
                        name={data.name}
                        isOpen={isOpenConfirmDelete}
                        onClose={onCloseConfirmDelete}
                        confirm={() => handleDelete(data._id)}
                      />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      height="200px"
                      alignItems="center"
                    >
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                      />
                    </Box>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Dashboard>
  );
};

export default Category;
