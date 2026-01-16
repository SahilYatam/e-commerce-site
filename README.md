# 🛒 Quick Mart — E-Commerce Platform

**Repository Name:** e-commerce-site
**Live Project Name:** Quick Mart

🔗 **GitHub Repository:**
[https://github.com/SahilYatam/e-commerce-site](https://github.com/SahilYatam/e-commerce-site)

🔗 **Live Project:**
https://e-commerce-site-nine-eta.vercel.app/

🌐 **Deployment:**

* **Frontend:** Vercel
* **Backend:** Render

---

## 📌 Project Overview

Quick Mart is a full-stack E-Commerce web application built using the MERN architecture. The platform supports two primary roles: **Buyer** and **Seller**. Buyers can browse products publicly and perform authenticated purchasing actions. A single Seller manages product lifecycle and order processing.

The system implements secure authentication using JWT with rotating refresh tokens, role-based access control, cart management, and order lifecycle tracking.

This project was developed as a portfolio project to demonstrate real-world full-stack engineering practices including REST API design, state management, authentication strategy, deployment pipelines, and scalable code organization.

---

## ⚙️ Tech Stack

### Frontend

* React
* Tailwind CSS (UI Styling)
* Axios (HTTP Client)
* Redux Toolkit (RTK)
* Async Thunk (Side-effect management)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose ODM
* JWT Authentication (Access Token + Rotating Refresh Token)

### Deployment

* Frontend: Vercel
* Backend: Render

### Tooling

* Postman Collection for API testing

---

## 👥 System Roles & Permissions

### Seller (Single Admin User)

The platform supports a single Seller account for administrative simplicity.

**Capabilities**

* Create products
* Update products
* Delete products
* View customer orders
* Accept or reject orders

---

### Buyer (Authenticated User)

Buyers represent end users who purchase products.

**Capabilities**

* Browse and search products without authentication
* Register and login to access transactional features
* Add products to cart
* Remove products from cart
* Update product quantity
* Add delivery address (one-time setup)
* Place orders
* View order history and order status

**Order Status Lifecycle**

* Pending
* Accepted
* Rejected
* Canceled

---

## 🛍 Core Features

### ✅ Product Management

* Seller can create, update, and delete products.
* Buyers can browse and search products without login.

### ✅ Cart Management

* Buyers can add products to cart after authentication.
* Quantity can be updated dynamically.
* Items can be removed from cart.

### ✅ Order Management

* Buyer adds delivery address once.
* Buyer places order (no real payment integration).
* Orders are created instantly.
* Seller accepts or rejects orders.
* Buyer can track order history and status.

### ✅ Authentication & Authorization

* JWT-based authentication.
* Access token + rotating refresh token strategy.
* Role-based route protection.
* Public routes allow browsing without login.

---

## 🔐 Authentication Flow

### Registration

User registers using:

* Name
* Email
* Password

### Login

User logs in using:

* Email
* Password

### Token Strategy

* Short-lived access tokens.
* Refresh token rotation for improved security.
* Automatic token refresh handled on client side.

---

## 🔄 Application Workflow

### Buyer Flow

1. Browse products without authentication.
2. Register or login.
3. Add products to cart.
4. Update cart quantities or remove items.
5. Add delivery address (one-time).
6. Place order.
7. Track order status.

### Seller Flow

1. Seller logs in.
2. Manage product inventory.
3. Review incoming orders.
4. Accept or reject orders.

---

## ⚠️ Limitations & Assumptions

* Only one seller account exists.
* No real payment gateway integration.
* Address is captured once per user.
* Inventory stock tracking is minimal.
* No real-time notifications or shipment tracking.

These constraints were intentionally applied to keep scope manageable while maintaining architectural clarity.

---

## 🚀 Future Enhancements

* Multi-seller marketplace support
* Payment gateway integration (Stripe / Razorpay)
* Inventory stock management
* Order invoice generation
* Admin analytics dashboard
* Notification system (WebSockets / Push)
* Product ratings and reviews
* Multi-address support

---

## 🛠 Setup & Installation

### Prerequisites

* Node.js
* MongoDB
* Git

### Clone Repository

```bash
git clone https://github.com/SahilYatam/e-commerce-site.git
cd e-commerce-site
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` file:

```
PORT=
MONGO_URI=
ACCESS_TOKEN=
NODE_ENV=
CLIENT_URL(add frontend url)=

# Email
SMTP_PORT=
SMTP_HOST=
EMAIL_USER=
EMAIL_PASSWORD=

# cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---
