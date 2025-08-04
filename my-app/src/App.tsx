import { ChakraProvider, Box } from '@chakra-ui/react';
import { useState } from 'react';
import Dashboard from './Components/Dashboard';
import Footer from './Components/footer';
import Sidebar from './Components/Sidebar';
import TopBar from './Components/topbar';
import UserManagement from './Components/UserManagement';
import DataAnalytics from './Components/DataAnalytics';
import SurveysAndForms from './Components/SurveysAndForms';
import ResourceLibrary from './Components/ResourceLibrary';
import Marketplace from './Components/Marketplace';
import SystemSettings from './Components/SystemSettings';
import { chartData, defaultNotifications, pieData, recentUsers } from './utils/data';
import theme from './theme';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(defaultNotifications);

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <TopBar notifications={notifications} setNotifications={setNotifications} />
        
        {activeTab === 'dashboard' && (
          <Dashboard 
            chartData={chartData}
            pieData={pieData}
          />
        )}
        
        {activeTab === 'users' && <UserManagement />}
        
        {activeTab === 'data' && <DataAnalytics />}
        
        {activeTab === 'surveys' && <SurveysAndForms />}
        
        {activeTab === 'library' && <ResourceLibrary />}
        
        {activeTab === 'market' && <Marketplace />}
        
        {activeTab === 'settings' && <SystemSettings />}
        
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
