import { useProfile } from '@/hooks/Dashboard/useProfile';
import { AuthenticationService } from '@/service/AuthServices';
import {
  Box,
  BoxProps,
  CloseButton,
  Divider,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode, ReactText } from 'react';
import { IconType } from 'react-icons';
import {
  FiCompass,
  FiHome,
  FiUser,
  FiLogOut,
  FiMenu,
  FiTrendingUp,
} from 'react-icons/fi';
import { useLocation, NavLink } from 'react-router-dom';

interface LinkItemProps {
  name: string;
  icon: IconType;
  slug: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiHome, slug: 'dashboard' },
  { name: 'Kategori Kata', icon: FiTrendingUp, slug: 'kategori' },
];

export default function Dashboard({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const logout = () => AuthenticationService.Logout();
  // Service
  const { data, isLoading } = useProfile();

  // Action
  const handleLogout = () => {
    logout();
    window.location.reload();
  };
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="12" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold" color="blue.500">
          UMP GUARD
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Divider my={2} />
      <NavItem slug="hahah" icon={FiUser} textTransform="capitalize">
        Welcome, {data?.data.data.username}
      </NavItem>
      <Divider my={2} />
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          as={NavLink}
          // @ts-ignore
          to={'/' + link.slug}
          slug={link.slug}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
      <Divider my={2} />
      <NavItem
        slug="hahah"
        icon={FiLogOut}
        _hover={{
          bg: 'red.400',
          color: 'white',
        }}
        onClick={handleLogout}
      >
        Logout
      </NavItem>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  slug?: string;
}
const NavItem = ({
  icon,
  children,
  slug = undefined,
  ...rest
}: NavItemProps) => {
  const params = useLocation();
  const lengthParams = params.pathname.split('/').length - 1;
  const activeUrl = params.pathname.split('/')[lengthParams] === slug;

  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      fontWeight={activeUrl ? 'bold' : 'normal'}
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" color="blue.500" ml="8" fontWeight="bold">
        UMP GUARD
      </Text>
    </Flex>
  );
};
