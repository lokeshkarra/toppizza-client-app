# TopPizza - React Frontend

Welcome to **TopPizza**, a React-based pizza ordering web application. This project showcases expertise in **React, Node.js, SQLite, and Fastify** by offering a full-stack implementation of a pizza ordering system.

## 🚀 Features
- 🍕 **Browse Pizzas:** View available pizzas with detailed descriptions and pricing.
- 🎲 **Pizza of the Day:** Get a daily special pizza recommendation.
- 🛒 **Cart & Orders:** Add pizzas to the cart and place orders.
- 📜 **Past Orders:** View order history (per user) and order details.
- 🔗 **API Integration:** Seamless communication with a Fastify backend using SQLite.

## 🛠️ Tech Stack
### Frontend
- **React 18** with Vite for fast development
- **TanStack Router** for routing
- **TanStack React Query** for data fetching
- **Testing:** Vitest and Playwright

### Backend
- **Fastify** for a lightweight and fast Node.js server
- **SQLite** for a cost-effective and file-based database

## 🔧 Setup & Installation

### Prerequisites
- Node.js (latest LTS recommended)
- npm or yarn

### Clone the repository
```sh
git clone https://github.com/lokeshkarra/toppizza-client-app.git
cd toppizza-client-app
```

### Install dependencies
```sh
npm install
```

### Start the development server
```sh
npm run dev
```

## 📝 API Integration
The frontend connects to a Fastify backend running on `http://localhost:3000/`. The **Vite proxy** is configured to forward API requests to the backend.

## 🧪 Testing
Run unit and UI tests with:
```sh
npm run test
npm run test:ui
```

## 🌟 Future Improvements
- 🔐 User Authentication for personalized past orders
- 💳 Payment Integration for real transactions
- 📈 Admin Dashboard for order management



---
👨‍💻 **Developed by [Lokeshwar Reddy Karra](https://github.com/lokeshkarra)**

