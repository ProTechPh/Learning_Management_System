import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  
  return (
    <Box
      as="footer"
      position="fixed"
      bottom={0}
      left="64"
      right={0}
      py={4}
      px={8}
      borderTopWidth="1px"
      borderColor={borderColor}
      bg={bgColor}
      backdropFilter="blur(10px)"
      zIndex={5}
      textAlign="center"
    >
      <Text fontSize="sm" color={textColor}>
        2025 Dashboard • All rights reserved ProTech.
      </Text>
    </Box>
  );
};

export default Footer;