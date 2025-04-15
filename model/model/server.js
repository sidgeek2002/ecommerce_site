require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ username, password: hash });
    res.json({ success: true });
  } catch {
    res.status(400).json({ success: false, message: 'Username taken' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ success: false, message: 'Invalid login' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ success: false, message: 'Invalid login' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ success: true, token });
});

// Middleware for protected routes
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add to cart
app.post('/cart', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.userId });

  if (!cart) cart = await Cart.create({ userId: req.userId, items: [] });

  const existing = cart.items.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json({ success: true });
});

// Get cart
app.get('/cart', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId });
  res.json(cart || { items: [] });
});

// Dummy Payment
app.post('/checkout', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  // Simulate payment
  await Cart.deleteOne({ userId: req.userId });
  res.json({ success: true, message: 'Payment successful (dummy)' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
