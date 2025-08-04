import {
  Box,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  Stat,
  StatNumber,
  StatLabel,
  SimpleGrid,
  HStack,
  VStack,
  Divider,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  ReferenceLine
} from 'recharts';
import { ChartDataPoint, PieDataPoint } from '../types';
import { useState } from 'react';

interface ActivityLogItem {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  type: 'permission' | 'login' | 'logout';
}

interface DashboardProps {
  chartData: ChartDataPoint[];
  pieData: PieDataPoint[];
  activityLog?: ActivityLogItem[];
}

const Dashboard: React.FC<DashboardProps> = ({ 
  chartData, 
  pieData, 
  activityLog = [
    {
      id: '1',
      userId: 'VIT5678',
      action: 'User id here permissions changed to admin by admin VIT345667',
      timestamp: '2 hrs ago',
      type: 'permission'
    },
    {
      id: '2',
      userId: 'VIT2567',
      action: 'Successfully loggedin!',
      timestamp: '2 hrs ago',
      type: 'login'
    },
    {
      id: '3',
      userId: 'VIT5678',
      action: 'User id here permissions changed to admin by admin VIT345667',
      timestamp: '2 hrs ago',
      type: 'permission'
    },
    {
      id: '4',
      userId: 'VIT7865',
      action: 'Successfully loggedin!',
      timestamp: '2 hrs ago',
      type: 'login'
    },
    {
      id: '5',
      userId: 'VIT3456',
      action: 'User logged out successfully',
      timestamp: '3 hrs ago',
      type: 'logout'
    },
    {
      id: '6',
      userId: 'VIT9876',
      action: 'User id here permissions changed to admin by admin VIT345667',
      timestamp: '4 hrs ago',
      type: 'permission'
    },
    {
      id: '7',
      userId: 'VIT1234',
      action: 'Successfully loggedin!',
      timestamp: '5 hrs ago',
      type: 'login'
    },
    {
      id: '8',
      userId: 'VIT5555',
      action: 'User logged out successfully',
      timestamp: '6 hrs ago',
      type: 'logout'
    }
  ]
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  const [selectedPeriod, setSelectedPeriod] = useState('Overall');
  const [dateRange, setDateRange] = useState('01 - 25 March, 2020');

  const timeOptions = [
    { 
      label: 'Overall', 
      value: 'overall',
      dateRange: '01 - 25 May, 2025',
      data: [
        { name: '1', value: 820 },
        { name: '2', value: 720 },
        { name: '3', value: 680 },
        { name: '4', value: 650 },
        { name: '5', value: 720 },
        { name: '6', value: 850 },
        { name: '7', value: 890 },
        { name: '8', value: 920 },
        { name: '9', value: 880 },
        { name: '10', value: 850 }
      ]
    },
    { 
      label: 'Last Week', 
      value: 'week',
      dateRange: '18 - 25 May, 2025',
      data: [
        { name: 'Mon', value: 650 },
        { name: 'Tue', value: 720 },
        { name: 'Wed', value: 800 },
        { name: 'Thu', value: 890 },
        { name: 'Fri', value: 920 },
        { name: 'Sat', value: 850 },
        { name: 'Sun', value: 780 }
      ]
    },
    { 
      label: 'Last Month', 
      value: 'month',
      dateRange: 'April 2025',
      data: [
        { name: 'Week 1', value: 2400 },
        { name: 'Week 2', value: 2800 },
        { name: 'Week 3', value: 3200 },
        { name: 'Week 4', value: 3600 }
      ]
    },
    { 
      label: 'Last 3 Months', 
      value: '3months',
      dateRange: 'February - April 2025',
      data: [
        { name: 'Jan', value: 8200 },
        { name: 'Feb', value: 9400 },
        { name: 'Mar', value: 10800 }
      ]
    }
  ];

  const getCurrentData = () => {
    const selected = timeOptions.find(opt => opt.label === selectedPeriod);
    return selected ? selected.data : timeOptions[0].data;
  };

  const handlePeriodSelect = (option: typeof timeOptions[0]) => {
    setSelectedPeriod(option.label);
    setDateRange(option.dateRange);
  };

  const enhancedChartData = chartData.length > 0 ? chartData : getCurrentData();

  const enhancedPieData = pieData.length > 0 ? pieData : [
    { name: 'Staffs', value: 151, color: '#E53E3E' },
    { name: 'Students', value: 300, color: '#38A169' },
    { name: 'Others', value: 100, color: '#3182CE' }
  ];

  const authMethodsData = [
    { name: 'Microsoft', value: 100, color: '#0078D4', icon: '🏢' },
    { name: 'Internal', value: 100, color: '#38A169', icon: '🔐' },
    { name: 'Gmail', value: 100, color: '#EA4335', icon: '📧' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          bg="white"
          p={3}
          borderRadius="lg"
          shadow="lg"
          border="1px"
          borderColor="gray.200"
          fontSize="sm"
        >
          <Text fontWeight="semibold" color="gray.700">
            {selectedPeriod === 'Last Week' ? label : `Day ${label}`}
          </Text>
          <Text color="blue.500" fontWeight="medium">
            Users: {payload[0].value.toLocaleString()}
          </Text>
        </Box>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#3182CE"
        stroke="white"
        strokeWidth={2}
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      />
    );
  };

  const StatCard = ({ title, value, date }: { title: string; value: string; date: string }) => (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      shadow="sm"
      _hover={{ shadow: 'md', transform: 'translateY(-1px)' }}
      transition="all 0.2s"
    >
      <Stat>
        <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">{title}</StatLabel>
        <StatNumber fontSize="3xl" fontWeight="bold" color={textColor} my={2}>{value}</StatNumber>
        <Text fontSize="xs" color="gray.500">{date}</Text>
      </Stat>
    </Box>
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'permission':
        return '👤';
      case 'login':
        return '🔐';
      case 'logout':
        return '🚪';
      default:
        return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'permission':
        return 'blue.500';
      case 'login':
        return 'green.500';
      case 'logout':
        return 'red.500';
      default:
        return 'gray.500';
    }
  };

  const ActivityLogItem = ({ item }: { item: ActivityLogItem }) => (
    <Flex align="flex-start" gap={3} py={3} px={1}>
      <Box
        w="10"
        h="10"
        borderRadius="lg"
        bg={getActivityColor(item.type)}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="lg"
        flexShrink={0}
        shadow="sm"
      >
        {getActivityIcon(item.type)}
      </Box>
      <Box flex="1" minW="0">
        <Text fontSize="sm" color={textColor} fontWeight="medium" lineHeight="shorter">
          <Text as="span" fontWeight="bold">{item.userId}</Text> {item.action}
        </Text>
        <Text fontSize="xs" color="gray.500" mt={1}>
          last changed
        </Text>
      </Box>
      <Text fontSize="xs" color="gray.500" flexShrink={0} mt={1}>
        {item.timestamp}
      </Text>
    </Flex>
  );

  return (
    <Box as="main" py={8} px={8} ml="64" mt="16" minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="lg" color={textColor}>Welcome Admin!</Heading>
        <Flex gap={2} fontSize="sm" color="gray.500">
          <Text>Home</Text>
          <Text>/</Text>
          <Text color="blue.500">Dashboard</Text>
        </Flex>
      </Flex>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <StatCard 
          title="Daily Active User"
          value="50,345"
          date="18 March 2020"
        />
        <StatCard 
          title="Monthly Active User"
          value="50,345"
          date="18 March 2020"
        />
        <StatCard 
          title="Daily Time Per Active User"
          value="50,345"
          date="18 March 2020"
        />
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6} mb={8}>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          shadow="sm"
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Text fontSize="lg" fontWeight="semibold" color={textColor}>User Activity</Text>
              <Text fontSize="sm" color="gray.500">{dateRange}</Text>
            </Box>
            
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                size="sm"
                rightIcon={<Text fontSize="xs">▼</Text>}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                _active={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                fontWeight="medium"
                color="gray.600"
                px={4}
                py={2}
                borderRadius="lg"
                transition="all 0.2s"
              >
                {selectedPeriod}
              </MenuButton>
              <MenuList
                bg={bgColor}
                borderColor={borderColor}
                shadow="xl"
                borderRadius="xl"
                py={2}
                minW="180px"
              >
                {timeOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    onClick={() => handlePeriodSelect(option)}
                    _hover={{ bg: useColorModeValue('blue.50', 'blue.900') }}
                    _focus={{ bg: useColorModeValue('blue.50', 'blue.900') }}
                    color={selectedPeriod === option.label ? 'blue.500' : textColor}
                    fontWeight={selectedPeriod === option.label ? 'semibold' : 'normal'}
                    py={3}
                    px={4}
                    borderRadius="lg"
                    mx={1}
                    position="relative"
                  >
                    <Flex align="center" justify="space-between" w="full">
                      <Text>{option.label}</Text>
                      {selectedPeriod === option.label && (
                        <Box w="2" h="2" bg="blue.500" borderRadius="full" />
                      )}
                    </Flex>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
          
          <Box h="350px">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={enhancedChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4299E1" stopOpacity={0.6}/>
                    <stop offset="50%" stopColor="#4299E1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4299E1" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="1 1" 
                  stroke={useColorModeValue('#E2E8F0', '#4A5568')} 
                  strokeOpacity={0.5}
                />
                <XAxis 
                  dataKey="name" 
                  stroke={useColorModeValue('#718096', '#A0AEC0')} 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke={useColorModeValue('#718096', '#A0AEC0')} 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4299E1"
                  strokeWidth={3}
                  fill="url(#colorValue)"
                  dot={<CustomDot />}
                  activeDot={{ 
                    r: 6, 
                    fill: '#3182CE', 
                    stroke: 'white', 
                    strokeWidth: 3,
                    style: { filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <VStack spacing={6} h="full">
          <Box
            p={6}
            bg={bgColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            shadow="sm"
            w="full"
            flex="1"
          >
            <VStack spacing={4} h="full">
              <Box w="full">
                <Text fontSize="lg" fontWeight="semibold" color={textColor} mb={2}>Active Users</Text>
                <Text fontSize="sm" color="green.500" fontWeight="medium">(+1051) than last week</Text>
              </Box>

              <Box position="relative" w="180px" h="180px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={enhancedPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {enhancedPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}`, name]}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <Flex
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  direction="column"
                  align="center"
                >
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>551</Text>
                  <Text fontSize="xs" color="gray.500" fontWeight="medium">TOTAL USERS</Text>
                </Flex>
              </Box>

              <VStack spacing={2} w="full">
                {enhancedPieData.map((item, index) => (
                  <Flex key={index} justify="space-between" align="center" w="full" py={1}>
                    <Flex align="center" gap={2}>
                      <Box w="3" h="3" borderRadius="full" bg={item.color} />
                      <Text fontSize="sm" color={textColor}>{item.name}</Text>
                    </Flex>
                    <Text fontSize="sm" fontWeight="semibold" color={textColor}>{item.value}</Text>
                  </Flex>
                ))}
              </VStack>
            </VStack>
          </Box>

          <Box
            p={6}
            bg={bgColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            shadow="sm"
            w="full"
            flex="1"
          >
            <VStack spacing={4} h="full">
              <Box w="full">
                <Text fontSize="lg" fontWeight="semibold" color={textColor} mb={2}>By Authentication Method</Text>
              </Box>

              <VStack spacing={4} w="full" flex="1" justify="center">
                {authMethodsData.map((method, index) => (
                  <Box key={index} w="full">
                    <Flex justify="space-between" align="center" mb={2}>
                      <Flex align="center" gap={3}>
                        <Box
                          w="8"
                          h="8"
                          borderRadius="lg"
                          bg={method.color}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="sm"
                          color="white"
                        >
                          {method.icon}
                        </Box>
                        <Text fontSize="sm" color={textColor} fontWeight="medium">{method.name}</Text>
                      </Flex>
                      <Text fontSize="lg" fontWeight="bold" color={textColor}>{method.value}</Text>
                    </Flex>
                    <Box w="full" h="2" bg="gray.100" borderRadius="full">
                      <Box 
                        w={`${(method.value / 380) * 100}%`} 
                        h="full" 
                        bg={method.color} 
                        borderRadius="full"
                        transition="width 0.3s"
                      />
                    </Box>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </Grid>

      <Box
        p={6}
        bg={bgColor}
        borderRadius="xl"
        borderWidth="1px"
        borderColor={borderColor}
        shadow="sm"
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="lg" fontWeight="semibold" color={textColor}>Activity Log</Text>
          <IconButton
            aria-label="More options"
            icon={<Text fontSize="lg">⋮</Text>}
            variant="ghost"
            size="sm"
            color="gray.500"
            _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
          />
        </Flex>
        
        <Box
          maxH="400px"
          overflowY="auto"
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: useColorModeValue('#f7fafc', '#2d3748'),
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: useColorModeValue('#cbd5e0', '#4a5568'),
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: useColorModeValue('#a0aec0', '#718096'),
            },
          }}
        >
          <VStack spacing={0} align="stretch">
            {activityLog.map((item, index) => (
              <Box key={item.id} _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }} borderRadius="md">
                <ActivityLogItem item={item} />
                {index < activityLog.length - 1 && (
                  <Divider borderColor={borderColor} opacity={0.6} />
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;