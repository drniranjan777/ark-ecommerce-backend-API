// models/Cart.js

const mongoose = require('mongoose');
const Product = require('../models/product')

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String, 
      required: true,
      index: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    },

    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true 
  }
);


const cartItemSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
    index: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:Product,
    required: true,
    index:true
  },
  quantity: {
    type: Number,
    default: 1
  },
  priceAtAdd: {
    type: Number
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', cartSchema);
const CartItem= mongoose.model('CartItem', cartItemSchema);

module.exports = {
    Cart,
    CartItem
}
