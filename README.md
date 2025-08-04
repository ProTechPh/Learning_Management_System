# Learning Management System (LMS)

A fully responsive and interactive Learning Management System (LMS) built as a personal freelance project for managing school-level student activities. This web application offers a streamlined experience for teachers, students, and administrators, enabling digital learning, progress tracking, and content delivery in one centralized platform.

## 🔧 Tech Stack

### Frontend
- **React** with **TypeScript**
- **Chakra UI** – Modern and accessible UI component library
- **React Router** – For managing client-side routing
- **Axios** – For API requests
- **Framer Motion** – Smooth animations and transitions



### Design & Prototyping
- **Figma** – All screens were designed and prototyped using Figma

## ✨ Features

### 🧑‍🏫 Admin Panel
- User role management (Admin, Teacher, Student)
- CRUD operations for classes, subjects, users
- View and manage all platform data
- Create and manage assignments
- Upload learning resources
- View student submissions
- Manage classroom discussions
- View assigned lessons and tasks
- Submit assignments
- Track progress and grades
- Participate in classroom Q&A

### 📊 Analytics & Reports
- Real-time performance tracking
- Assignment submission rates
- Student attendance overview

### 💬 Notifications
- In-app and email notifications for task deadlines and updates

## 🎯 Key Highlights
- Fully responsive design for both desktop and mobile
- Accessible UI adhering to WCAG standards
- Secure login and session management
- Modular and scalable codebase following best practices

## 📁 Folder Structure (Frontend)

LEARNING_MANAGEMENT_SYSTEM/
└── my-app/
    ├── scripts/
    └── src/
        ├── components/
        │   ├── Dashboard.tsx
        │   ├── DashboardCharts.tsx
        │   ├── Footer.tsx
        │   ├── Sidebar.tsx
        │   ├── StatCard.tsx
        │   ├── TopBar.tsx
        │   └── UserTable.tsx
        ├── images/
        ├── utils/
        ├── App.css
        ├── App.test.tsx
        ├── App.tsx
        ├── index.css
        └── index.tsx


## 🧪 Setup Instructions
 -download the repo file
 - cs my-app
 - npm install
 - nom start


3. Environment Variables
Create .env files in both client/ and server/ directories with necessary configuration such as:

For Server
ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


🧑‍💻 Author
Your Name – @ProTech

Portfolio: https:/portfolio.protech.works

📃 License
