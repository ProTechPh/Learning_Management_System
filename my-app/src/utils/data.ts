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
  {
    id: 1,
    title: 'New Assignment Posted',
    message: 'Mathematics Quiz #3 has been posted for Grade 10-A. Due date: January 15, 2025',
    time: '30 minutes ago',
    unread: true
  },
  {
    id: 2,
    title: 'Grade Updated',
    message: 'Your Physics Lab Report has been graded. Score: 95/100',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    title: 'Class Schedule Change',
    message: 'Chemistry class moved from Room 201 to Lab 3 tomorrow at 10:00 AM',
    time: '2 hours ago',
    unread: true
  },
  {
    id: 4,
    title: 'New Student Enrollment',
    message: 'Maria Santos has been enrolled in Grade 11-B Science Section',
    time: '3 hours ago',
    unread: false
  },
  {
    id: 5,
    title: 'System Maintenance',
    message: 'Scheduled system maintenance on January 12, 2025 from 2:00 AM - 4:00 AM',
    time: '5 hours ago',
    unread: false
  },
  {
    id: 6,
    title: 'Parent-Teacher Conference',
    message: 'Reminder: Parent-Teacher conference scheduled for January 20, 2025',
    time: '1 day ago',
    unread: false
  },
  {
    id: 7,
    title: 'Library Book Due',
    message: '"Advanced Calculus" is due for return by January 18, 2025',
    time: '1 day ago',
    unread: false
  },
  {
    id: 8,
    title: 'Exam Results Available',
    message: 'Midterm examination results for all subjects are now available',
    time: '2 days ago',
    unread: false
  },
  {
    id: 9,
    title: 'Fee Payment Reminder',
    message: 'Second semester fees are due by January 25, 2025',
    time: '3 days ago',
    unread: false
  },
  {
    id: 10,
    title: 'School Event',
    message: 'Science Fair registration is now open. Deadline: February 1, 2025',
    time: '1 week ago',
    unread: false
  }
];

export const recentUsers = [
  { id: 1, name: 'Alice Johnson', joined: '2025-05-01' },
  { id: 2, name: 'Bob Smith', joined: '2025-05-02' }
];
