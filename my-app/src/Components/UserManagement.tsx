import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Badge,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { Search, Plus, Edit, Trash2, MoreVertical, UserPlus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Teacher' | 'Student';
  status: 'Active' | 'Inactive';
  lastLogin: string;
  avatar: string;
  joinDate: string;
  department?: string;
  grade?: string;
}

const UserManagement: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const toast = useToast();

  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@school.edu',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2025-05-01 10:30 AM',
      avatar: 'https://bit.ly/dan-abramov',
      joinDate: '2024-01-15',
      department: 'Administration'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@school.edu',
      role: 'Teacher',
      status: 'Active',
      lastLogin: '2025-05-01 09:15 AM',
      avatar: 'https://bit.ly/kent-c-dodds',
      joinDate: '2024-02-20',
      department: 'Mathematics'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@student.school.edu',
      role: 'Student',
      status: 'Active',
      lastLogin: '2025-05-01 08:45 AM',
      avatar: 'https://bit.ly/ryan-florence',
      joinDate: '2024-09-01',
      grade: 'Grade 10'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@school.edu',
      role: 'Teacher',
      status: 'Inactive',
      lastLogin: '2025-04-28 02:20 PM',
      avatar: 'https://bit.ly/code-beast',
      joinDate: '2024-03-10',
      department: 'Science'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student' as User['role'],
    status: 'Active' as User['status'],
    department: '',
    grade: ''
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      lastLogin: 'Never',
      avatar: 'https://bit.ly/broken-link',
      joinDate: new Date().toISOString().split('T')[0],
      department: formData.role === 'Teacher' || formData.role === 'Admin' ? formData.department : undefined,
      grade: formData.role === 'Student' ? formData.grade : undefined
    };

    setUsers([...users, newUser]);
    setFormData({ name: '', email: '', role: 'Student', status: 'Active', department: '', grade: '' });
    onAddClose();
    toast({
      title: 'User Added',
      description: `${newUser.name} has been successfully added.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map(user =>
      user.id === selectedUser.id
        ? {
            ...user,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
            department: formData.role === 'Teacher' || formData.role === 'Admin' ? formData.department : undefined,
            grade: formData.role === 'Student' ? formData.grade : undefined
          }
        : user
    );

    setUsers(updatedUsers);
    setSelectedUser(null);
    setFormData({ name: '', email: '', role: 'Student', status: 'Active', department: '', grade: '' });
    onEditClose();
    toast({
      title: 'User Updated',
      description: `User information has been successfully updated.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setSelectedUser(null);
    onDeleteClose();
    toast({
      title: 'User Deleted',
      description: `User has been successfully removed.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department || '',
      grade: user.grade || ''
    });
    onEditOpen();
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'red';
      case 'Teacher': return 'blue';
      case 'Student': return 'green';
      default: return 'gray';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'Active' ? 'green' : 'red';
  };

  return (
    <Box ml={{ base: '16', sm: '20', md: '64' }} mt="16" p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="lg" color={textColor}>User Management</Heading>
          <Button
            leftIcon={<UserPlus size={20} />}
            colorScheme="blue"
            onClick={onAddOpen}
          >
            Add New User
          </Button>
        </Flex>

        {/* Filters and Search */}
        <Box bg={bgColor} p={4} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Flex gap={4} wrap="wrap">
            <InputGroup maxW="300px">
              <InputLeftElement>
                <Search size={20} color="gray" />
              </InputLeftElement>
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            
            <Select maxW="150px" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </Select>

            <Select maxW="150px" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </Flex>
        </Box>

        {/* Users Table */}
        <Box bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor} overflow="hidden">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Department/Grade</Th>
                <Th>Last Login</Th>
                <Th>Join Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <HStack spacing={3}>
                      <Avatar size="sm" src={user.avatar} name={user.name} />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">{user.name}</Text>
                        <Text fontSize="sm" color="gray.500">{user.email}</Text>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge colorScheme={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusBadgeColor(user.status)}>
                      {user.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {user.department || user.grade || '-'}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{user.lastLogin}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{user.joinDate}</Text>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<MoreVertical size={16} />}
                        variant="ghost"
                        size="sm"
                      />
                      <MenuList>
                        <MenuItem icon={<Edit size={16} />} onClick={() => openEditModal(user)}>
                          Edit User
                        </MenuItem>
                        <MenuItem 
                          icon={<Trash2 size={16} />} 
                          onClick={() => openDeleteModal(user)}
                          color="red.500"
                        >
                          Delete User
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Statistics */}
        <Flex gap={4} wrap="wrap">
          <Box bg={bgColor} p={4} borderRadius="lg" borderWidth="1px" borderColor={borderColor} flex="1" minW="200px">
            <Text fontSize="sm" color="gray.500">Total Users</Text>
            <Text fontSize="2xl" fontWeight="bold">{users.length}</Text>
          </Box>
          <Box bg={bgColor} p={4} borderRadius="lg" borderWidth="1px" borderColor={borderColor} flex="1" minW="200px">
            <Text fontSize="sm" color="gray.500">Active Users</Text>
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {users.filter(u => u.status === 'Active').length}
            </Text>
          </Box>
          <Box bg={bgColor} p={4} borderRadius="lg" borderWidth="1px" borderColor={borderColor} flex="1" minW="200px">
            <Text fontSize="sm" color="gray.500">Teachers</Text>
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              {users.filter(u => u.role === 'Teacher').length}
            </Text>
          </Box>
          <Box bg={bgColor} p={4} borderRadius="lg" borderWidth="1px" borderColor={borderColor} flex="1" minW="200px">
            <Text fontSize="sm" color="gray.500">Students</Text>
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {users.filter(u => u.role === 'Student').length}
            </Text>
          </Box>
        </Flex>
      </VStack>

      {/* Add User Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </FormControl>

              {(formData.role === 'Teacher' || formData.role === 'Admin') && (
                <FormControl>
                  <FormLabel>Department</FormLabel>
                  <Input
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Enter department"
                  />
                </FormControl>
              )}

              {formData.role === 'Student' && (
                <FormControl>
                  <FormLabel>Grade</FormLabel>
                  <Select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  >
                    <option value="">Select Grade</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </Select>
                </FormControl>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAddClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddUser}>
              Add User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </FormControl>

              {(formData.role === 'Teacher' || formData.role === 'Admin') && (
                <FormControl>
                  <FormLabel>Department</FormLabel>
                  <Input
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Enter department"
                  />
                </FormControl>
              )}

              {formData.role === 'Student' && (
                <FormControl>
                  <FormLabel>Grade</FormLabel>
                  <Select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  >
                    <option value="">Select Grade</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </Select>
                </FormControl>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onEditClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleEditUser}>
              Update User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={undefined} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteUser} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default UserManagement;
