import { ChartDataPoint, PieDataPoint } from '../types';

export const chartData: ChartDataPoint[] = [
  { name: '1', value: 1000 },
  { name: '2', value: 800 },
  { name: '3', value: 750 },
  { name: '4', value: 1100 },
  { name: '5', value: 1000 },
  { name: '6', value: 800 }
];

export const pieData: PieDataPoint[] = [
  { name: 'Staffs', value: 151, color: '#FF4560', percentage: 27 },
  { name: 'Students A', value: 100, color: '#00E396', percentage: 18 },
  { name: 'Students B', value: 100, color: '#2196F3', percentage: 18 },
  { name: 'Students C', value: 100, color: '#775DD0', percentage: 18 }
];

export const authMethods = [
  { name: 'Microsoft', value: 100 },
  { name: 'Internal', value: 100 },
  { name: 'Email', value: 100 }
];

export const defaultNotifications = [
  { id: 1, message: 'New user registered', time: '2 hours ago' },
  { id: 2, message: 'System update available', time: '1 day ago' }
];

export const recentUsers = [
  { id: 1, name: 'Alice Johnson', joined: '2025-05-01' },
  { id: 2, name: 'Bob Smith', joined: '2025-05-02' }
];
