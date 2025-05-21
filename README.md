# HR Dashboard

A comprehensive Human Resource Management System built with React and TypeScript, featuring a modern UI and extensive employee management capabilities.

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
- **Container Support**: Docker with Nginx

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker (optional, for containerization)

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
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

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

### Docker Configuration

The project includes:
- `Dockerfile` - Multi-stage build for production
- `docker-compose.yml` - Development setup with hot-reload
- `nginx.conf` - Nginx configuration for serving the application

## 🌟 Features in Detail

### HR Management
- **Employee Directory**: Grid layout with employee cards showing key information
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

## 🔒 Security

- CORS configuration
- Security headers in Nginx
- XSS protection
- Content Security Policy
- Role-based access control

## 🚀 Deployment

### Vercel Deployment

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy to Vercel:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

The application will be automatically deployed and you'll receive a production URL.

#### Manual Deployment via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Visit [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Select the repository
6. Keep the default build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click "Deploy"

Your application will be automatically built and deployed to Vercel's global network.

### Environment Variables on Vercel

To add environment variables:
1. Go to your project on Vercel Dashboard
2. Navigate to Settings > Environment Variables
3. Add your environment variables:
   ```
   VITE_API_BASE_URL=https://dummyjson.com
   ```

### Production Build

```bash
npm run build
```