import BreadCrumbs from '@/components/section/BreadCrumbs';
import Dashboard from '@/components/section/Dashboard';
import { useGetSetting } from '@/hooks/Dashboard/useGetSetting';
import { FiEdit, FiInfo } from 'react-icons/fi';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  SimpleGrid,
  Switch,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import EditBlockWeb from '@/components/feature/EditBlockWeb';
import { ChangeEvent, useEffect, useState } from 'react';
import { useEditBlockImages } from '@/hooks/Dashboard/useEditBlockImages';
import useDebounce from '@/hooks/hooks/useDebounce';
import { useForm } from 'react-hook-form';
import { useEditManyCategory } from '@/hooks/Category/useEditManyCategory';
import { FaSync } from 'react-icons/fa';

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
  // toast START
  const toast = useToast();
  const toastSuccess = (message: string) => {
    toast({
      title: message,
      position: 'top-right',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  };

  // toast END

  // modal edit Daftar website
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: muatateStatusCategory } = useEditManyCategory();

  const { data, isSuccess, refetch } = useGetSetting();

  const listBlockWeb = data?.data.data.setting.blockWeb.list;
  const listBlockText = data?.data.data.category.category;

  const { mutate } = useEditBlockImages();

  // START : Edit Switch blokir image
  const [valueSwitch, setValueSwitch] = useState(
    data?.data.data.setting.blockImages
  );

  useEffect(() => {
    setValueSwitch(data?.data.data.setting.blockImages);
  }, [data?.data.data.setting.blockImages]);

  const debouncedValue = useDebounce<boolean>(valueSwitch, 2000);

  const handleSwitchBlockImage = (e: ChangeEvent<HTMLInputElement>) => {
    setValueSwitch(e.target.checked);
  };

  useEffect(() => {
    if (debouncedValue !== data?.data.data.setting.blockImages) {
      mutate(
        {
          blockImages: debouncedValue,
        },
        {
          onSuccess: () => {
            refetch();
            toastSuccess('Fitur blokir gambar berhasil diperbarui');
          },
        }
      );
    }
  }, [debouncedValue]);
  // END : Edit Switch blokir image

  // START : EDIT STATUS CATEGORY
  const {
    register: registerStatusCategory,
    handleSubmit: handleSubmitStatusCategory,
  } = useForm();

  const onSubmitStatusCategory = (data: any) => {
    const { test } = data;
    const newData: any = [];
    for (let index = 0; index < test.length; index++) {
      newData.push({ status: test[index].value, id: listBlockText[index]._id });
    }

    muatateStatusCategory(
      { data: newData },
      {
        onSuccess: () => {
          window.location.reload();
          toastSuccess('Berhasil mengupdate data kategori');
        },
      }
    );
  };

  // END : EDIT STATUS CATEGORY

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
            <form onSubmit={handleSubmitStatusCategory(onSubmitStatusCategory)}>
              {data &&
                listBlockText.map((data: any, key: number) => (
                  <div key={data._id}>
                    <input
                      defaultChecked={data.status}
                      style={{
                        backgroundColor: 'red',
                        marginTop: '2px',
                      }}
                      type="checkbox"
                      // important to include key with field's id
                      {...registerStatusCategory(`test.${key}.value`)}
                    />
                    <label
                      style={{
                        marginBottom: '2px',
                        marginLeft: '6px',
                      }}
                      {...registerStatusCategory(`test.${key}.id`)}
                    >
                      {data.name}
                    </label>
                  </div>
                ))}
              <Button type="submit" size="xs">
                <FaSync />
              </Button>
            </form>
          </Flex>
        </SimpleGrid>
        {/* <SimpleGrid columns={2}>
          <Box>
            <Text>Blokir gambar :</Text>
          </Box>
          <Flex justifyContent="start" flexDirection="row" alignItems="start">
            {data && (
              <Switch
                ml={{ lg: '-120px' }}
                isChecked={valueSwitch}
                onChange={handleSwitchBlockImage}
                mt={1}
              />
            )}
            <Tooltip
              label={
                data?.data.data.setting.blockImages ? 'Aktif' : 'Tidak Aktif'
              }
            >
              <Box mt={1} ml={2}>
                <FiInfo size={20} />
              </Box>
            </Tooltip>
          </Flex>
        </SimpleGrid> */}
        <SimpleGrid columns={[1, 2, 2, 2]} rowGap={2}>
          <Box>
            <Text>Daftar Website Blokir :</Text>
          </Box>
          <Flex
            justifyContent="start"
            gap={2}
            flexDirection="row"
            alignItems="start"
          >
            {listBlockWeb && (
              <Textarea rows={6} disabled value={listBlockWeb.join('\n')} />
            )}
            <Tooltip label="Edit Website Blokir" placement="bottom" hasArrow>
              <Box cursor="pointer" onClick={onOpen}>
                <FiEdit size="20" />
                {listBlockWeb && (
                  <EditBlockWeb
                    isOpen={isOpen}
                    data={listBlockWeb}
                    onClose={onClose}
                    refetch={refetch}
                  />
                )}
              </Box>
            </Tooltip>
          </Flex>
        </SimpleGrid>
      </SimpleGrid>
    </Dashboard>
  );
};

export default Main;
