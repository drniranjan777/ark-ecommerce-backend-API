const Order = require('../models/order')
const Product = require('../models/product')
const AppError = require('../utils/AppError')
const {Cart,CartItem} = require('../models/cart')
const OrderItem = require('../models/orderitem')
const Coupon = require('../models/coupon')
const {createRazorpayOrder,verifyRazorpaySignature} = require('../utils/payment')

//get products
const getProducts = async(orderItems) => {
    const productsIds = orderItems.map(item => item.productId)

    const products = await Product.find({_id:{$in:productsIds}})

    let totalPrice = 0

    products.forEach((product) => {
        orderItems.forEach(orderItem => {
            if(orderItem.productId._id.toString() === product._id.toString()){
                totalPrice = totalPrice + (orderItem.quantity*product.price)
            }
        })
    })

    // console.log(totalPrice,'totla calll')

    return {products,totalPrice}
}

//create order
const createOrder = async(req) => {
    const user =  req.user

    const orderSource = req.query.buyNow === "true" 
    const appliedCoupon = req.body.coupon

    let cart = await Cart.findOne({userId:user.id})

    if(!cart) cart = await Cart.create({userId:user.id})


    const calculateTotal = async(rawPrice) => {

        let discount = 0
        let finalPrice = rawPrice


        if(appliedCoupon){
            const coupon = await Coupon.findOne({coupon : appliedCoupon})

            if(!coupon) throw new AppError('Coupon not found',404)
            
            discount = (rawPrice * coupon.discount) / 100;

            finalPrice = rawPrice - discount
        }

       
  
        return {
            finalPrice,
            discount,
            rawPrice
        }

    }

    if(orderSource) {

        if(!req.session.buyNow.productId || !req.session.buyNow.quantity) throw new AppError('No item found',404)

        const productSession= req.session.buyNow

        const buyNowProduct = await Product.findById(productSession.productId)

        const orderPrice = await calculateTotal(buyNowProduct.price*productSession.quantity)


        const newOrder = await Order.create({
            userId:user.id,
            totalPrice:Math.floor(orderPrice.finalPrice),
            discount:Math.floor(orderPrice.discount),
            rawPrice:orderPrice.rawPrice,
            appliedCoupon:appliedCoupon?appliedCoupon:'No coupon applied',
            // items:orderItems,
            ...req.body,
        })

         
        const createdOrderItem = await OrderItem.create({
            orderId: newOrder.orderId,
            productId: productSession.productId,
            quantity: productSession.quantity,
            unitPrice: orderPrice.finalPrice,
            discount:orderPrice.discount,
            rawPrice:orderPrice.rawPrice,
            appliedCoupon:appliedCoupon?appliedCoupon:'No coupon applied'
            // totalPrice: item.price * item.quantity,
        })

        const payment = await createRazorpayOrder(
            orderPrice.finalPrice,
            newOrder.orderId,
            newOrder._id.toString(),
            "Buy Now Order"
        );

        newOrder.paymentOrderId = payment.gatewayId;
        await newOrder.save();

        req.session.buyNow = null

        return {createdOrderItem,newOrder,payment}
    }

    const cartItems = await CartItem.find({cartId:cart._id}).populate('productId')

    if(cartItems.length === 0) throw new AppError('Cart items not found',404)


    const orderItems = cartItems.map((item) => {
        return {
            productId:item.productId,
            quantity:item.quantity
        }
    })

     
    const products =  await getProducts(orderItems)

    const orderPrice = await calculateTotal(products.totalPrice)

    const newOrder = await Order.create({
        userId:user.id,
        totalPrice:orderPrice.finalPrice,
        discount:orderPrice.discount,
        rawPrice:orderPrice.rawPrice,
        appliedCoupon:appliedCoupon?appliedCoupon:'No coupon applied',
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
            discount:orderPrice.discount,
            rawPrice:orderPrice.rawPrice,
            appliedCoupon:appliedCoupon?appliedCoupon:'No coupon applied'
            
            // totalPrice: item.price * item.quantity,
          })
        })
    )

    if(!newOrder) throw new AppError('Order not created',500)

    const payment = await createRazorpayOrder(
        orderPrice.finalPrice,
        newOrder.orderId,
        newOrder._id.toString(),
        "Buy Now Order"
    );

    newOrder.paymentOrderId = payment.gatewayId;
    await newOrder.save();
    
    await CartItem.deleteMany({cartId:cart._id})

    return {newOrder,createOrderItem,payment}
}

//verify  order payment

const verifyPayment = async(req) => {
    const {razorpayOrderId,razorpayPaymentId,razorpaySignature,paymentGatewayId} = req.body

    const checkPaymentOrder = await Order.findOne({paymentOrderId:paymentOrderId})

    if(!checkPaymentOrder) throw new AppError('Order not found',404)
    
    const attributes = {
        orderCreationId: razorpayOrderId,
        razorpayPaymentId: razorpayPaymentId,
        razorpaySignature: razorpaySignature,
    };

    const isValid = await verifyRazorpaySignature(attributes);

    if(!isValid) throw new AppError("Failed to verify payment",400) 

    await Order.findOneAndUpdate(
        {paymentOrderId:paymentGatewayId},
        {$set:{status:'confirmed',paymentStatus:'paid'}},
        {new:true}
    )
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

  const totalRevenue = orders.reduce((acc,item) => {return acc+Number(item.totalPrice)},0)

  const result = await Order.aggregate([
    {
        $group: {
        _id: null,
        total: { $sum: 1 },
        pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
        confirmed: { $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] } },
        shipped: { $sum: { $cond: [{ $eq: ["$status", "shipped"] }, 1, 0] } },
        cancelled: { $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] } },
        }
    }
   ]);

  const statistics = result[0];

  return {
    totalRevenue:Math.floor(totalRevenue),
    averagePrice:Math.floor(totalRevenue/statistics.total),
    statistics
  }

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

//buy now service 

const buyNowFunction = async(req) => {
    // console.log
    // console.log(req.session.buyNow,'jljjjjljllj')
    const {productId,quantity} = req.body
    req.session.buyNow = {
        productId: productId,
        quantity: quantity
    }
    
    req.session.save()
    return
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
    getOrderProductsByStatus,

    buyNowFunction,
    verifyPayment
}