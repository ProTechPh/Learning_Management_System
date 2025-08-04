import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { User } from '../types';

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'white');
  const textSecondaryColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');
  
  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Last Seen</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr 
              key={user.id}
              borderBottomWidth="1px"
              borderColor={borderColor}
              _hover={{ bg: hoverBgColor }}
              transition="background 0.2s"
            >
              <Td>
                <Flex align="center">
                  <Avatar size="md" src={user.avatar} name={user.name} mr={3} />
                  <Box>
                    <Text fontWeight="medium" color={textColor}>
                      {user.name}
                    </Text>
                    <Text fontSize="sm" color={textSecondaryColor}>
                      {user.id}
                    </Text>
                  </Box>
                </Flex>
              </Td>
              <Td>
                <Box
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="medium"
                  display="inline-block"
                  bg={
                    user.role === 'Staff' ? 'purple.100' :
                    user.role === 'Faculty' ? 'blue.100' :
                    'green.100'
                  }
                  color={
                    user.role === 'Staff' ? 'purple.600' :
                    user.role === 'Faculty' ? 'blue.600' :
                    'green.600'
                  }
                >
                  {user.role}
                </Box>
              </Td>
              <Td>
                <Flex align="center">
                  <Box
                    w="2"
                    h="2"
                    borderRadius="full"
                    bg={user.status === 'active' ? 'green.500' : 'gray.400'}
                    mr={2}
                  />
                  <Text fontSize="sm" color={textColor}>
                    {user.status}
                  </Text>
                </Flex>
              </Td>
              <Td>
                <Text fontSize="sm" color={textSecondaryColor}>
                  {user.lastSeen}
                </Text>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Button
                    p={2}
                    borderRadius="lg"
                    variant="ghost"
                    colorScheme="blue"
                    size="sm"
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    p={2}
                    borderRadius="lg"
                    variant="ghost"
                    colorScheme="yellow"
                    size="sm"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    p={2}
                    borderRadius="lg"
                    variant="ghost"
                    colorScheme="red"
                    size="sm"
                  >
                    <Trash2 size={16} />
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserTable;