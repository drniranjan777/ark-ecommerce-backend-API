const {OrderService} = require('../services/index')
const catchAsync = require('../utils/catchAsync')

//create order
const createOrder = catchAsync(async(req,res) => {
   const result = await OrderService.createOrder(req)

   return res.status(202).json({
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

   return res.status(202).json({
    status:true,
    message:'Order updated successfull',
    data:result
   })
})

module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrder
}
