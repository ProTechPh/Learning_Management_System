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
  Grid,
  GridItem,
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
  Text,
  useToast,
  Card,
  CardBody,
  Image,
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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
} from '@chakra-ui/react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  Download, 
  Eye,
  Upload,
  BookOpen,
  Play,
  File
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'Document' | 'Video' | 'Image' | 'Audio' | 'Presentation' | 'Other';
  category: string;
  subject: string;
  grade: string;
  uploadDate: string;
  fileSize: string;
  downloads: number;
  views: number;
  uploadedBy: string;
  tags: string[];
  thumbnail?: string;
  fileUrl: string;
}

const ResourceLibrary: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const toast = useToast();

  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Introduction to Algebra',
      description: 'Comprehensive guide covering basic algebraic concepts and operations',
      type: 'Document',
      category: 'Textbook',
      subject: 'Mathematics',
      grade: 'Grade 9',
      uploadDate: '2025-04-15',
      fileSize: '2.5 MB',
      downloads: 145,
      views: 289,
      uploadedBy: 'Dr. Smith',
      tags: ['algebra', 'mathematics', 'basics'],
      thumbnail: 'https://via.placeholder.com/150x200/3182CE/white?text=PDF',
      fileUrl: '/resources/algebra-intro.pdf'
    },
    {
      id: '2',
      title: 'Photosynthesis Process',
      description: 'Educational video explaining the process of photosynthesis in plants',
      type: 'Video',
      category: 'Educational Video',
      subject: 'Biology',
      grade: 'Grade 10',
      uploadDate: '2025-04-18',
      fileSize: '125 MB',
      downloads: 89,
      views: 234,
      uploadedBy: 'Prof. Johnson',
      tags: ['biology', 'photosynthesis', 'plants'],
      thumbnail: 'https://via.placeholder.com/150x100/38A169/white?text=VIDEO',
      fileUrl: '/resources/photosynthesis.mp4'
    },
    {
      id: '3',
      title: 'World War II Timeline',
      description: 'Interactive presentation covering major events of World War II',
      type: 'Presentation',
      category: 'Presentation',
      subject: 'History',
      grade: 'Grade 11',
      uploadDate: '2025-04-20',
      fileSize: '8.3 MB',
      downloads: 67,
      views: 156,
      uploadedBy: 'Ms. Davis',
      tags: ['history', 'world war', 'timeline'],
      thumbnail: 'https://via.placeholder.com/150x100/D69E2E/white?text=PPT',
      fileUrl: '/resources/wwii-timeline.pptx'
    },
    {
      id: '4',
      title: 'Chemical Reactions Lab Manual',
      description: 'Step-by-step guide for conducting chemistry experiments safely',
      type: 'Document',
      category: 'Lab Manual',
      subject: 'Chemistry',
      grade: 'Grade 12',
      uploadDate: '2025-04-22',
      fileSize: '4.1 MB',
      downloads: 112,
      views: 198,
      uploadedBy: 'Dr. Wilson',
      tags: ['chemistry', 'lab', 'experiments'],
      thumbnail: 'https://via.placeholder.com/150x200/9F7AEA/white?text=PDF',
      fileUrl: '/resources/chem-lab-manual.pdf'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Document' as Resource['type'],
    category: '',
    subject: '',
    grade: '',
    tags: ''
  });

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'All' || resource.type === typeFilter;
    const matchesSubject = subjectFilter === 'All' || resource.subject === subjectFilter;
    const matchesGrade = gradeFilter === 'All' || resource.grade === gradeFilter;
    return matchesSearch && matchesType && matchesSubject && matchesGrade;
  });

  const handleUploadResource = () => {
    const newResource: Resource = {
      id: (resources.length + 1).toString(),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      category: formData.category,
      subject: formData.subject,
      grade: formData.grade,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '1.2 MB', // Mock file size
      downloads: 0,
      views: 0,
      uploadedBy: 'Current User',
      tags: formData.tags.split(',').map(tag => tag.trim()),
      thumbnail: `https://via.placeholder.com/150x200/3182CE/white?text=${formData.type.toUpperCase()}`,
      fileUrl: `/resources/${formData.title.toLowerCase().replace(/\s+/g, '-')}`
    };

    setResources([...resources, newResource]);
    setFormData({ title: '', description: '', type: 'Document', category: '', subject: '', grade: '', tags: '' });
    onUploadClose();
    toast({
      title: 'Resource Uploaded',
      description: `${newResource.title} has been uploaded successfully.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteResource = () => {
    if (!selectedResource) return;

    const updatedResources = resources.filter(resource => resource.id !== selectedResource.id);
    setResources(updatedResources);
    setSelectedResource(null);
    onDeleteClose();
    toast({
      title: 'Resource Deleted',
      description: 'Resource has been successfully removed.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDownload = (resource: Resource) => {
    // Increment download count
    const updatedResources = resources.map(r => 
      r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r
    );
    setResources(updatedResources);
    
    toast({
      title: 'Download Started',
      description: `Downloading ${resource.title}...`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleView = (resource: Resource) => {
    // Increment view count
    const updatedResources = resources.map(r => 
      r.id === resource.id ? { ...r, views: r.views + 1 } : r
    );
    setResources(updatedResources);
    setSelectedResource(resource);
    onViewOpen();
  };

  const openDeleteModal = (resource: Resource) => {
    setSelectedResource(resource);
    onDeleteOpen();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Document': return <FileText size={20} />;
      case 'Video': return <Video size={20} />;
      case 'Image': return <ImageIcon size={20} />;
      case 'Presentation': return <BookOpen size={20} />;
      default: return <File size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Document': return 'blue';
      case 'Video': return 'green';
      case 'Image': return 'purple';
      case 'Presentation': return 'orange';
      case 'Audio': return 'pink';
      default: return 'gray';
    }
  };

  const totalResources = resources.length;
  const totalDownloads = resources.reduce((sum, resource) => sum + resource.downloads, 0);
  const totalViews = resources.reduce((sum, resource) => sum + resource.views, 0);
  const avgRating = 4.2; // Mock average rating

  return (
    <Box ml={{ base: '16', sm: '20', md: '64' }} mt="16" p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="lg" color={textColor}>Resource Library</Heading>
          <HStack>
            <Button
              variant={viewMode === 'grid' ? 'solid' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'solid' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
            <Button
              leftIcon={<Upload size={20} />}
              colorScheme="blue"
              onClick={onUploadOpen}
            >
              Upload Resource
            </Button>
          </HStack>
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
                  <StatLabel fontSize="sm" color="gray.500">Total Resources</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{totalResources}</StatNumber>
                <StatHelpText>Available in library</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="green.100" borderRadius="lg" mr={3}>
                    <Download size={20} color="#38A169" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Total Downloads</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{totalDownloads}</StatNumber>
                <StatHelpText>Resources downloaded</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="purple.100" borderRadius="lg" mr={3}>
                    <Eye size={20} color="#9F7AEA" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Total Views</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{totalViews}</StatNumber>
                <StatHelpText>Resource views</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="orange.100" borderRadius="lg" mr={3}>
                    <BookOpen size={20} color="#D69E2E" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Avg Rating</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{avgRating}</StatNumber>
                <StatHelpText>Out of 5.0</StatHelpText>
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
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            
            <Select maxW="150px" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Document">Document</option>
              <option value="Video">Video</option>
              <option value="Image">Image</option>
              <option value="Presentation">Presentation</option>
              <option value="Audio">Audio</option>
            </Select>

            <Select maxW="150px" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
              <option value="All">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Biology">Biology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Physics">Physics</option>
              <option value="History">History</option>
              <option value="English">English</option>
            </Select>

            <Select maxW="150px" value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)}>
              <option value="All">All Grades</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </Select>
          </Flex>
        </Box>

        {/* Resources Display */}
        {viewMode === 'grid' ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
            {filteredResources.map((resource) => (
              <Card key={resource.id} cursor="pointer" _hover={{ shadow: 'lg' }}>
                <CardBody>
                  <VStack spacing={3}>
                    <Image
                      src={resource.thumbnail}
                      alt={resource.title}
                      w="full"
                      h="120px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    
                    <VStack spacing={2} align="start" w="full">
                      <HStack justify="space-between" w="full">
                        <Badge colorScheme={getTypeColor(resource.type)} size="sm">
                          {resource.type}
                        </Badge>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<MoreVertical size={16} />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem icon={<Eye size={16} />} onClick={() => handleView(resource)}>
                              View Details
                            </MenuItem>
                            <MenuItem icon={<Download size={16} />} onClick={() => handleDownload(resource)}>
                              Download
                            </MenuItem>
                            <MenuItem icon={<Edit size={16} />}>
                              Edit Resource
                            </MenuItem>
                            <MenuItem 
                              icon={<Trash2 size={16} />} 
                              onClick={() => openDeleteModal(resource)}
                              color="red.500"
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </HStack>

                      <Text fontWeight="medium" fontSize="sm" noOfLines={2}>
                        {resource.title}
                      </Text>
                      
                      <Text fontSize="xs" color="gray.500" noOfLines={2}>
                        {resource.description}
                      </Text>

                      <HStack justify="space-between" w="full" fontSize="xs" color="gray.500">
                        <Text>{resource.subject}</Text>
                        <Text>{resource.grade}</Text>
                      </HStack>

                      <HStack justify="space-between" w="full" fontSize="xs" color="gray.500">
                        <HStack>
                          <Eye size={12} />
                          <Text>{resource.views}</Text>
                        </HStack>
                        <HStack>
                          <Download size={12} />
                          <Text>{resource.downloads}</Text>
                        </HStack>
                        <Text>{resource.fileSize}</Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Box bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor} overflow="hidden">
            <VStack spacing={0} align="stretch">
              {filteredResources.map((resource, index) => (
                <Box
                  key={resource.id}
                  p={4}
                  borderBottomWidth={index < filteredResources.length - 1 ? "1px" : "0"}
                  borderColor={borderColor}
                  _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                >
                  <Flex align="center" gap={4}>
                    <Box p={2} bg={`${getTypeColor(resource.type)}.100`} borderRadius="lg">
                      {getTypeIcon(resource.type)}
                    </Box>
                    
                    <VStack align="start" spacing={1} flex="1">
                      <Text fontWeight="medium">{resource.title}</Text>
                      <Text fontSize="sm" color="gray.500" noOfLines={1}>
                        {resource.description}
                      </Text>
                      <HStack spacing={4} fontSize="xs" color="gray.500">
                        <Text>{resource.subject} • {resource.grade}</Text>
                        <Text>{resource.fileSize}</Text>
                        <Text>{resource.uploadDate}</Text>
                      </HStack>
                    </VStack>

                    <VStack align="end" spacing={1}>
                      <HStack spacing={4} fontSize="sm" color="gray.500">
                        <HStack>
                          <Eye size={14} />
                          <Text>{resource.views}</Text>
                        </HStack>
                        <HStack>
                          <Download size={14} />
                          <Text>{resource.downloads}</Text>
                        </HStack>
                      </HStack>
                      <Badge colorScheme={getTypeColor(resource.type)} size="sm">
                        {resource.type}
                      </Badge>
                    </VStack>

                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<MoreVertical size={16} />}
                        variant="ghost"
                        size="sm"
                      />
                      <MenuList>
                        <MenuItem icon={<Eye size={16} />} onClick={() => handleView(resource)}>
                          View Details
                        </MenuItem>
                        <MenuItem icon={<Download size={16} />} onClick={() => handleDownload(resource)}>
                          Download
                        </MenuItem>
                        <MenuItem icon={<Edit size={16} />}>
                          Edit Resource
                        </MenuItem>
                        <MenuItem 
                          icon={<Trash2 size={16} />} 
                          onClick={() => openDeleteModal(resource)}
                          color="red.500"
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>

      {/* Upload Resource Modal */}
      <Modal isOpen={isUploadOpen} onClose={onUploadClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload New Resource</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Resource Title</FormLabel>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter resource title"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter resource description"
                />
              </FormControl>

              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Resource['type'] })}
                  >
                    <option value="Document">Document</option>
                    <option value="Video">Video</option>
                    <option value="Image">Image</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Audio">Audio</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Textbook, Lab Manual"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Subject</FormLabel>
                  <Select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="">Select subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Biology">Biology</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Physics">Physics</option>
                    <option value="History">History</option>
                    <option value="English">English</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Grade Level</FormLabel>
                  <Select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  >
                    <option value="">Select grade</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </Select>
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel>Tags (comma-separated)</FormLabel>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., algebra, basics, mathematics"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Upload File</FormLabel>
                <Input type="file" accept="*/*" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onUploadClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleUploadResource}>
              Upload Resource
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Resource Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedResource?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedResource && (
              <VStack spacing={4} align="stretch">
                <Image
                  src={selectedResource.thumbnail}
                  alt={selectedResource.title}
                  w="full"
                  h="200px"
                  objectFit="cover"
                  borderRadius="md"
                />

                <Text color="gray.600">{selectedResource.description}</Text>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Type</Text>
                    <Badge colorScheme={getTypeColor(selectedResource.type)}>
                      {selectedResource.type}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Category</Text>
                    <Text>{selectedResource.category}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Subject</Text>
                    <Text>{selectedResource.subject}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Grade Level</Text>
                    <Text>{selectedResource.grade}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>File Size</Text>
                    <Text>{selectedResource.fileSize}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Upload Date</Text>
                    <Text>{selectedResource.uploadDate}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Views</Text>
                    <Text>{selectedResource.views}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Downloads</Text>
                    <Text>{selectedResource.downloads}</Text>
                  </Box>
                </Grid>

                <Box>
                  <Text fontWeight="medium" mb={2}>Tags</Text>
                  <HStack wrap="wrap">
                    {selectedResource.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" colorScheme="blue">
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                </Box>

                <Text fontSize="sm" color="gray.500">
                  Uploaded by: {selectedResource.uploadedBy}
                </Text>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onViewClose}>
              Close
            </Button>
            <Button 
              colorScheme="blue" 
              leftIcon={<Download size={16} />}
              onClick={() => selectedResource && handleDownload(selectedResource)}
            >
              Download
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={undefined} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Resource
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete "{selectedResource?.title}"? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteResource} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ResourceLibrary;
