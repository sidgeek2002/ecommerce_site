const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: [{ productId: String, quantity: Number }]
});

module.exports = mongoose.model('Cart', cartSchema);
