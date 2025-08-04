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
  SimpleGrid,
  Avatar,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
} from '@chakra-ui/react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical, 
  ShoppingCart, 
  Star, 
  Eye,
  DollarSign,
  Package,
  TrendingUp,
  Users,
  Heart,
  Share2
} from 'lucide-react';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: 'Course' | 'Book' | 'Software' | 'Equipment' | 'Service';
  price: number;
  currency: string;
  seller: {
    name: string;
    avatar: string;
    rating: number;
    totalSales: number;
  };
  images: string[];
  rating: number;
  reviews: number;
  purchases: number;
  tags: string[];
  availability: 'Available' | 'Out of Stock' | 'Pre-order';
  createdDate: string;
  featured: boolean;
}

const Marketplace: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const toast = useToast();

  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const [items, setItems] = useState<MarketplaceItem[]>([
    {
      id: '1',
      title: 'Advanced Mathematics Course Bundle',
      description: 'Comprehensive mathematics course covering calculus, algebra, and statistics with interactive exercises',
      category: 'Course',
      price: 149.99,
      currency: 'USD',
      seller: {
        name: 'Dr. Sarah Johnson',
        avatar: 'https://bit.ly/sage-adebayo',
        rating: 4.8,
        totalSales: 234
      },
      images: ['https://via.placeholder.com/300x200/3182CE/white?text=Math+Course'],
      rating: 4.7,
      reviews: 89,
      purchases: 156,
      tags: ['mathematics', 'calculus', 'algebra', 'statistics'],
      availability: 'Available',
      createdDate: '2025-04-10',
      featured: true
    },
    {
      id: '2',
      title: 'Chemistry Lab Equipment Set',
      description: 'Complete chemistry laboratory equipment set for high school experiments',
      category: 'Equipment',
      price: 299.99,
      currency: 'USD',
      seller: {
        name: 'EduSupply Co.',
        avatar: 'https://bit.ly/dan-abramov',
        rating: 4.6,
        totalSales: 89
      },
      images: ['https://via.placeholder.com/300x200/38A169/white?text=Lab+Equipment'],
      rating: 4.5,
      reviews: 34,
      purchases: 67,
      tags: ['chemistry', 'lab', 'equipment', 'experiments'],
      availability: 'Available',
      createdDate: '2025-04-12',
      featured: false
    },
    {
      id: '3',
      title: 'Digital Art & Design Software License',
      description: 'Professional digital art software with educational discount for students and teachers',
      category: 'Software',
      price: 89.99,
      currency: 'USD',
      seller: {
        name: 'CreativeTools Inc.',
        avatar: 'https://bit.ly/kent-c-dodds',
        rating: 4.9,
        totalSales: 567
      },
      images: ['https://via.placeholder.com/300x200/9F7AEA/white?text=Art+Software'],
      rating: 4.8,
      reviews: 123,
      purchases: 289,
      tags: ['art', 'design', 'software', 'creative'],
      availability: 'Available',
      createdDate: '2025-04-15',
      featured: true
    },
    {
      id: '4',
      title: 'World History Textbook Collection',
      description: 'Complete set of world history textbooks covering ancient to modern times',
      category: 'Book',
      price: 199.99,
      currency: 'USD',
      seller: {
        name: 'Academic Press',
        avatar: 'https://bit.ly/ryan-florence',
        rating: 4.4,
        totalSales: 145
      },
      images: ['https://via.placeholder.com/300x200/D69E2E/white?text=History+Books'],
      rating: 4.3,
      reviews: 67,
      purchases: 98,
      tags: ['history', 'textbook', 'education', 'reference'],
      availability: 'Available',
      createdDate: '2025-04-18',
      featured: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Course' as MarketplaceItem['category'],
    price: 0,
    tags: ''
  });

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    
    let matchesPrice = true;
    if (priceRange === 'Under $50') matchesPrice = item.price < 50;
    else if (priceRange === '$50-$100') matchesPrice = item.price >= 50 && item.price <= 100;
    else if (priceRange === '$100-$200') matchesPrice = item.price >= 100 && item.price <= 200;
    else if (priceRange === 'Over $200') matchesPrice = item.price > 200;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'popular': return b.purchases - a.purchases;
      case 'newest': return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      default: return b.featured ? 1 : -1;
    }
  });

  const handleAddItem = () => {
    const newItem: MarketplaceItem = {
      id: (items.length + 1).toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      currency: 'USD',
      seller: {
        name: 'Current User',
        avatar: 'https://bit.ly/broken-link',
        rating: 5.0,
        totalSales: 0
      },
      images: [`https://via.placeholder.com/300x200/3182CE/white?text=${formData.category}`],
      rating: 0,
      reviews: 0,
      purchases: 0,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      availability: 'Available',
      createdDate: new Date().toISOString().split('T')[0],
      featured: false
    };

    setItems([...items, newItem]);
    setFormData({ title: '', description: '', category: 'Course', price: 0, tags: '' });
    onAddClose();
    toast({
      title: 'Item Listed',
      description: `${newItem.title} has been added to the marketplace.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteItem = () => {
    if (!selectedItem) return;

    const updatedItems = items.filter(item => item.id !== selectedItem.id);
    setItems(updatedItems);
    setSelectedItem(null);
    onDeleteClose();
    toast({
      title: 'Item Removed',
      description: 'Item has been successfully removed from the marketplace.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePurchase = (item: MarketplaceItem) => {
    const updatedItems = items.map(i => 
      i.id === item.id ? { ...i, purchases: i.purchases + 1 } : i
    );
    setItems(updatedItems);
    
    toast({
      title: 'Purchase Successful',
      description: `You have successfully purchased ${item.title}!`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const openViewModal = (item: MarketplaceItem) => {
    setSelectedItem(item);
    onViewOpen();
  };

  const openDeleteModal = (item: MarketplaceItem) => {
    setSelectedItem(item);
    onDeleteOpen();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Course': return 'blue';
      case 'Book': return 'green';
      case 'Software': return 'purple';
      case 'Equipment': return 'orange';
      case 'Service': return 'teal';
      default: return 'gray';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < Math.floor(rating) ? '#FBD38D' : 'none'}
        color="#FBD38D"
      />
    ));
  };

  const totalItems = items.length;
  const totalSales = items.reduce((sum, item) => sum + item.purchases, 0);
  const avgPrice = items.reduce((sum, item) => sum + item.price, 0) / items.length;
  const featuredItems = items.filter(item => item.featured).length;

  return (
    <Box ml={{ base: '16', sm: '20', md: '64' }} mt="16" p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="lg" color={textColor}>Marketplace</Heading>
          <Button
            leftIcon={<Plus size={20} />}
            colorScheme="blue"
            onClick={onAddOpen}
          >
            List New Item
          </Button>
        </Flex>

        {/* Statistics */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="blue.100" borderRadius="lg" mr={3}>
                    <Package size={20} color="#3182CE" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Total Items</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{totalItems}</StatNumber>
                <StatHelpText>Listed in marketplace</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="green.100" borderRadius="lg" mr={3}>
                    <ShoppingCart size={20} color="#38A169" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Total Sales</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{totalSales}</StatNumber>
                <StatHelpText>Items purchased</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="purple.100" borderRadius="lg" mr={3}>
                    <DollarSign size={20} color="#9F7AEA" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Average Price</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">${avgPrice.toFixed(0)}</StatNumber>
                <StatHelpText>Per item</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="orange.100" borderRadius="lg" mr={3}>
                    <TrendingUp size={20} color="#D69E2E" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Featured Items</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{featuredItems}</StatNumber>
                <StatHelpText>Promoted listings</StatHelpText>
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
                placeholder="Search marketplace..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            
            <Select maxW="150px" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Course">Course</option>
              <option value="Book">Book</option>
              <option value="Software">Software</option>
              <option value="Equipment">Equipment</option>
              <option value="Service">Service</option>
            </Select>

            <Select maxW="150px" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="All">All Prices</option>
              <option value="Under $50">Under $50</option>
              <option value="$50-$100">$50-$100</option>
              <option value="$100-$200">$100-$200</option>
              <option value="Over $200">Over $200</option>
            </Select>

            <Select maxW="150px" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </Select>
          </Flex>
        </Box>

        {/* Items Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
          {sortedItems.map((item) => (
            <Card key={item.id} cursor="pointer" _hover={{ shadow: 'lg' }} position="relative">
              {item.featured && (
                <Badge
                  position="absolute"
                  top={2}
                  right={2}
                  colorScheme="yellow"
                  variant="solid"
                  zIndex={1}
                >
                  Featured
                </Badge>
              )}
              
              <CardBody>
                <VStack spacing={3}>
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    w="full"
                    h="150px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  
                  <VStack spacing={2} align="start" w="full">
                    <HStack justify="space-between" w="full">
                      <Badge colorScheme={getCategoryColor(item.category)} size="sm">
                        {item.category}
                      </Badge>
                      <HStack spacing={1}>
                        {renderStars(item.rating)}
                        <Text fontSize="xs" color="gray.500">({item.reviews})</Text>
                      </HStack>
                    </HStack>

                    <Text fontWeight="medium" fontSize="sm" noOfLines={2}>
                      {item.title}
                    </Text>
                    
                    <Text fontSize="xs" color="gray.500" noOfLines={2}>
                      {item.description}
                    </Text>

                    <HStack justify="space-between" w="full">
                      <Text fontSize="lg" fontWeight="bold" color="green.500">
                        ${item.price}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {item.purchases} sold
                      </Text>
                    </HStack>

                    <HStack justify="space-between" w="full">
                      <HStack spacing={2}>
                        <Avatar size="xs" src={item.seller.avatar} name={item.seller.name} />
                        <Text fontSize="xs" color="gray.500" noOfLines={1}>
                          {item.seller.name}
                        </Text>
                      </HStack>
                      <HStack spacing={1}>
                        {renderStars(item.seller.rating)}
                      </HStack>
                    </HStack>

                    <HStack w="full" spacing={2}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        flex="1"
                        onClick={() => handlePurchase(item)}
                      >
                        Purchase
                      </Button>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        icon={<Eye size={16} />}
                        aria-label="View details"
                        onClick={() => openViewModal(item)}
                      />
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<MoreVertical size={16} />}
                          variant="ghost"
                          size="sm"
                        />
                        <MenuList>
                          <MenuItem icon={<Heart size={16} />}>
                            Add to Wishlist
                          </MenuItem>
                          <MenuItem icon={<Share2 size={16} />}>
                            Share Item
                          </MenuItem>
                          <MenuItem icon={<Edit size={16} />}>
                            Edit Listing
                          </MenuItem>
                          <MenuItem 
                            icon={<Trash2 size={16} />} 
                            onClick={() => openDeleteModal(item)}
                            color="red.500"
                          >
                            Remove Listing
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </HStack>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>

      {/* Add Item Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>List New Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Item Title</FormLabel>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter item title"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter item description"
                  rows={3}
                />
              </FormControl>

              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as MarketplaceItem['category'] })}
                  >
                    <option value="Course">Course</option>
                    <option value="Book">Book</option>
                    <option value="Software">Software</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Service">Service</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Price (USD)</FormLabel>
                  <NumberInput
                    value={formData.price}
                    onChange={(_, value) => setFormData({ ...formData, price: value })}
                    min={0}
                    precision={2}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel>Tags (comma-separated)</FormLabel>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., mathematics, course, education"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Upload Images</FormLabel>
                <Input type="file" accept="image/*" multiple />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAddClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddItem}>
              List Item
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Item Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedItem?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedItem && (
              <VStack spacing={4} align="stretch">
                <Image
                  src={selectedItem.images[0]}
                  alt={selectedItem.title}
                  w="full"
                  h="250px"
                  objectFit="cover"
                  borderRadius="md"
                />

                <HStack justify="space-between">
                  <Badge colorScheme={getCategoryColor(selectedItem.category)} size="lg">
                    {selectedItem.category}
                  </Badge>
                  <Text fontSize="2xl" fontWeight="bold" color="green.500">
                    ${selectedItem.price}
                  </Text>
                </HStack>

                <Text color="gray.600">{selectedItem.description}</Text>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Rating</Text>
                    <HStack>
                      {renderStars(selectedItem.rating)}
                      <Text fontSize="sm" color="gray.500">
                        ({selectedItem.reviews} reviews)
                      </Text>
                    </HStack>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Purchases</Text>
                    <Text>{selectedItem.purchases} sold</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Availability</Text>
                    <Badge colorScheme={selectedItem.availability === 'Available' ? 'green' : 'red'}>
                      {selectedItem.availability}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Listed Date</Text>
                    <Text>{selectedItem.createdDate}</Text>
                  </Box>
                </Grid>

                <Divider />

                <Box>
                  <Text fontWeight="medium" mb={3}>Seller Information</Text>
                  <HStack spacing={4}>
                    <Avatar src={selectedItem.seller.avatar} name={selectedItem.seller.name} />
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="medium">{selectedItem.seller.name}</Text>
                      <HStack>
                        {renderStars(selectedItem.seller.rating)}
                        <Text fontSize="sm" color="gray.500">
                          ({selectedItem.seller.totalSales} sales)
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                </Box>

                <Box>
                  <Text fontWeight="medium" mb={2}>Tags</Text>
                  <HStack wrap="wrap">
                    {selectedItem.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" colorScheme="blue">
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onViewClose}>
              Close
            </Button>
            <Button 
              colorScheme="blue" 
              leftIcon={<ShoppingCart size={16} />}
              onClick={() => selectedItem && handlePurchase(selectedItem)}
            >
              Purchase Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={undefined} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Listing
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to remove "{selectedItem?.title}" from the marketplace? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteItem} ml={3}>
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Marketplace;
