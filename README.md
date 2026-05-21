🚀 IdeaVault – Startup Idea Sharing Platform
🌐 Live Site

📌 Project Overview

IdeaVault is a modern web-based startup idea sharing platform where users can:

Share innovative startup ideas
Explore ideas from other users
Comment, discuss, and give feedback
Validate ideas through community interaction

This platform focuses on idea collaboration, creativity, and validation rather than booking or scheduling.

✨ Key Features
🔐 JWT Authentication (Login / Register / Google Login)
🧠 Create, Read, Update, Delete (CRUD) Ideas
💬 Comment system (add, edit, delete own comments)
🔎 Search ideas by title (case-insensitive regex)
🎯 Filter by category & date range
📌 My Ideas dashboard (user-specific data)
📊 My Interactions (comment activity tracking)
🏠 Trending ideas section (limit-based)
🌗 Dark / Light theme toggle
📱 Fully responsive (Mobile, Tablet, Desktop)
⚡ Protected routes (Add Idea, My Ideas, Interactions)
🛠️ Tech Stack
Frontend
Next.js (App Router)
React Hook Form
Tailwind CSS
React Toastify
Hero UI / ShadCN UI
Context API / Hooks
Backend
Node.js
Express.js
MongoDB (Atlas)
JWT Authentication
Cookie-based session
🔐 Authentication System
JWT token generated on login
Stored in httpOnly cookie
Protected routes using middleware
Supports:
Email & Password login
Google OAuth login
📄 Pages Overview
🏠 Home Page
Banner slider (3+ slides)
Trending ideas (6 limit)
Explore CTA section
💡 Ideas Page
3-column grid layout
Search by title (regex)
Filter by category
Filter by date range
View Details button
➕ Add Idea (Private)

Users can submit startup ideas with:

Title
Short description
Detailed description
Category
Tags
Image URL
Budget (optional)
Target audience
Problem & solution
📌 Idea Details (Private)
Full idea information
Comment system:
Add comment
Edit own comment
Delete own comment
📂 My Ideas (Private)
Shows user-created ideas
Update (modal)
Delete (confirmation modal)
💬 My Interactions (Private)
Shows all user comments
Activity tracking system
🔑 Authentication Pages
Login page
Register page
Google login support
Password validation:
Minimum 6 characters
Uppercase + lowercase required
🎨 UI/UX Features
Clean modern UI
Consistent spacing & typography
Uniform card design
Responsive layout
Toast notifications for all actions
No lorem ipsum used
⚙️ Backend Features
REST API structure
MongoDB database integration
Secure JWT authentication
Protected API routes
Search & filter using MongoDB queries:
$regex
$gte, $lte
🌙 Theme System
Dark / Light mode toggle
Persistent across pages
Global UI support
🚀 Deployment
Frontend: Vercel
Backend: Render / Railway
MongoDB: Atlas
📦 Installation
Client
npm install
npm run dev
Server
npm install
node index.js
