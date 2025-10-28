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

    // const {items} = req.body

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

   return {
    products,
    orderDetails:userOrders
}
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

    const finalOrderswithProducts = await Promise.all(
        orders.map(async(order) => {
            const products = await getProducts(order.items)
            return {
                products,
                address:order.address
            }
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


// order analytics
const orderAnalytics = async(req,res) => {
  const orders = await Order.find()

  if(!orders) throw new AppError('Orders not fetched',500)


  const totalPrice = orders.reduce((acc,item) => {return acc+item.totalPrice},0)

  const totalOrders = await Order.countDocuments()
  const pendingOrders = await Order.find({status:'pending'}).countDocuments()
  const confirmedOrders = await Order.find({status:'confirmed'}).countDocuments()
}

const orderDetails = async(req) => {
    const {orderId} = req.params
    
    const orderDetails = await Order.findById(orderId)

    const products =  await getProducts(orderDetails.items)

    return products
}

 
module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrder,

    orderAnalytics,
    orderDetails
}