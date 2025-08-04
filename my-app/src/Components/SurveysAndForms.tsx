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
  Textarea,
  Switch,
  useToast,
  Card,
  CardBody,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { Search, Plus, Edit, Trash2, MoreVertical, FileText, Users, BarChart3, Eye } from 'lucide-react';

interface Survey {
  id: string;
  title: string;
  description: string;
  type: 'Survey' | 'Quiz' | 'Feedback' | 'Assessment';
  status: 'Draft' | 'Active' | 'Closed';
  createdDate: string;
  responses: number;
  targetAudience: string;
  deadline?: string;
  questions: Question[];
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'text' | 'rating' | 'yes-no';
  question: string;
  options?: string[];
  required: boolean;
}

const SurveysAndForms: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const toast = useToast();

  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1',
      title: 'Student Satisfaction Survey',
      description: 'Quarterly survey to assess student satisfaction with courses and facilities',
      type: 'Survey',
      status: 'Active',
      createdDate: '2025-04-15',
      responses: 127,
      targetAudience: 'All Students',
      deadline: '2025-05-15',
      questions: [
        {
          id: '1',
          type: 'rating',
          question: 'How satisfied are you with the course content?',
          required: true
        },
        {
          id: '2',
          type: 'multiple-choice',
          question: 'Which aspect needs improvement?',
          options: ['Content Quality', 'Teaching Methods', 'Resources', 'Support'],
          required: false
        }
      ]
    },
    {
      id: '2',
      title: 'Mathematics Quiz - Chapter 5',
      description: 'Assessment quiz for Algebra fundamentals',
      type: 'Quiz',
      status: 'Active',
      createdDate: '2025-04-20',
      responses: 89,
      targetAudience: 'Grade 10 Students',
      deadline: '2025-05-05',
      questions: [
        {
          id: '1',
          type: 'multiple-choice',
          question: 'What is the value of x in 2x + 5 = 15?',
          options: ['5', '10', '15', '20'],
          required: true
        }
      ]
    },
    {
      id: '3',
      title: 'Teacher Performance Feedback',
      description: 'Anonymous feedback form for teacher evaluation',
      type: 'Feedback',
      status: 'Closed',
      createdDate: '2025-03-10',
      responses: 234,
      targetAudience: 'All Students',
      questions: []
    },
    {
      id: '4',
      title: 'Course Registration Interest',
      description: 'Survey to gauge interest in new course offerings',
      type: 'Survey',
      status: 'Draft',
      createdDate: '2025-04-25',
      responses: 0,
      targetAudience: 'All Students',
      questions: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Survey' as Survey['type'],
    targetAudience: '',
    deadline: ''
  });

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || survey.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || survey.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateSurvey = () => {
    const newSurvey: Survey = {
      id: (surveys.length + 1).toString(),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      status: 'Draft',
      createdDate: new Date().toISOString().split('T')[0],
      responses: 0,
      targetAudience: formData.targetAudience,
      deadline: formData.deadline || undefined,
      questions: []
    };

    setSurveys([...surveys, newSurvey]);
    setFormData({ title: '', description: '', type: 'Survey', targetAudience: '', deadline: '' });
    onCreateClose();
    toast({
      title: 'Survey Created',
      description: `${newSurvey.title} has been created successfully.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteSurvey = () => {
    if (!selectedSurvey) return;

    const updatedSurveys = surveys.filter(survey => survey.id !== selectedSurvey.id);
    setSurveys(updatedSurveys);
    setSelectedSurvey(null);
    onDeleteClose();
    toast({
      title: 'Survey Deleted',
      description: 'Survey has been successfully removed.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const toggleSurveyStatus = (surveyId: string) => {
    const updatedSurveys = surveys.map(survey => {
      if (survey.id === surveyId) {
        let newStatus: Survey['status'];
        if (survey.status === 'Draft') newStatus = 'Active';
        else if (survey.status === 'Active') newStatus = 'Closed';
        else newStatus = 'Draft';
        
        return { ...survey, status: newStatus };
      }
      return survey;
    });
    setSurveys(updatedSurveys);
  };

  const openViewModal = (survey: Survey) => {
    setSelectedSurvey(survey);
    onViewOpen();
  };

  const openDeleteModal = (survey: Survey) => {
    setSelectedSurvey(survey);
    onDeleteOpen();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Draft': return 'yellow';
      case 'Closed': return 'red';
      default: return 'gray';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Survey': return 'blue';
      case 'Quiz': return 'purple';
      case 'Feedback': return 'orange';
      case 'Assessment': return 'teal';
      default: return 'gray';
    }
  };

  const totalSurveys = surveys.length;
  const activeSurveys = surveys.filter(s => s.status === 'Active').length;
  const totalResponses = surveys.reduce((sum, survey) => sum + survey.responses, 0);
  const avgResponseRate = totalSurveys > 0 ? Math.round((totalResponses / totalSurveys) * 100) / 100 : 0;

  return (
    <Box ml={{ base: '16', sm: '20', md: '64' }} mt="16" p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="lg" color={textColor}>Surveys & Forms</Heading>
          <Button
            leftIcon={<Plus size={20} />}
            colorScheme="blue"
            onClick={onCreateOpen}
          >
            Create New Survey
          </Button>
        </Flex>

        {/* Statistics */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="blue.100" borderRadius="lg" mr={3}>
                    <FileText size={20} color="#3182CE" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Total Surveys</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{totalSurveys}</StatNumber>
                <StatHelpText>All time surveys created</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="green.100" borderRadius="lg" mr={3}>
                    <BarChart3 size={20} color="#38A169" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Active Surveys</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{activeSurveys}</StatNumber>
                <StatHelpText>Currently collecting responses</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="purple.100" borderRadius="lg" mr={3}>
                    <Users size={20} color="#9F7AEA" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Total Responses</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{totalResponses}</StatNumber>
                <StatHelpText>Responses collected</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="orange.100" borderRadius="lg" mr={3}>
                    <BarChart3 size={20} color="#D69E2E" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Avg Response Rate</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{avgResponseRate}</StatNumber>
                <StatHelpText>Responses per survey</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Filters and Search */}
        <Box bg={bgColor} p={4} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Flex gap={4} wrap="wrap">
            <InputGroup maxW="300px">
              <InputLeftElement>
                <Search size={20} color="gray" />
              </InputLeftElement>
              <Input
                placeholder="Search surveys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            
            <Select maxW="150px" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Survey">Survey</option>
              <option value="Quiz">Quiz</option>
              <option value="Feedback">Feedback</option>
              <option value="Assessment">Assessment</option>
            </Select>

            <Select maxW="150px" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </Select>
          </Flex>
        </Box>

        {/* Surveys Table */}
        <Box bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor} overflow="hidden">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Type</Th>
                <Th>Status</Th>
                <Th>Target Audience</Th>
                <Th>Responses</Th>
                <Th>Created</Th>
                <Th>Deadline</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredSurveys.map((survey) => (
                <Tr key={survey.id}>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="medium">{survey.title}</Text>
                      <Text fontSize="sm" color="gray.500" noOfLines={1}>
                        {survey.description}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Badge colorScheme={getTypeColor(survey.type)}>
                      {survey.type}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(survey.status)}>
                      {survey.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{survey.targetAudience}</Text>
                  </Td>
                  <Td>
                    <Text fontWeight="medium">{survey.responses}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{survey.createdDate}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{survey.deadline || 'No deadline'}</Text>
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
                        <MenuItem icon={<Eye size={16} />} onClick={() => openViewModal(survey)}>
                          View Details
                        </MenuItem>
                        <MenuItem icon={<Edit size={16} />}>
                          Edit Survey
                        </MenuItem>
                        <MenuItem onClick={() => toggleSurveyStatus(survey.id)}>
                          {survey.status === 'Draft' ? 'Activate' : 
                           survey.status === 'Active' ? 'Close' : 'Reopen'}
                        </MenuItem>
                        <MenuItem 
                          icon={<Trash2 size={16} />} 
                          onClick={() => openDeleteModal(survey)}
                          color="red.500"
                        >
                          Delete Survey
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>

      {/* Create Survey Modal */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Survey</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Survey Title</FormLabel>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter survey title"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter survey description"
                  rows={3}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Type</FormLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Survey['type'] })}
                >
                  <option value="Survey">Survey</option>
                  <option value="Quiz">Quiz</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Assessment">Assessment</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Target Audience</FormLabel>
                <Select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                >
                  <option value="">Select audience</option>
                  <option value="All Students">All Students</option>
                  <option value="Grade 9 Students">Grade 9 Students</option>
                  <option value="Grade 10 Students">Grade 10 Students</option>
                  <option value="Grade 11 Students">Grade 11 Students</option>
                  <option value="Grade 12 Students">Grade 12 Students</option>
                  <option value="All Teachers">All Teachers</option>
                  <option value="All Staff">All Staff</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Deadline (Optional)</FormLabel>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCreateClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleCreateSurvey}>
              Create Survey
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Survey Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedSurvey?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedSurvey && (
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="medium" mb={2}>Description</Text>
                  <Text color="gray.600">{selectedSurvey.description}</Text>
                </Box>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Type</Text>
                    <Badge colorScheme={getTypeColor(selectedSurvey.type)}>
                      {selectedSurvey.type}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Status</Text>
                    <Badge colorScheme={getStatusColor(selectedSurvey.status)}>
                      {selectedSurvey.status}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Target Audience</Text>
                    <Text>{selectedSurvey.targetAudience}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Responses</Text>
                    <Text>{selectedSurvey.responses}</Text>
                  </Box>
                </Grid>

                {selectedSurvey.questions.length > 0 && (
                  <Box>
                    <Text fontWeight="medium" mb={3}>Questions ({selectedSurvey.questions.length})</Text>
                    <VStack spacing={3} align="stretch">
                      {selectedSurvey.questions.map((question, index) => (
                        <Box key={question.id} p={3} bg="gray.50" borderRadius="md">
                          <Text fontWeight="medium" mb={2}>
                            {index + 1}. {question.question}
                            {question.required && <Text as="span" color="red.500"> *</Text>}
                          </Text>
                          <Text fontSize="sm" color="gray.500" mb={2}>
                            Type: {question.type}
                          </Text>
                          {question.options && (
                            <VStack align="start" spacing={1}>
                              {question.options.map((option, optIndex) => (
                                <Text key={optIndex} fontSize="sm">
                                  • {option}
                                </Text>
                              ))}
                            </VStack>
                          )}
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onViewClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={undefined} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Survey
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete "{selectedSurvey?.title}"? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteSurvey} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default SurveysAndForms;
