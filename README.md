# Project Management Application

A full-stack project management application built with modern web technologies. Manage workspaces, projects, tasks, and team collaboration all in one place.

![Project Management](https://img.shields.io/badge/Project-Management-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma)

## 🚀 Features

### Core Features

- **Multi-workspace Support** - Create and manage multiple workspaces
- **Project Management** - Create, track, and manage projects with progress tracking
- **Task Management** - Full CRUD operations with status, priority, and type classification
- **Team Collaboration** - Invite members, assign tasks, and manage team roles
- **Comments** - Discussion on tasks for better collaboration

### Task Features

- **Task Statuses**: TODO, IN_PROGRESS, DONE
- **Task Types**: TASK, BUG, FEATURE, IMPROVEMENT, OTHER
- **Priority Levels**: LOW, MEDIUM, HIGH
- **Due Dates**: Set and track task deadlines

### Project Features

- **Project Statuses**: ACTIVE, PLANNING, COMPLETED, ON_HOLD, CANCELLED
- **Progress Tracking**: Visual progress indicators
- **Date Management**: Start and end date tracking

### Additional Features

- **Dashboard** - Overview of all projects and tasks
- **Analytics** - Project statistics and insights
- **Calendar View** - Visual calendar for task scheduling
- **Recent Activity** - Track recent changes and updates

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Clerk** - Authentication
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **date-fns** - Date utilities
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **Prisma** - ORM
- **PostgreSQL** - Database (Neon)
- **Clerk** - Authentication
- **Inngest** - Background jobs
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
project-mgmt/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── app/             # Redux store configuration
│   │   ├── assets/          # Static assets & schemas
│   │   ├── components/      # Reusable React components
│   │   │   ├── AddProjectMember.jsx
│   │   │   ├── CreateProjectDialog.jsx
│   │   │   ├── CreateTaskDialog.jsx
│   │   │   ├── InviteMemberDialog.jsx
│   │   │   ├── MyTasksSidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectAnalytics.jsx
│   │   │   ├── ProjectCalendar.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectOverview.jsx
│   │   │   ├── ProjectSettings.jsx
│   │   │   ├── ProjectsSidebar.jsx
│   │   │   ├── ProjectTasks.jsx
│   │   │   ├── RecentActivity.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatsGrid.jsx
│   │   │   ├── TasksSummary.jsx
│   │   │   └── WorkspaceDropdown.jsx
│   │   ├── configs/         # Configuration files
│   │   ├── features/        # Redux slices
│   │   ├── pages/           # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── TaskDetails.jsx
│   │   │   └── Team.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── server/                   # Backend Node.js application
│   ├── configs/             # Configuration files
│   │   ├── nodemailer.js
│   │   └── prisma.js
│   ├── controllers/         # Route controllers
│   │   ├── commentController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   └── workspaceController.js
│   ├── inngest/             # Background jobs
│   ├── middlewares/         # Express middlewares
│   │   └── authMiddleware.js
│   ├── prisma/              # Database schema
│   │   └── schema.prisma
│   ├── routes/              # API routes
│   │   ├── commentRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   └── workspaceRoutes.js
│   ├── package.json
│   ├── prisma.config.js
│   └── server.js
│
└── README.md
```

## 🏁 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (Neon or local)
- **Clerk** account for authentication

### Installation

1. **Clone the repository**

```
bash
   git clone <repository-url>
   cd project-mgmt

```

2. **Install frontend dependencies**

```bash
   cd client
   npm install

```

3. **Install backend dependencies**

```
bash
   cd ../server
   npm install

```

### Configuration

1. **Backend Environment Variables**

    Create a `.env` file in the `server` directory:

```
env
   # Database (Neon)
   DATABASE_URL=postgresql://username:password@host/database

   # Clerk Authentication
   CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   CLERK_WEBHOOK_SECRET=whsec_...

   # Server
   PORT=5000
   NODE_ENV=development

```

2. **Frontend Environment Variables**

    Create a `.env` file in the `client` directory:

```
env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   VITE_API_URL=http://localhost:5000/api

```

### Running the Application

1. **Start the backend server**

```
bash
   cd server
   npm run server

```

The server will run on http://localhost:5000

2. **Start the frontend development server**

```
bash
   cd client
   npm run dev

```

The client will run on http://localhost:5173

3. **Generate Prisma Client** (first time only)

```
bash
   cd server
   npx prisma generate

```

### Building for Production

1. **Build frontend**

```
bash
   cd client
   npm run build

```

2. **Start production server**

```
bash
   cd server
   npm start

```

## API Endpoints

### Workspaces

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/workspaces`     | Get all workspaces  |
| POST   | `/api/workspaces`     | Create workspace    |
| GET    | `/api/workspaces/:id` | Get workspace by ID |
| PUT    | `/api/workspaces/:id` | Update workspace    |
| DELETE | `/api/workspaces/:id` | Delete workspace    |

### Projects

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/projects`     | Get all projects  |
| POST   | `/api/projects`     | Create project    |
| GET    | `/api/projects/:id` | Get project by ID |
| PUT    | `/api/projects/:id` | Update project    |
| DELETE | `/api/projects/:id` | Delete project    |

### Tasks

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| GET    | `/api/tasks`     | Get all tasks  |
| POST   | `/api/tasks`     | Create task    |
| GET    | `/api/tasks/:id` | Get task by ID |
| PUT    | `/api/tasks/:id` | Update task    |
| DELETE | `/api/tasks/:id` | Delete task    |

### Comments

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/comments`     | Get all comments |
| POST   | `/api/comments`     | Create comment   |
| DELETE | `/api/comments/:id` | Delete comment   |

## 📊 Database Schema

### Models

- **User** - Application users
- **Workspace** - Multi-tenant workspaces
- **WorkspaceMember** - Workspace membership with roles
- **Project** - Projects within workspaces
- **ProjectMember** - Project team members
- **Task** - Tasks within projects
- **Comment** - Task comments

### Enums

- **WorkspaceRole**: ADMIN, MEMBER
- **TaskStatus**: TODO, IN_PROGRESS, DONE
- **TaskType**: TASK, BUG, FEATURE, IMPROVEMENT, OTHER
- **ProjectStatus**: ACTIVE, PLANNING, COMPLETED, ON_HOLD, CANCELLED
- **Priority**: LOW, MEDIUM, HIGH

## 🔧 Scripts

### Client

```
bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Server

```
bash
npm run server   # Start development server with nodemon
npm start        # Start production server
npm run postinstall  # Generate Prisma client
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) - Authentication
- [Neon](https://neon.tech) - Database hosting
- [Vercel](https://vercel.com) - Deployment
- [Prisma](https://prisma.io) - Database ORM
- [Inngest](https://inngest.com) - Background jobs

---

Built with ❤️ using React and Node.js
