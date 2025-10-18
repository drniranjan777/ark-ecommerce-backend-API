// models/Cart.js

const mongoose = require('mongoose');
const Product = require('../models/product')

const wishlistSchema = new mongoose.Schema(
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


const wishlistItemSchema = new mongoose.Schema({
  wishlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wishlist',
    required: true,
    index: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:Product,
    required: true,
    index:true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
},{timestamps:true});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
const WishlistItem= mongoose.model('WishlistItem', wishlistItemSchema);

module.exports = {
    Wishlist,
    WishlistItem
}
