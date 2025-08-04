export interface User {
  id: string;
  name: string;
  role: 'Student' | 'Staff' | 'Faculty';
  status: 'active' | 'inactive';
  lastSeen: string;
  avatar: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  users?: number;
  sessions?: number;
}

export interface PieDataPoint {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface MenuItem {
  icon: React.ElementType;
  text: string;
  key: string;
  active?: boolean;
}

export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color?: string;
}

export interface TopBarProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export interface SidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export interface DashboardProps {
  chartData: any; // Replace 'any' with proper chart data type
  pieData: any; // Replace 'any' with proper pie data type
  recentUsers: any[]; // Replace 'any' with proper user type
}

interface RecentUser {
  id: number;
  name: string;
  joined: string;
}