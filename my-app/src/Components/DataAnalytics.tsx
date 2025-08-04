import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Grid,
  GridItem,
  useColorModeValue,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  VStack,
  HStack,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, Users, BookOpen, Award, Clock, Target } from 'lucide-react';

const DataAnalytics: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // Sample data
  const enrollmentData = [
    { month: 'Jan', students: 245, teachers: 18 },
    { month: 'Feb', students: 267, teachers: 20 },
    { month: 'Mar', students: 289, teachers: 22 },
    { month: 'Apr', students: 312, teachers: 24 },
    { month: 'May', students: 334, teachers: 25 },
    { month: 'Jun', students: 356, teachers: 27 },
  ];

  const performanceData = [
    { subject: 'Mathematics', average: 85, students: 120 },
    { subject: 'Science', average: 78, students: 115 },
    { subject: 'English', average: 82, students: 130 },
    { subject: 'History', average: 79, students: 95 },
    { subject: 'Art', average: 88, students: 80 },
  ];

  const activityData = [
    { day: 'Mon', logins: 245, submissions: 89, discussions: 34 },
    { day: 'Tue', logins: 267, submissions: 95, discussions: 42 },
    { day: 'Wed', logins: 289, submissions: 102, discussions: 38 },
    { day: 'Thu', logins: 312, submissions: 87, discussions: 45 },
    { day: 'Fri', logins: 334, submissions: 93, discussions: 41 },
    { day: 'Sat', logins: 198, submissions: 56, discussions: 28 },
    { day: 'Sun', logins: 156, submissions: 42, discussions: 22 },
  ];

  const gradeDistribution = [
    { grade: 'A', count: 45, color: '#38A169' },
    { grade: 'B', count: 67, color: '#3182CE' },
    { grade: 'C', count: 89, color: '#D69E2E' },
    { grade: 'D', count: 34, color: '#E53E3E' },
    { grade: 'F', count: 12, color: '#9F7AEA' },
  ];

  const topPerformers = [
    { id: 1, name: 'Alice Johnson', grade: 'A+', score: 98, avatar: 'https://bit.ly/dan-abramov' },
    { id: 2, name: 'Bob Smith', grade: 'A+', score: 96, avatar: 'https://bit.ly/kent-c-dodds' },
    { id: 3, name: 'Carol Davis', grade: 'A', score: 94, avatar: 'https://bit.ly/ryan-florence' },
    { id: 4, name: 'David Wilson', grade: 'A', score: 92, avatar: 'https://bit.ly/code-beast' },
    { id: 5, name: 'Eva Brown', grade: 'A', score: 90, avatar: 'https://bit.ly/sage-adebayo' },
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
        >
          <Text fontWeight="semibold" mb={1}>{label}</Text>
          {payload.map((entry: any, index: number) => (
            <Text key={index} color={entry.color} fontSize="sm">
              {entry.dataKey}: {entry.value}
            </Text>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box ml={{ base: '16', sm: '20', md: '64' }} mt="16" p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="lg" color={textColor}>Data Analytics</Heading>
          <Select maxW="200px" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Quarter">This Quarter</option>
            <option value="This Year">This Year</option>
          </Select>
        </Flex>

        {/* Key Metrics */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="blue.100" borderRadius="lg" mr={3}>
                    <Users size={20} color="#3182CE" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Total Students</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">1,247</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  12.5% from last month
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="green.100" borderRadius="lg" mr={3}>
                    <BookOpen size={20} color="#38A169" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Active Courses</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">89</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  5.2% from last month
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="purple.100" borderRadius="lg" mr={3}>
                    <Award size={20} color="#9F7AEA" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Avg Performance</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">82.4%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  3.1% from last month
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="orange.100" borderRadius="lg" mr={3}>
                    <Clock size={20} color="#D69E2E" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Avg Study Time</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">4.2h</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  2.3% from last month
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Charts Row 1 */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          {/* Enrollment Trends */}
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Enrollment Trends</Heading>
              <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stackId="1"
                      stroke="#3182CE"
                      fill="#3182CE"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="teachers"
                      stackId="1"
                      stroke="#38A169"
                      fill="#38A169"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>

          {/* Grade Distribution */}
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Grade Distribution</Heading>
              <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <VStack spacing={2} mt={4}>
                {gradeDistribution.map((item, index) => (
                  <HStack key={index} justify="space-between" w="full">
                    <HStack>
                      <Box w={3} h={3} bg={item.color} borderRadius="full" />
                      <Text fontSize="sm">Grade {item.grade}</Text>
                    </HStack>
                    <Text fontSize="sm" fontWeight="medium">{item.count}</Text>
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </Grid>

        {/* Charts Row 2 */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
          {/* Subject Performance */}
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Subject Performance</Heading>
              <VStack spacing={4}>
                {performanceData.map((subject, index) => (
                  <Box key={index} w="full">
                    <Flex justify="space-between" mb={1}>
                      <Text fontSize="sm" fontWeight="medium">{subject.subject}</Text>
                      <Text fontSize="sm" color="gray.500">{subject.average}%</Text>
                    </Flex>
                    <Progress
                      value={subject.average}
                      colorScheme={subject.average >= 85 ? 'green' : subject.average >= 75 ? 'blue' : 'orange'}
                      size="sm"
                      borderRadius="full"
                    />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                      {subject.students} students enrolled
                    </Text>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>

          {/* Weekly Activity */}
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Weekly Activity</Heading>
              <Box h="250px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="logins" fill="#3182CE" />
                    <Bar dataKey="submissions" fill="#38A169" />
                    <Bar dataKey="discussions" fill="#D69E2E" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>
        </Grid>

        {/* Top Performers */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Top Performers</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Rank</Th>
                  <Th>Student</Th>
                  <Th>Grade</Th>
                  <Th>Score</Th>
                  <Th>Performance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {topPerformers.map((student, index) => (
                  <Tr key={student.id}>
                    <Td>
                      <Badge
                        colorScheme={index === 0 ? 'yellow' : index === 1 ? 'gray' : index === 2 ? 'orange' : 'blue'}
                        variant="solid"
                      >
                        #{index + 1}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack>
                        <Avatar size="sm" src={student.avatar} name={student.name} />
                        <Text fontWeight="medium">{student.name}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Badge colorScheme="green" variant="subtle">
                        {student.grade}
                      </Badge>
                    </Td>
                    <Td>
                      <Text fontWeight="bold">{student.score}%</Text>
                    </Td>
                    <Td>
                      <Progress
                        value={student.score}
                        colorScheme="green"
                        size="sm"
                        w="100px"
                        borderRadius="full"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Additional Insights */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
          <Card>
            <CardBody>
              <VStack align="start" spacing={3}>
                <HStack>
                  <Target size={20} color="#3182CE" />
                  <Text fontWeight="medium">Course Completion Rate</Text>
                </HStack>
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">87.3%</Text>
                <Text fontSize="sm" color="gray.500">
                  Students completing courses on time
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack align="start" spacing={3}>
                <HStack>
                  <TrendingUp size={20} color="#38A169" />
                  <Text fontWeight="medium">Engagement Score</Text>
                </HStack>
                <Text fontSize="2xl" fontWeight="bold" color="green.500">8.4/10</Text>
                <Text fontSize="sm" color="gray.500">
                  Average student engagement level
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack align="start" spacing={3}>
                <HStack>
                  <Clock size={20} color="#D69E2E" />
                  <Text fontWeight="medium">Response Time</Text>
                </HStack>
                <Text fontSize="2xl" fontWeight="bold" color="orange.500">2.3h</Text>
                <Text fontSize="sm" color="gray.500">
                  Average teacher response time
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </Grid>
      </VStack>
    </Box>
  );
};

export default DataAnalytics;
