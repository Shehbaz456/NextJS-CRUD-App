# Next.js User CRUD Application

A **professional, production-ready User CRUD application** built with
**Next.js 15 App Router**, **TypeScript**, and the **JSONPlaceholder
API**.\
This project demonstrates modern routing, data fetching, optimistic UI
updates, and clean application architecture using the latest Next.js
conventions.

------------------------------------------------------------------------

## 🚀 Live Demo

-   **Live URL:** https://your-vercel-url.vercel.app\
-   **GitHub Repository:** https://github.com/yourusername/nextapicrud

------------------------------------------------------------------------

## ✨ Key Features

-   🔹 View all users in a clean, responsive UI\
-   🔹 View individual user details via dynamic routing\
-   🔹 Update user information with optimistic UI\
-   🔹 Delete users with instant UI feedback\
-   🔹 Fully typed with TypeScript\
-   🔹 Graceful error handling & rollback\
-   🔹 Modern Next.js 15 App Router architecture\
-   🔹 Mobile‑first responsive design using Tailwind CSS

------------------------------------------------------------------------

## 🛠 Tech Stack

  Category     Technology
  ------------ -------------------------
  Framework    Next.js 15 (App Router)
  Language     TypeScript
  Styling      Tailwind CSS 4
  API          JSONPlaceholder
  Routing      File‑based App Router
  Deployment   Vercel

------------------------------------------------------------------------

## 🧭 Application Routes (Complete Routing Details)

### Frontend Routes

  ----------------------------------------------------------------------------
  Route           File Location                   Description
  --------------- ------------------------------- ----------------------------
  `/`             `src/app/page.tsx`              Home page

  `/users`        `src/app/users/page.tsx`        Users list page

  `/users/[id]`   `src/app/users/[id]/page.tsx`   User details, edit & delete

  `*`             Built‑in Next.js fallback       Handles invalid routes
  ----------------------------------------------------------------------------

### Route Explanation

-   **`/users`**
    -   Fetches all users from the API
    -   Displays user name and email
    -   Each user links to `/users/[id]`
-   **`/users/[id]`**
    -   Dynamic route using App Router
    -   Displays full user details
    -   Supports **Update** and **Delete**
    -   Uses optimistic UI updates

------------------------------------------------------------------------

## 🌐 External API Endpoints Used

All data operations use **JSONPlaceholder**:

  Method   Endpoint        Purpose
  -------- --------------- -------------------
  GET      `/users`        Fetch all users
  GET      `/users/{id}`   Fetch single user
  PUT      `/users/{id}`   Update user
  DELETE   `/users/{id}`   Delete user

⚠️ **Note:** JSONPlaceholder is a mock API. Changes are simulated only.

------------------------------------------------------------------------

## 📁 Project Structure

    nextapicrud/
    ├── src/
    │   ├── app/
    │   │   ├── users/
    │   │   │   ├── [id]/
    │   │   │   │   └── page.tsx     # User details (View / Edit / Delete)
    │   │   │   └── page.tsx         # Users list
    │   │   ├── layout.tsx           # Root layout
    │   │   ├── page.tsx             # Home page
    │   │   └── globals.css          # Global styles
    │   ├── types/
    │   │   └── user.ts              # User TypeScript interface
    ├── public/
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    └── README.md

------------------------------------------------------------------------

## 💻 Installation & Setup

### Prerequisites

-   Node.js **18+**
-   npm / yarn / pnpm

### Clone Repository

``` bash
git clone https://github.com/yourusername/nextapicrud.git
cd nextapicrud
```

### Install Dependencies

``` bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server

``` bash
npm run dev
```

Open: **http://localhost:3000**

------------------------------------------------------------------------

## ⚡ Optimistic UI Strategy

### Update Flow

1.  UI updates instantly
2.  API request runs in background
3.  Rollback occurs on failure

``` ts
setUser({ ...user, ...formData })
setIsEditing(false)
await fetch(`/users/${id}`, { method: 'PUT' })
```

### Delete Flow

``` ts
router.push('/users')
await fetch(`/users/${id}`, { method: 'DELETE' })
```

------------------------------------------------------------------------

## 🔧 Next.js 15 Dynamic Params Handling

Next.js 15 passes route params as **Promises**.

``` ts
'use client'
import { use } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
}
```

------------------------------------------------------------------------

## 🧪 TypeScript Model

``` ts
export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}
```

------------------------------------------------------------------------

## 🚢 Deployment (Vercel)

``` bash
git add .
git commit -m "Initial commit"
git push origin main
```

1.  Visit https://vercel.com\
2.  Import GitHub repository\
3.  Click **Deploy**

------------------------------------------------------------------------

## 🐛 Known Limitations

-   No real database (mock API)
-   Data resets on refresh
-   Limited to JSONPlaceholder dataset

------------------------------------------------------------------------

## 📌 Assignment Coverage

-   ✅ CRUD Operations
-   ✅ Dynamic Routing
-   ✅ Optimistic UI
-   ✅ TypeScript
-   ✅ Next.js 15 App Router
-   ✅ Deployed Application

------------------------------------------------------------------------

## 👨‍💻 Author

**Md Shehbaz**
- GitHub: https://github.com/Shehbaz456\
- Portfolio: https://shehbaz456.github.io/Portfolio

------------------------------------------------------------------------

## 📄 License

MIT License

------------------------------------------------------------------------

**Built with ❤️ using Next.js 16**
