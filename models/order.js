const mongoose = require('mongoose');
const Product = require('../models/product')
const { v4: uuidv4 } = require("uuid");


const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
    default: () => `ORD-${uuidv4()}`, // Auto-generate unique order ID
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  address: {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
  },
  // items: [
  //   {
  //     productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: Product },
  //     quantity: { type: Number, required: true },
  //   }
  // ],
  status: {
    type: String,
    enum: ['pending','confirmed','shipped','delivered','cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid','paid','failed'],
    default: 'unpaid'
  },
  totalPrice:{
    type:Number,
    required:true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Orders = mongoose.model('Order',orderSchema)

module.exports = Orders
