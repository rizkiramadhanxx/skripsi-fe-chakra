import { useEditBlockWeb } from "@/hooks/Dashboard/useEditBlockWeb";
import { TEditBlockWebRequest } from "@/types/hooksTypes/settingType";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditBlockWebProps {
  isOpen: boolean;
  onClose: () => void;
  data: string[];
  refetch: any;
}

const EditBlockWeb = ({
  isOpen,
  onClose,
  data,
  refetch,
}: EditBlockWebProps) => {
  // toast START
  const toast = useToast();
  const toastSuccess = () => {
    toast({
      title: "Data sukses diperbarui",
      position: "top-right",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const toastError = (desc: string) => {
    toast({
      title: "Data gagal diperbarui",
      position: "top-right",
      description: desc,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };
  // toast END

  const { mutate } = useEditBlockWeb();

  const { register, handleSubmit, reset } = useForm({});

  const onSubmit = (data: any) => {
    const filterSyntax = (word: string, pos: any, self: any) => {
      return word !== "" && self.indexOf(word) == pos;
    };

    const newData: Array<boolean | string> = data.list
      .split("\n")
      .filter(filterSyntax)
      .map((value: string) => {
        return value.toLowerCase();
      })
      .map((value: string) => {
        const regexValid =
          /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
        if (value.match(regexValid)) {
          return value;
        } else {
          return false;
        }
      });

    if (newData.includes(false)) {
      return toastError("Bentuk data tidak valid, harus berupa domain");
    }

    mutate({ list: newData } as TEditBlockWebRequest, {
      onSuccess: () => {
        toastSuccess();
        refetch();
        return onClose();
      },
      onError: () => toastError("Terjadi kesalahan"),
    });
  };

  useEffect(() => {
    reset({
      list: data.join("\n"),
    });
  }, [data]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Daftar Website Blokir</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} id="formEdit">
              <FormControl>
                <FormLabel>List</FormLabel>
                <Textarea rows={6} {...register("list")} />
                <FormHelperText color="red">
                  *) List harus dengan format domain web
                </FormHelperText>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="green" form="formEdit" type="submit">
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditBlockWeb;
