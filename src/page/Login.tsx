import { TLoginForm } from '@/types/form';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link as NavLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logged } from '@/redux/action/authSlice';
import { useEffect } from 'react';
import { useLogin } from '@/hooks/Auth/useLogin';

const schema: yup.ObjectSchema<TLoginForm> = yup.object().shape({
  email: yup.string().email('must format email').required('email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Minimun 8 character')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      'Must combination number and alphabet'
    ),
});

export default function Login() {
  const isLogin = useSelector((state: RootState) => state.auth).isLogin;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
  } = useForm<TLoginForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isLogin) {
      navigate('/dashboard', {
        replace: true,
      });
    }
  }, []);

  // toast START
  const toast = useToast();
  const toastSuccess = () => {
    toast({
      title: 'You are login',
      position: 'top-right',
      description: 'Welcome to Bagilink',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  };

  const toastError = () => {
    toast({
      title: 'not successful to login',
      position: 'top-right',
      description: 'Check your username and password again',
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
  };
  // toast END
  const { mutate } = useLogin();
  const onSubmit = (data: TLoginForm) => {
    mutate(data, {
      onSuccess: () => {
        dispatch(logged());
        toastSuccess();
        navigate('/dashboard', {
          replace: true,
        });
      },
      onError: () => {
        toastError();
      },
    });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          minW={{
            md: '400px',
          }}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                id="email"
                isInvalid={errors.email?.message ? true : false}
              >
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={errors.password?.message ? true : false}
              >
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register('password')} />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack align={'start'} justify={'space-between'}>
                  <Link as={NavLink} to="/register" color={'blue.400'}>
                    Register ?
                  </Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  disabled={!isValid}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
