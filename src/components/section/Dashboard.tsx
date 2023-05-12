import { useProfile } from '@/hooks/useProfile';
import { AuthenticationService } from '@/service/AuthService';
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
  // Service
  const { data, isLoading } = useProfile();

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
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const logout = () => AuthenticationService.Logout();

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
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
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
        isLogout={true}
        onClick={handleLogout}
      >
        Logout
      </NavItem>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  isLogout?: boolean;
  slug: string;
}
const NavItem = ({
  icon,
  children,
  slug,
  isLogout = false,
  ...rest
}: NavItemProps) => {
  const params = useLocation();
  const lengthParams = params.pathname.split('/').length - 1;
  const activeUrl = params.pathname.split('/')[lengthParams] === slug;

  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
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
    </Link>
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

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
