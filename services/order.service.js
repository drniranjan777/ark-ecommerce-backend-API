const Order = require('../models/order')
const Product = require('../models/product')
const AppError = require('../utils/AppError')
const {Cart,CartItem} = require('../models/cart')

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

    const {items} = req.body

    const cart = await Cart.findOne({userId:user.id})

    if(!cart) throw new AppError('Cart not found',404)

    const cartItems = await CartItem.find({cartId:cart._id})

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
        items:orderItems,
        ...req.body,
    })

    if(!newOrder) throw new AppError('Order not created',500)
    
    await CartItem.deleteMany({cartId:cart._id})

    return newOrder
}

//get user orders
const getUserOrders = async(req) => {
   const user = req.user

   const userOrders = await Order.findOne({userId:user.id})

   if(!userOrders) throw new AppError('Orders not found',404)

   const products = await getProducts(userOrders.items)

   return products
}

//get all orders
const getAllOrders = async(req) => {
   const page = Number(req.query.page ||1)
   const limit = Number(req.query.limit || 10)
   const skip = (page - 1)*limit

   const orders = await Order.find().skip(skip).limit(limit).lean()

   const finalOrderswithProducts = await Promise.all(
     orders.map(async(order) => {
        const products = await getProducts(order.items)
        return products
     })
   )

   return finalOrderswithProducts
}

//update order
const updateOrder = async(req) => {
    const {orderId} = req.params
    
    const checkOrder = await Order.findById(orderId)

    if(!checkOrder) throw new AppError('Order not found',404)

    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {$set:req.body},
        {new:true}
    )

    if(!updatedOrder) throw new AppError('Order not updated',500)

    return updatedOrder
}

module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrder
}