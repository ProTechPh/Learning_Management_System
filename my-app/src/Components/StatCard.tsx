import { Box, Flex, Stat, StatLabel, StatNumber, Text, useColorModeValue } from '@chakra-ui/react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { StatCardProps } from '../types';

const StatCard = ({ title, value, change, trend, icon: Icon, color }: StatCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconBgColor = useColorModeValue(`${color}.50`, `${color}.900`);
  const iconColor = useColorModeValue(`${color}.500`, `${color}.200`);
  const trendUpBg = useColorModeValue('green.50', 'green.900');
  const trendUpColor = useColorModeValue('green.600', 'green.200');
  const trendDownBg = useColorModeValue('red.50', 'red.900');
  const trendDownColor = useColorModeValue('red.600', 'red.200');
  
  return (
    <Box
      p={6}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      bg={cardBg}
      boxShadow="sm"
      transition="all 0.3s"
      _hover={{ 
        transform: 'scale(1.05)', 
        boxShadow: 'lg' 
      }}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Box p={3} borderRadius="xl" bg={iconBgColor}>
          <Icon size={24} color={iconColor} />
        </Box>
        <Flex 
          px={2} 
          py={1} 
          borderRadius="full" 
          fontSize="xs" 
          fontWeight="medium"
          bg={trend === 'up' ? trendUpBg : trendDownBg}
          color={trend === 'up' ? trendUpColor : trendDownColor}
          align="center"
        >
          {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <Text ml={1}>{change}</Text>
        </Flex>
      </Flex>
      <Stat>
        <StatNumber fontSize="2xl" fontWeight="bold">{value}</StatNumber>
        <StatLabel fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>{title}</StatLabel>
      </Stat>
    </Box>
  );
};

export default StatCard;