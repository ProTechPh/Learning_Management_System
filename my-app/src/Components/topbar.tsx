import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Avatar,
  Text,
  useColorMode,
  useColorModeValue,
  Badge,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  HStack,
  Divider,
  Circle,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Search, Sun, Moon, Bell, LogOut } from 'lucide-react';
import { FC } from 'react';
import zuhar from '../jericko.jpg'; 

interface TopBarProps {
  notifications: any;
  setNotifications: (notifications: any) => void;
}

const TopBar: FC<TopBarProps> = ({ notifications, setNotifications }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      right={0}
      left="64"
      h="16"
      px={8}
      borderBottomWidth="1px"
      borderColor={borderColor}
      bg={bgColor}
      align="center"
      zIndex={10}
    >
      <Box>
        <Text fontSize="lg" fontWeight={600} color={textColor}>
          Dashboard
        </Text>
      </Box>

      <Spacer />

      <Flex align="center" gap={5} minW={0}>
        <InputGroup maxW="xs">
          <InputLeftElement pointerEvents="none">
            <Search size={16} aria-hidden="true" />
          </InputLeftElement>
          <Input placeholder="Search here" size="sm" rounded="md" aria-label="Search input" />
        </InputGroup>

        <Menu placement="bottom-end">
          <Box position="relative">
            <MenuButton
              as={IconButton}
              aria-label="Notifications"
              icon={<Bell size={16} />}
              variant="ghost"
              size="sm"
              borderRadius="full"
              color={useColorModeValue('gray.600', 'gray.400')}
              _hover={{
                bg: hoverBg,
                color: useColorModeValue('gray.800', 'gray.200'),
              }}
            />
            <Badge
              position="absolute"
              top="-2px"
              right="-2px"
              colorScheme="red"
              borderRadius="full"
              fontSize="2xs"
              minW="16px"
              h="16px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              border="1px solid"
              borderColor={bgColor}
              pointerEvents="none"
            >
              {notifications?.filter((n: any) => n.unread)?.length || 3}
            </Badge>
          </Box>
          <MenuList maxW="400px" minW="350px" maxH="400px" overflowY="auto" zIndex={20}>
            <Box p={3} borderBottom="1px solid" borderColor={borderColor}>
              <Text fontSize="md" fontWeight="600" color={textColor}>
                Notifications
              </Text>
            </Box>
            <VStack spacing={0} align="stretch">
              {notifications && notifications.length > 0 ? (
                notifications.map((notification: any, index: number) => (
                  <Box key={notification.id || index}>
                    <MenuItem
                      p={4}
                      _hover={{ bg: hoverBg }}
                      _focus={{ bg: hoverBg }}
                      whiteSpace="normal"
                      minH="auto"
                    >
                      <HStack spacing={3} align="flex-start" w="full">
                        {notification.unread && (
                          <Circle size="8px" bg="blue.500" mt={2} flexShrink={0} />
                        )}
                        <VStack spacing={1} align="flex-start" flex={1} minW={0}>
                          <Text
                            fontSize="sm"
                            fontWeight={notification.unread ? "600" : "500"}
                            color={textColor}
                            noOfLines={2}
                          >
                            {notification.title || notification.message}
                          </Text>
                          {notification.title && (
                            <Text
                              fontSize="xs"
                              color={useColorModeValue('gray.600', 'gray.400')}
                              noOfLines={2}
                            >
                              {notification.message}
                            </Text>
                          )}
                          <Text
                            fontSize="xs"
                            color={useColorModeValue('gray.500', 'gray.500')}
                          >
                            {notification.time}
                          </Text>
                        </VStack>
                      </HStack>
                    </MenuItem>
                    {index < notifications.length - 1 && (
                      <Divider borderColor={borderColor} />
                    )}
                  </Box>
                ))
              ) : (
                <MenuItem p={4} cursor="default" _hover={{}} _focus={{}}>
                  <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                    No notifications
                  </Text>
                </MenuItem>
              )}
            </VStack>
            {notifications && notifications.length > 0 && (
              <MenuItem
                p={3}
                borderTop="1px solid"
                borderColor={borderColor}
                _hover={{ bg: hoverBg }}
                _focus={{ bg: hoverBg }}
                onClick={() => {
                  // Handle view all notifications click
                  console.log('View all notifications clicked');
                  // You can add navigation logic here later
                }}
              >
                <Text
                  fontSize="sm"
                  color={useColorModeValue('blue.500', 'blue.300')}
                  textAlign="center"
                  w="full"
                  _hover={{ textDecoration: 'underline' }}
                >
                  View all notifications
                </Text>
              </MenuItem>
            )}
          </MenuList>
        </Menu>

        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          onClick={toggleColorMode}
          variant="ghost"
          size="sm"
        />

        <Box minW={0}>
          <Menu placement="bottom-end">
            <MenuButton
              as={Flex}
              align="center"
              cursor="pointer"
              px={3}          
              py={1}
              borderRadius="md"
              _hover={{ bg: hoverBg }}
              gap={2}
              userSelect="none"
              whiteSpace="nowrap" 
              minW="fit-content"  
              maxW="200px"        
            >
              <Avatar size="sm" name="Zuhar Ahamed" src={zuhar} />
              <ChevronDownIcon boxSize={4} color={useColorModeValue('gray.600', 'gray.300')} />
            </MenuButton>
            <MenuList minW="150px" zIndex={20}>
              <MenuItem icon={<LogOut size={16} />} color="red.500">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Flex>
  );
};

export default TopBar;
