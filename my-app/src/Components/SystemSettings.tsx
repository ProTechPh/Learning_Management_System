import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  useColorModeValue,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Text,
  useToast,
  Card,
  CardBody,
  Switch,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Badge,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import { 
  Settings, 
  Shield, 
  Database, 
  Mail, 
  Bell, 
  Users, 
  Globe, 
  Lock,
  Server,
  Activity,
  HardDrive,
  Wifi,
  Moon,
  Sun,
  Save,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

const SystemSettings: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Learning Management System',
    siteDescription: 'A comprehensive educational platform for students and teachers',
    defaultLanguage: 'English',
    timezone: 'UTC+8',
    maintenanceMode: false,
    registrationEnabled: true,
    maxFileSize: 50, // MB
    sessionTimeout: 30, // minutes
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    loginAttempts: 5,
    lockoutDuration: 15, // minutes
    sslEnabled: true,
    ipWhitelist: '',
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@lms.edu',
    fromName: 'LMS System',
    enableEmailNotifications: true,
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    assignmentReminders: true,
    gradeNotifications: true,
    systemAlerts: true,
    marketingEmails: false,
  });

  // System Status
  const [systemStatus] = useState({
    serverStatus: 'Online',
    databaseStatus: 'Connected',
    storageUsed: 45.2, // GB
    storageTotal: 100, // GB
    activeUsers: 127,
    systemLoad: 23, // percentage
    uptime: '15 days, 4 hours',
    lastBackup: '2025-05-01 02:00 AM',
  });

  const handleSaveSettings = (settingsType: string) => {
    toast({
      title: 'Settings Saved',
      description: `${settingsType} settings have been updated successfully.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleBackupDatabase = () => {
    toast({
      title: 'Backup Started',
      description: 'Database backup has been initiated. You will be notified when complete.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRestoreDatabase = () => {
    toast({
      title: 'Restore Started',
      description: 'Database restore process has been initiated.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleTestEmail = () => {
    toast({
      title: 'Test Email Sent',
      description: 'A test email has been sent to verify SMTP configuration.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online':
      case 'connected':
        return 'green';
      case 'offline':
      case 'disconnected':
        return 'red';
      case 'warning':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  return (
    <Box ml={{ base: '16', sm: '20', md: '64' }} mt="16" p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="lg" color={textColor}>System Settings</Heading>
          <HStack>
            <IconButton
              icon={colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle color mode"
            />
            <Button leftIcon={<RefreshCw size={20} />} variant="outline">
              Refresh
            </Button>
          </HStack>
        </Flex>

        {/* System Status Overview */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="green.100" borderRadius="lg" mr={3}>
                    <Server size={20} color="#38A169" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Server Status</StatLabel>
                </Flex>
                <StatNumber fontSize="lg">
                  <Badge colorScheme={getStatusColor(systemStatus.serverStatus)}>
                    {systemStatus.serverStatus}
                  </Badge>
                </StatNumber>
                <StatHelpText>Uptime: {systemStatus.uptime}</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="blue.100" borderRadius="lg" mr={3}>
                    <Database size={20} color="#3182CE" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Database</StatLabel>
                </Flex>
                <StatNumber fontSize="lg">
                  <Badge colorScheme={getStatusColor(systemStatus.databaseStatus)}>
                    {systemStatus.databaseStatus}
                  </Badge>
                </StatNumber>
                <StatHelpText>Last backup: {systemStatus.lastBackup}</StatHelpText>
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
                  <StatLabel fontSize="sm" color="gray.500">Active Users</StatLabel>
                </Flex>
                <StatNumber fontSize="2xl">{systemStatus.activeUsers}</StatNumber>
                <StatHelpText>Currently online</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <Flex align="center" mb={2}>
                  <Box p={2} bg="orange.100" borderRadius="lg" mr={3}>
                    <HardDrive size={20} color="#D69E2E" />
                  </Box>
                  <StatLabel fontSize="sm" color="gray.500">Storage Used</StatLabel>
                </Flex>
                <StatNumber fontSize="lg">{systemStatus.storageUsed}GB</StatNumber>
                <Progress 
                  value={(systemStatus.storageUsed / systemStatus.storageTotal) * 100} 
                  colorScheme="orange" 
                  size="sm" 
                  mt={2}
                />
                <StatHelpText>of {systemStatus.storageTotal}GB total</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Settings Tabs */}
        <Card>
          <CardBody>
            <Tabs variant="enclosed">
              <TabList>
                <Tab><Settings size={16} style={{ marginRight: '8px' }} />General</Tab>
                <Tab><Shield size={16} style={{ marginRight: '8px' }} />Security</Tab>
                <Tab><Mail size={16} style={{ marginRight: '8px' }} />Email</Tab>
                <Tab><Bell size={16} style={{ marginRight: '8px' }} />Notifications</Tab>
                <Tab><Database size={16} style={{ marginRight: '8px' }} />Database</Tab>
              </TabList>

              <TabPanels>
                {/* General Settings */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md">General Settings</Heading>
                    
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                      <FormControl>
                        <FormLabel>Site Name</FormLabel>
                        <Input
                          value={generalSettings.siteName}
                          onChange={(e) => setGeneralSettings({
                            ...generalSettings,
                            siteName: e.target.value
                          })}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Default Language</FormLabel>
                        <Select
                          value={generalSettings.defaultLanguage}
                          onChange={(e) => setGeneralSettings({
                            ...generalSettings,
                            defaultLanguage: e.target.value
                          })}
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Timezone</FormLabel>
                        <Select
                          value={generalSettings.timezone}
                          onChange={(e) => setGeneralSettings({
                            ...generalSettings,
                            timezone: e.target.value
                          })}
                        >
                          <option value="UTC+8">UTC+8 (Asia/Manila)</option>
                          <option value="UTC+0">UTC+0 (GMT)</option>
                          <option value="UTC-5">UTC-5 (EST)</option>
                          <option value="UTC-8">UTC-8 (PST)</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Max File Size (MB)</FormLabel>
                        <NumberInput
                          value={generalSettings.maxFileSize}
                          onChange={(_, value) => setGeneralSettings({
                            ...generalSettings,
                            maxFileSize: value
                          })}
                          min={1}
                          max={500}
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
                      <FormLabel>Site Description</FormLabel>
                      <Textarea
                        value={generalSettings.siteDescription}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          siteDescription: e.target.value
                        })}
                        rows={3}
                      />
                    </FormControl>

                    <VStack spacing={4} align="stretch">
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Maintenance Mode</FormLabel>
                        <Switch
                          isChecked={generalSettings.maintenanceMode}
                          onChange={(e) => setGeneralSettings({
                            ...generalSettings,
                            maintenanceMode: e.target.checked
                          })}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Allow User Registration</FormLabel>
                        <Switch
                          isChecked={generalSettings.registrationEnabled}
                          onChange={(e) => setGeneralSettings({
                            ...generalSettings,
                            registrationEnabled: e.target.checked
                          })}
                        />
                      </FormControl>
                    </VStack>

                    <Button
                      colorScheme="blue"
                      leftIcon={<Save size={16} />}
                      onClick={() => handleSaveSettings('General')}
                    >
                      Save General Settings
                    </Button>
                  </VStack>
                </TabPanel>

                {/* Security Settings */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md">Security Settings</Heading>

                    <Alert status="info">
                      <AlertIcon />
                      <AlertTitle>Security Notice</AlertTitle>
                      <AlertDescription>
                        Changes to security settings will affect all users. Please review carefully.
                      </AlertDescription>
                    </Alert>

                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                      <FormControl>
                        <FormLabel>Minimum Password Length</FormLabel>
                        <NumberInput
                          value={securitySettings.passwordMinLength}
                          onChange={(_, value) => setSecuritySettings({
                            ...securitySettings,
                            passwordMinLength: value
                          })}
                          min={6}
                          max={20}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Max Login Attempts</FormLabel>
                        <NumberInput
                          value={securitySettings.loginAttempts}
                          onChange={(_, value) => setSecuritySettings({
                            ...securitySettings,
                            loginAttempts: value
                          })}
                          min={3}
                          max={10}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </Grid>

                    <VStack spacing={4} align="stretch">
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Enable Two-Factor Authentication</FormLabel>
                        <Switch
                          isChecked={securitySettings.twoFactorAuth}
                          onChange={(e) => setSecuritySettings({
                            ...securitySettings,
                            twoFactorAuth: e.target.checked
                          })}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Require Special Characters in Password</FormLabel>
                        <Switch
                          isChecked={securitySettings.passwordRequireSpecial}
                          onChange={(e) => setSecuritySettings({
                            ...securitySettings,
                            passwordRequireSpecial: e.target.checked
                          })}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Require Numbers in Password</FormLabel>
                        <Switch
                          isChecked={securitySettings.passwordRequireNumbers}
                          onChange={(e) => setSecuritySettings({
                            ...securitySettings,
                            passwordRequireNumbers: e.target.checked
                          })}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">SSL/HTTPS Enabled</FormLabel>
                        <Switch
                          isChecked={securitySettings.sslEnabled}
                          onChange={(e) => setSecuritySettings({
                            ...securitySettings,
                            sslEnabled: e.target.checked
                          })}
                        />
                      </FormControl>
                    </VStack>

                    <FormControl>
                      <FormLabel>IP Whitelist (one per line)</FormLabel>
                      <Textarea
                        value={securitySettings.ipWhitelist}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          ipWhitelist: e.target.value
                        })}
                        placeholder="192.168.1.1&#10;10.0.0.1"
                        rows={4}
                      />
                    </FormControl>

                    <Button
                      colorScheme="blue"
                      leftIcon={<Save size={16} />}
                      onClick={() => handleSaveSettings('Security')}
                    >
                      Save Security Settings
                    </Button>
                  </VStack>
                </TabPanel>

                {/* Email Settings */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md">Email Configuration</Heading>

                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                      <FormControl>
                        <FormLabel>SMTP Host</FormLabel>
                        <Input
                          value={emailSettings.smtpHost}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings,
                            smtpHost: e.target.value
                          })}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>SMTP Port</FormLabel>
                        <NumberInput
                          value={emailSettings.smtpPort}
                          onChange={(_, value) => setEmailSettings({
                            ...emailSettings,
                            smtpPort: value
                          })}
                        >
                          <NumberInputField />
                        </NumberInput>
                      </FormControl>

                      <FormControl>
                        <FormLabel>SMTP Username</FormLabel>
                        <Input
                          value={emailSettings.smtpUsername}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings,
                            smtpUsername: e.target.value
                          })}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>SMTP Password</FormLabel>
                        <Input
                          type="password"
                          value={emailSettings.smtpPassword}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings,
                            smtpPassword: e.target.value
                          })}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>From Email</FormLabel>
                        <Input
                          type="email"
                          value={emailSettings.fromEmail}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings,
                            fromEmail: e.target.value
                          })}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>From Name</FormLabel>
                        <Input
                          value={emailSettings.fromName}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings,
                            fromName: e.target.value
                          })}
                        />
                      </FormControl>
                    </Grid>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Enable Email Notifications</FormLabel>
                      <Switch
                        isChecked={emailSettings.enableEmailNotifications}
                        onChange={(e) => setEmailSettings({
                          ...emailSettings,
                          enableEmailNotifications: e.target.checked
                        })}
                      />
                    </FormControl>

                    <HStack>
                      <Button
                        colorScheme="blue"
                        leftIcon={<Save size={16} />}
                        onClick={() => handleSaveSettings('Email')}
                      >
                        Save Email Settings
                      </Button>
                      <Button
                        variant="outline"
                        leftIcon={<Mail size={16} />}
                        onClick={handleTestEmail}
                      >
                        Send Test Email
                      </Button>
                    </HStack>
                  </VStack>
                </TabPanel>

                {/* Notification Settings */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md">Notification Preferences</Heading>

                    <VStack spacing={4} align="stretch">
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Email Notifications</FormLabel>
                        <Switch
                          isChecked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: e.target.checked
                          })}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Push Notifications</FormLabel>
                        <Switch
                          isChecked={notificationSettings.pushNotifications}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            pushNotifications: e.target.checked
                          })}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">SMS Notifications</FormLabel>
                        <Switch
                          isChecked={notificationSettings.smsNotifications}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            smsNotifications: e.target.checked
                          })}
                        />
                      </FormControl>

                      <Divider />

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Assignment Reminders</FormLabel>
                        <Switch
                          isChecked={notificationSettings.assignmentReminders}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            assignmentReminders: e.target.checked
                          })}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Grade Notifications</FormLabel>
                        <Switch
                          isChecked={notificationSettings.gradeNotifications}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            gradeNotifications: e.target.checked
                          })}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">System Alerts</FormLabel>
                        <Switch
                          isChecked={notificationSettings.systemAlerts}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            systemAlerts: e.target.checked
                          })}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Marketing Emails</FormLabel>
                        <Switch
                          isChecked={notificationSettings.marketingEmails}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            marketingEmails: e.target.checked
                          })}
                        />
                      </FormControl>
                    </VStack>

                    <Button
                      colorScheme="blue"
                      leftIcon={<Save size={16} />}
                      onClick={() => handleSaveSettings('Notification')}
                    >
                      Save Notification Settings
                    </Button>
                  </VStack>
                </TabPanel>

                {/* Database Settings */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md">Database Management</Heading>

                    <Alert status="warning">
                      <AlertIcon />
                      <AlertTitle>Database Operations</AlertTitle>
                      <AlertDescription>
                        Database operations can affect system performance. Schedule during maintenance windows.
                      </AlertDescription>
                    </Alert>

                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                      <Card>
                        <CardBody>
                          <VStack spacing={4}>
                            <Database size={40} color="#3182CE" />
                            <Heading size="sm">Database Backup</Heading>
                            <Text fontSize="sm" textAlign="center" color="gray.500">
                              Create a complete backup of the database
                            </Text>
                            <Button
                              colorScheme="blue"
                              leftIcon={<Download size={16} />}
                              onClick={handleBackupDatabase}
                              w="full"
                            >
                              Backup Database
                            </Button>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardBody>
                          <VStack spacing={4}>
                            <Upload size={40} color="#38A169" />
                            <Heading size="sm">Database Restore</Heading>
                            <Text fontSize="sm" textAlign="center" color="gray.500">
                              Restore database from backup file
                            </Text>
                            <Button
                              colorScheme="green"
                              leftIcon={<Upload size={16} />}
                              onClick={handleRestoreDatabase}
                              w="full"
                            >
                              Restore Database
                            </Button>
                          </VStack>
                        </CardBody>
                      </Card>
                    </Grid>

                    <Box>
                      <Heading size="sm" mb={4}>System Performance</Heading>
                      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                        <Box>
                          <Text fontSize="sm" color="gray.500" mb={1}>CPU Usage</Text>
                          <Progress value={systemStatus.systemLoad} colorScheme="blue" size="sm" />
                          <Text fontSize="xs" color="gray.500">{systemStatus.systemLoad}%</Text>
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500" mb={1}>Memory Usage</Text>
                          <Progress value={67} colorScheme="green" size="sm" />
                          <Text fontSize="xs" color="gray.500">67%</Text>
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500" mb={1}>Disk Usage</Text>
                          <Progress 
                            value={(systemStatus.storageUsed / systemStatus.storageTotal) * 100} 
                            colorScheme="orange" 
                            size="sm" 
                          />
                          <Text fontSize="xs" color="gray.500">
                            {((systemStatus.storageUsed / systemStatus.storageTotal) * 100).toFixed(1)}%
                          </Text>
                        </Box>
                      </Grid>
                    </Box>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default SystemSettings;
