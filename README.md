# HR Dashboard

A comprehensive Human Resource Management System built with React and TypeScript, featuring a modern UI and extensive employee management capabilities.

## 🌐 Live Demo

Check out the live application: [HR Dashboard](https://hr-dashboard-6q1cbjnsa-ashirvaddubeys-projects.vercel.app)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg?style=flat-square&logo=vercel)](https://hr-dashboard-6q1cbjnsa-ashirvaddubeys-projects.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-green.svg?style=flat-square&logo=github)](https://github.com/Ashirvaddubey/HR-Dashboard)

## 🚀 Features

- **HR Management**
  - View all employees in a responsive grid layout
  - Add new employees with detailed information
  - Search and filter employees by various criteria
  - Bookmark important employee profiles
  - View detailed employee information
  - Track employee performance and ratings

- **Analytics Dashboard**
  - Track average employee ratings
  - Monitor department-wise statistics
  - Real-time updates on employee data changes
  - Performance metrics visualization

- **Modern UI/UX**
  - Responsive design for all screen sizes
  - Dark/Light theme support
  - Beautiful animations and transitions
  - Intuitive navigation
  - Toast notifications for user feedback

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query for server state
- **Build Tool**: Vite
- **API Integration**: DummyJSON API
- **Deployment**: Vercel
- **Container Support**: Docker with Nginx

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker (optional, for containerization)

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Ashirvaddubey/HR-Dashboard.git
cd hr-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173

### Docker Development

1. Build the Docker image:
```bash
docker build -t hr-dashboard .
```

2. Run the container:
```bash
docker run -d -p 8080:80 hr-dashboard
```

Visit http://localhost:8080 to access the application.

For development with hot-reload:
```bash
docker-compose up
```

## 🏗️ Project Structure

```
hr-dashboard/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── employee/      # Employee-related components
│   │   ├── filters/       # Filter components
│   │   └── ui/           # Base UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── context/          # React context providers
│   └── App.tsx          # Main application component
├── public/              # Static assets
├── docker/             # Docker configuration files
└── package.json        # Project dependencies
```

## 🌟 Key Features

### HR Management
- **Employee Directory**: Grid layout with employee cards
- **Employee Management**: 
  - Add/Edit employee information
  - Track employee performance
  - Manage departments and roles
- **Search & Filter**: 
  - Search by name, email, or department
  - Filter by department, role, or status
  - Sort by various criteria
- **Performance Tracking**: Monitor employee ratings and metrics

### Theme Support
- Light/Dark mode toggle
- System preference detection
- Persistent theme selection

## 🚀 Deployment

The application is deployed on Vercel and can be accessed at:
[https://hr-dashboard-6q1cbjnsa-ashirvaddubeys-projects.vercel.app](https://hr-dashboard-6q1cbjnsa-ashirvaddubeys-projects.vercel.app)

### Manual Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

## 📈 Performance Optimizations

- React Query for efficient data fetching
- Image optimization
- Code splitting
- Lazy loading of components
- Nginx caching configuration
- Gzip compression

## 👥 Author

Ashirvad Dubey

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

For any questions or issues, please open an issue in the repository.