const {OrderService} = require('../services/index')
const catchAsync = require('../utils/catchAsync')

//create order
const createOrder = catchAsync(async(req,res) => {
   const result = await OrderService.createOrder(req)

   return res.status(201).json({
    status:true,
    message:'Order Created',
    data:result
   })
})

//get user orders
const getUserOrders = catchAsync(async(req,res) => {
    const result = await OrderService.getUserOrders(req)

   return res.status(200).json({
    status:true,
    message:'Orders Fetched successfull',
    data:result
   })
})

//get all orders
const getAllOrders = catchAsync(async(req,res) => {
   const result = await OrderService.getAllOrders(req)

   return res.status(200).json({
    status:true,
    message:'Orders fetched successfull',
    data:result
   })
})

//update order
const updateOrder = catchAsync(async(req,res) => {
   const result = await OrderService.updateOrder(req)

   return res.status(200).json({
    status:true,
    message:'Order updated successfull',
    data:result
   })
})

//update order
const orderAnalytics = catchAsync(async(req,res) => {
   const result = await OrderService.orderAnalytics(req)

   return res.status(200).json({
    status:true,
    message:'Order fethched successfull',
    data:result
   })
})

//order details
const orderDetails = catchAsync(async(req,res) => {
   const result = await OrderService.orderDetails(req)

   return res.status(200).json({
    status:true,
    message:'Order details fethched successfull',
    data:result
   })
})

//update order item

const updateOrderItemStatus = catchAsync(async(req,res) => {
   const result = await OrderService.updateOrderItemStatus(req)

   return res.status(200).json({
    status:true,
    message:'Order item status updated successfull',
    data:result
   })
})

//update refund status

const updateRefundStatus = catchAsync(async(req,res) => {
   const result = await OrderService.updateRefundStatus(req)

   return res.status(200).json({
    status:true,
    message:'Refund status updated successfull',
    data:result
   })
})

//update refund status

const getOrderedStatusItems = catchAsync(async(req,res) => {
   const result = await OrderService.getOrderProductsByStatus(req)

   return res.status(200).json({
    status:true,
    message:'Items fetched successfull',
    data:result
   })
})

//By now controller

const buyNow = catchAsync(async(req,res) => {
   const result = await OrderService.buyNowFunction(req)

   return res.status(200).json({
    status:true,
    message:'Item stored in cache sucessfull',
    data:result
   })
})


//verify order payment controller
const verifyOrder = catchAsync(async(req,res) => {
   const result = await OrderService.verifyOrder(req)

   return res.status(200).json({
    status:true,
    message:'verify payment sucessfull',
    data:result
   })
})

module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrder,
    
    orderAnalytics,
    orderDetails,

    updateOrderItemStatus,
    updateRefundStatus,
    getOrderedStatusItems,

    buyNow,
    verifyOrder
}
