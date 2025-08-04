import { Box, Flex, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartDataPoint, PieDataPoint } from '../types';

interface DashboardChartsProps {
  chartData: ChartDataPoint[];
  pieData: PieDataPoint[];
}

const DashboardCharts = ({ chartData, pieData }: DashboardChartsProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'white');
  const textSecondaryColor = useColorModeValue('gray.600', 'gray.400');
  const chartGridColor = useColorModeValue('gray.200', 'gray.600');
  const activeColor = useColorModeValue('purple.500', 'purple.300');
  const successColor = useColorModeValue('green.500', 'green.300');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');
  
  return (
    <SimpleGrid columns={2} spacing={6} mb={8}>
      <Box
        p={6}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="2xl"
        bg={cardBg}
        boxShadow="sm"
        transition="all 0.3s"
        _hover={{ boxShadow: 'lg' }}
      >
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading as="h3" size="md" fontWeight="semibold" color={textColor}>
              User Activity Trends
            </Heading>
            <Text fontSize="sm" color={textSecondaryColor}>
              January - June 2025
            </Text>
          </Box>
        </Flex>
        <Box h="80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={activeColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
              <XAxis dataKey="name" stroke={textSecondaryColor} />
              <YAxis stroke={textSecondaryColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: textColor,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={activeColor}
                strokeWidth={3}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box
        p={6}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="2xl"
        bg={cardBg}
        boxShadow="sm"
        transition="all 0.3s"
        _hover={{ boxShadow: 'lg' }}
      >
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading as="h3" size="md" fontWeight="semibold" color={textColor}>
              User Distribution
            </Heading>
            <Text fontSize="sm" fontWeight="medium" color={successColor}>
              +15.3% growth this month
            </Text>
          </Box>
        </Flex>

        <Box position="relative" mb={6}>
          <Box h="64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            direction="column"
            align="center"
          >
            <Text fontSize="3xl" fontWeight="bold" color={textColor}>
              551
            </Text>
            <Text fontSize="sm" color={textSecondaryColor}>
              Total Users
            </Text>
          </Flex>
        </Box>

        <SimpleGrid columns={2} spacing={4} mb={6}>
          {pieData.map((item, index) => (
            <Flex
              key={index}
              justify="space-between"
              align="center"
              p={3}
              borderRadius="xl"
              bg={hoverBgColor}
            >
              <Flex align="center">
                <Box
                  w="3"
                  h="3"
                  borderRadius="full"
                  bg={item.color}
                  mr={3}
                />
                <Text fontSize="sm" fontWeight="medium" color={textColor}>
                  {item.name}
                </Text>
              </Flex>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="bold" color={textColor}>
                  {item.value}
                </Text>
                <Text fontSize="xs" color={textSecondaryColor}>
                  {item.percentage}%
                </Text>
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  );
};

export default DashboardCharts;