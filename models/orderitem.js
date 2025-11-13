const mongoose = require("mongoose");
const Product = require('./product')
const Order = require('./order')

const orderItemSchema = new mongoose.Schema({
  orderId: { type: String, ref: Order, index: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: Product, index: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true }, 
  status: {
    type: String,
    enum: ["placed", "shipped", "delivered", "returned", "cancelled"],
    default: "placed"
  },
  refundStatus: {
    type: String,
    enum: ["none", "initiated", "completed", "failed"],
    default: "none"
  },
  rawPrice:{
    type:Number
  },
  discount:{
    type:Number
  },
  appliedCoupon:{
    type:String
  },
  createdAt: { type: Date, default: Date.now }
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema) 
module.exports = OrderItem;
