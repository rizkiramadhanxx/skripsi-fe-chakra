import { useAddCategory } from '@/hooks/Category/useAddCategory';
import { useEditCategory } from '@/hooks/Category/useEditCategory';
import {
  Button,
  ButtonProps,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  list,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type TAddCategoryRequest = {
  list: string;
  name: string;
};

interface AddCategoryProps {
  type: 'ADD' | 'EDIT';
  refecth: any;
  defaultValue?: {
    _id: string;
    list: string;
    name: string;
  };
  buttonProps: ButtonProps;
}
const schema: yup.ObjectSchema<any> = yup.object().shape({
  name: yup.string().min(5, 'Minimal 5 karater').required('Nama harus terisi'),
  list: yup.string().test({
    message: 'Format tidak valid',
    test: (list) => {
      if (list === '' || undefined) {
        return false;
      }
      const filterSyntax = (word: string, pos: any, self: any) => {
        return word !== '' && self.indexOf(word) == pos;
      };

      if (list) {
        const newDataList: Array<boolean | string> = list
          .split('\n')
          .filter(filterSyntax)
          .map((value: string) => {
            return value.toLowerCase();
          })
          .map((value: string) => {
            const regexValid = /^[A-Z]+$/i;
            if (value.match(regexValid)) {
              return value;
            } else {
              return false;
            }
          });

        if (newDataList.includes(false)) {
          return false;
        }
      }

      return true;
    },
  }),
});

const AddCategory = ({
  refecth,
  type,
  buttonProps,
  defaultValue = undefined,
}: AddCategoryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // toast START
  const toast = useToast();
  const toastSuccess = () => {
    toast({
      title: 'Data sukses diperbarui',
      position: 'top-right',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const toastError = (desc: string) => {
    toast({
      title: 'Data gagal diperbarui',
      position: 'top-right',
      description: desc,
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };
  // toast END

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TAddCategoryRequest>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  // Service
  const { mutate } = useAddCategory();
  const { mutate: mutateEdit } = useEditCategory();

  // handle DefaultValue
  useEffect(() => {
    if (type === 'EDIT') {
      reset(defaultValue);
    }
  }, []);

  const onSubmit = (data: TAddCategoryRequest) => {
    // START : Validation Daftar Kategori
    const filterSyntax = (word: string, pos: any, self: any) => {
      return word !== '' && self.indexOf(word) == pos;
    };

    const newDataList: Array<boolean | string> = data.list
      .split('\n')
      .filter(filterSyntax)
      .map((value: string) => {
        return value.toLowerCase();
      })
      .map((value: string) => {
        const regexValid = /^[A-Z]+$/i;
        if (value.match(regexValid)) {
          return value;
        } else {
          return false;
        }
      });
    // END : Validation Daftar Kategori

    if (type === 'ADD') {
      mutate(
        { ...data, list: newDataList },
        {
          onSuccess: () => {
            toastSuccess();
            () => refecth();
            reset({ list: '', name: '' });
            return onClose();
          },
          onError: () => {
            return toastError('Gagal memperbarui data');
          },
        }
      );
    }

    if (type === 'EDIT') {
      mutateEdit(
        //@ts-ignore
        { ...data, list: newDataList, id: defaultValue?._id },
        {
          onSuccess: () => {
            toastSuccess();
            refecth;
            return onClose();
          },
          onError: () => {
            return toastError('Gagal memperbarui data');
          },
        }
      );
    }
  };

  return (
    <>
      <Button
        ml={2}
        variant="solid"
        colorScheme={type === 'ADD' ? 'green' : 'blue'}
        onClick={onOpen}
        {...buttonProps}
      >
        {type === 'ADD' ? 'Tambah' : 'Edit'}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {type === 'ADD' ? 'Tambah' : 'Edit'} Kategori
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              direction="column"
              id="form"
              rowGap={2}
            >
              <FormControl isInvalid={errors.name ? true : false}>
                <FormLabel>Nama</FormLabel>
                <Input {...register('name')} />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.list ? true : false}>
                <FormLabel>Daftar Kata</FormLabel>
                <Textarea rows={5} {...register('list')} />
                <FormErrorMessage>
                  {errors.list && errors.list.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button
              isDisabled={!isValid}
              colorScheme="green"
              form="form"
              type="submit"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCategory;
