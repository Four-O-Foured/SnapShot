# SnapNotes

SnapNotes is a modern, AI-powered note-taking application designed to streamline how you capture and organize your thoughts. Built with a robust MERN stack and enhanced with cutting-edge UI libraries, it offers a seamless and visually engaging user experience.

## ✨ Features

- **AI-Powered Generation**: Leverage Google's GenAI for smart note generation and content enhancement.
- **Rich Media Support**: Integrated with ImageKit for efficient image management.
- **Modern UI/UX**: A responsive and animated interface built with TailwindCSS v4, Framer Motion, and GSAP.
- **Secure Authentication**: JWT-based authentication with secure password handling.
- **Efficient State Management**: Powered by Redux Toolkit and React Query for optimal performance.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19 (Vite)
- **Styling**: TailwindCSS v4, Tailwind Merge, CLSX
- **Animations**: Framer Motion, GSAP
- **State Management**: Redux Toolkit, TanStack Query (React Query)
- **Routing**: TanStack Router
- **UI Components**: Radix UI Primitives, Lucide React Icons
- **Forms**: React Hook Form, Zod

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Google GenAI SDK
- **File Storage**: ImageKit
- **Authentication**: JsonWebToken (JWT), Bcrypt, Cookie Parser
- **Validation**: Zod

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Instance

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Four-O-Foured/SnapNotes.git
   cd SnapNotes
   ```

2. **Frontend Setup**

   ```bash
   cd FrontEnd
   npm install
   or
   pnpm install
   # Create a .env file based on your configuration
   npm run dev
   or
   pnpm dev
   ```

3. **Backend Setup**
   ```bash
   cd BackEnd
   npm install
   # Create a .env file with necessary keys (DB connection, API keys)
   npm start
   ```

## 📜 Scripts

### Frontend

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint

### Backend

- `npm start`: Start the server with Nodemon

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
