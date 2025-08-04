import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import {
  ClipboardList,
  Database,
  LayoutDashboard,
  Library,
  LucideIcon,
  LogOut,
  Settings,
  Store,
  Users
} from 'lucide-react';




export interface SidebarItemProps {
  icon: LucideIcon;
  text: string;
  key: string;
  active: boolean;
  onClick: () => void;
}
interface SidebarProps {
  activeTab: string;
  setActiveTab: (key: string) => void;
}

const Logo = () => {
  return (
    <Box py={4} display="flex" justifyContent="center">
      <Image
        src="../SCHOOL LOGO.png"
        alt="School Logo"
        w={{ base: '120px', md: '200px' }}
        h={{ base: '120px', md: '200px' }}
        objectFit="contain"
        fallback={
          <Box
            w={{ base: '120px', md: '200px' }}
            h={{ base: '120px', md: '200px' }}
            bg="gray.200"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.500">
              Logo
            </Text>
          </Box>
        }
      />
    </Box>
  );
};

const SidebarItem = ({ icon: Icon, text, key, active, onClick }: SidebarItemProps) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const activeColor = useColorModeValue('blue.600', 'blue.200');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Button
      variant="ghost"
      justifyContent="flex-start"
      width="full"
      py={3}
      px={3}
      borderRadius="xl"
      fontSize="md"
      fontWeight={active ? 'semibold' : 'medium'}
      leftIcon={<Icon size={20} />}
      bg={active ? activeBg : 'transparent'}
      color={active ? activeColor : textColor}
      _hover={{ bg: bgColor }}
      onClick={onClick}
    >
      <Text display={{ base: 'none', md: 'block' }}>{text}</Text>
      {active && (
        <Box ml="auto" w="6px" h="6px" borderRadius="full" bg={activeColor} />
      )}
    </Button>
  );
};

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const statsBgColor = useColorModeValue('gray.50', 'gray.700');

  const sidebarItems = [
    { icon: LayoutDashboard, text: 'Dashboard', key: 'dashboard' },
    { icon: Users, text: 'User Management', key: 'users' },
    { icon: Database, text: 'Data Analytics', key: 'data' },
    { icon: ClipboardList, text: 'Surveys & Forms', key: 'surveys' },
    { icon: Library, text: 'Resource Library', key: 'library' },
    { icon: Store, text: 'Marketplace', key: 'market' },
    { icon: Settings, text: 'System Settings', key: 'settings' }
  ];

  return (
    <Box
      as="aside"
      position="fixed"
      left={0}
      top={0}
      w={{ base: '16', sm: '20', md: '64' }}
      h="100vh"
      borderRightWidth="1px"
      borderColor={borderColor}
      bg={bgColor}
      zIndex={10}
    >
      <Flex direction="column" h="full">
        <Box px={{ base: 2, md: 4 }}>
          <Logo />
        </Box>

        <Box px={{ base: 2, md: 4 }} flex={1} overflowY="auto">
          <Stack spacing={1}>
            {sidebarItems.map(item => (
              <SidebarItem
                key={item.key}
                icon={item.icon}
                text={item.text}
                active={activeTab === item.key}
                onClick={() => setActiveTab(item.key)}
              />
            ))}
          </Stack>
        </Box>

        <Box px={{ base: 2, md: 4 }} pb={4}>
          <Stack spacing={4}>
            <Box
              p={3}
              borderRadius="xl"
              bg={statsBgColor}
              borderWidth="1px"
              borderColor={borderColor}
              display={{ base: 'none', md: 'block' }}
            >
              <Text fontWeight="medium" mb={2} color={textColor} fontSize="sm">
                Quick Stats
              </Text>
              <Stack spacing={2}>
                <Flex justify="space-between">
                  <Text fontSize="xs" color={useColorModeValue('gray.600', 'gray.400')}>
                    Online Users
                  </Text>
                  <Text fontSize="xs" fontWeight="bold" color="green.500">
                    127
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="xs" color={useColorModeValue('gray.600', 'gray.400')}>
                    System Health
                  </Text>
                  <Text fontSize="xs" fontWeight="bold" color="green.500">
                    98%
                  </Text>
                </Flex>
              </Stack>
            </Box>

            <Button
              leftIcon={<LogOut size={18} />}
              colorScheme="red"
              variant="ghost"
              justifyContent="flex-start"
              borderRadius="xl"
              size="sm"
              fontSize="sm"
            >
              <Text display={{ base: 'none', md: 'block' }}>Sign Out</Text>
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
