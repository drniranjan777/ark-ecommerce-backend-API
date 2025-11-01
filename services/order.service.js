const Order = require('../models/order')
const Product = require('../models/product')
const AppError = require('../utils/AppError')
const {Cart,CartItem} = require('../models/cart')
const OrderItem = require('../models/orderitem')

//get products
const getProducts = async(orderItems) => {
    const productsIds = orderItems.map(item => item.productId)

    const products = await Product.find({_id:{$in:productsIds}})

    let totalPrice = 0

    // console.log(orderItems,products,'orderrrrrrrrrr')

    products.forEach((product) => {
        orderItems.forEach(orderItem => {
            if(orderItem.productId.toString() === product._id.toString()){
                totalPrice = totalPrice + (orderItem.quantity*product.price)
            }
        })
    })


    return {products,totalPrice}
}

//create order
const createOrder = async(req) => {
    const user =  req.user

    // const {items} = req.body

    const cart = await Cart.findOne({userId:user.id})

    if(!cart) throw new AppError('Cart not found',404)

    const cartItems = await CartItem.find({cartId:cart._id}).populate('productId')

    if(!cartItems) throw new AppError('Cart items not found',404)


    const orderItems = cartItems.map((item) => {
        return {
            productId:item.productId,
            quantity:item.quantity
        }
    })

     
    const products =  await getProducts(orderItems)

    const newOrder = await Order.create({
        userId:user.id,
        totalPrice:products.totalPrice,
        // items:orderItems,
        ...req.body,
    })


    const createOrderItem =  await Promise.all(
        cartItems.map((item) => {
          return OrderItem.create({
            orderId: newOrder.orderId,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.productId.price * item.quantity,
            // totalPrice: item.price * item.quantity,
          })
        })
    )

    if(!newOrder) throw new AppError('Order not created',500)
    
    await CartItem.deleteMany({cartId:cart._id})

    return {newOrder,createOrderItem}
}

//get user orders
const getUserOrders = async(req) => {
   const user = req.user

   const userOrders = await Order.find({userId:user.id})

   if(!userOrders) throw new AppError('Orders not found',404)

//    const products = await getProducts(userOrders.items)

//    const orderedProducts = await Promise.all(
//      userOrders.map((item) => {
//        return {
//         products : OrderItem.find({orderId:item.orderId}).populate('productId'),
//         address : Order.findOne({orderId:item.orderId})
//     }
//      })
//    )

   const orderedProducts = await Promise.all(
    userOrders.map(async (order) => {
      const items = await OrderItem.find({ orderId: order.orderId })
        .populate("productId");

      return {
        orderId: order.orderId,
        address: order.address,
        paymentStatus:order.paymentStatus,
        createdAt: order.createdAt,
        totalPrice: order.totalPrice,
        status: order.status,
        products: items
      };
    })
  );

   return orderedProducts
}

//get all orders
const getAllOrders = async(req) => {
   const page = Number(req.query.page ||1)
   const limit = Number(req.query.limit || 10)
   const skip = (page - 1)*limit

    const { name, status } = req.query;


    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (status) filter.status = status;

    const orders = await Order.find(filter).skip(skip).limit(limit).lean()

    // const finalOrderswithProducts = await Promise.all(
    //     orders.map(async(order) => {
    //         const products = await getProducts(order.items)
    //         return {
    //             products,
    //             address:order.address
    //         }
    //     })
    // )

    const orderedProducts = await Promise.all(
        orders.map(async (order) => {
        const items = await OrderItem.find({ orderId: order.orderId })
            .populate("productId");

        return {
            orderId: order.orderId,
            address: order.address,
            totalPrice: order.totalPrice,
            status: order.status,
            products: items
        };
        })
    );

   return orderedProducts
}

//update order
const updateOrder = async(req) => {
    const {orderId} = req.params
    
    const checkOrder = await Order.findOne({orderId:orderId})

    if(!checkOrder) throw new AppError('Order not found',404)

    const updatedOrder = await Order.updateOne(
        {orderId:orderId},
        {$set:req.body},
        {new:true}
    )

    if(!updatedOrder) throw new AppError('Order not updated',500)

    return updatedOrder
}


// order analytics
const orderAnalytics = async(req,res) => {
  const orders = await Order.find()

  if(!orders) throw new AppError('Orders not fetched',500)


  const totalPrice = orders.reduce((acc,item) => {return acc+item.totalPrice},0)

  const totalOrders = await Order.countDocuments()
  const pendingOrders = await Order.find({status:'pending'}).countDocuments()
  const confirmedOrders = await Order.find({status:'confirmed'}).countDocuments()
}

//order details
const orderDetails = async(req) => {
    const {orderId} = req.params
    
    const orderDetails = await OrderItem.find({orderId:orderId}).populate('productId')

    // const products =  await getProducts(orderDetails.items)

    return orderDetails
}

//update order Item status

const updateOrderItemStatus = async(req) => {
   const {orderId,productId,status} = req.body

   const result = await OrderItem.updateOne(
    {orderId,productId},
    {$set:{status:status}},
    {new:true,runValidators: true}
   )


   if (result.matchedCount === 0) throw new AppError("Product not found", 404);
   if (result.modifiedCount === 0) throw new AppError("No changes made", 400);

   return result
}
 
//update refund status

const updateRefundStatus = async(req) => {
    const {orderId,productId,refundStatus} = req.body

   
    const result = await OrderItem.updateOne(
        {orderId,productId},
        {$set:{refundStatus:refundStatus}},
        {new:true,runValidators: true}
    )

    if (result.matchedCount === 0) throw new AppError("Product not found", 404);
    if (result.modifiedCount === 0) throw new AppError("No changes made", 400);

   return result
}

//get cancelled products
const getOrderProductsByStatus = async(req) => {
    const {status} = req.body
    const items = await OrderItem.find({status:status}).populate('productId')
    return items
}

module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrder,

    orderAnalytics,
    orderDetails,

    updateOrderItemStatus,
    updateRefundStatus,
    getOrderProductsByStatus
}