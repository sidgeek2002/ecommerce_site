# ecommerce_site
new repo
Here's a well-structured `README.md` for your eCommerce Node.js app:

---

# 🛒 Simple E-Commerce API (Node.js, MongoDB, JWT)

A basic e-commerce backend built with **Express.js**, **MongoDB**, **JWT**, and **bcryptjs**, featuring user authentication, product listing, shopping cart, and a dummy checkout system.



📌 Features

* 🔐 User Registration & Login (JWT-based auth)
* 📦 Product Catalog (View all products)
* 🛒 Add to Cart & View Cart
* 💳 Dummy Checkout
* 🔐 Protected Routes using JWT middleware


 🧰 Tech Stack

| Tech       | Usage                         |
| ---------- | ----------------------------- |
| Node.js    | Server-side JavaScript        |
| Express.js | Web framework                 |
| MongoDB    | NoSQL database                |
| Mongoose   | MongoDB ODM                   |
| JWT        | Token-based authentication    |
| bcryptjs   | Password hashing              |
| dotenv     | Environment variables         |
| CORS       | Cross-origin requests support |

---

 ⚙️ Setup Instructions

 1. Clone the Repository




 2. Install Dependencies

```bash
npm install
```

 3. Create `.env` File

```bash
touch .env
```

Add the following content:

```
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=yourSecretKey
```

4. Start the Server

```bash
node index.js
```

Server runs on `http://localhost:3000`

---

📡 API Endpoints

🧑‍💻 Auth

* `POST /register` – Register a user
* `POST /login` – Login and get JWT token

📦 Products

* `GET /products` – List all products

🛒 Cart (Auth Required)

* `GET /cart` – Get current user’s cart
* `POST /cart` – Add product to cart

  ```json
  {
    "productId": "123abc",
    "quantity": 2
  }
  ```

 💳 Checkout (Auth Required)

* `POST /checkout` – Clear cart and simulate payment

---

🔐 Authentication

Include your JWT in the request headers:

```
Authorization: your_jwt_token
```

---
 📁 Project Structure

```
.
├── models
│   ├── Cart.js
│   ├── Product.js
│   └── User.js
├── .env
├── index.js
└── README.md
```

---

 ✅ To Do

* Admin panel for managing products
* Product image uploads
* Real payment integration (Stripe, Razorpay)
* Order history feature

---

 
