const {Cart,CartItem} = require('../models/cart')
const Product = require('../models/product')
const AppError = require('../utils/AppError')

//add item to cart

const addItemToCart = async(req) => {
    const user = req.user
    const {productId,quantity} = req.body

    
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found",404);
    
    let cart = await Cart.findOne({userId:user.id})

    if(!cart){
        cart = await Cart.create({ userId: user.id });
    }


    let cartItem = await CartItem.findOne({cartId:cart._id,productId:productId})


    if(cartItem){
        cartItem.quantity = cartItem.quantity+quantity
        cartItem.priceAtAdd = cartItem.priceAtAdd + product.price
        cartItem = await cartItem.save();
    }
    else{
     cartItem = await CartItem.create({
            cartId:cart.id,
            productId,
            quantity,
            priceAtAdd:product.price
        })
    }

    if(!cartItem){
        throw new AppError('Item not added',500)
    }

    return cartItem
}

//updtae cart

const updateCart = async(req) => {
    const user = req.user
    const {productId,quantity} = req.body

    const cart = await Cart.findOne({userId:user.id})


    if(!cart){
        throw new AppError('Cart not found',404)
    }

    let cartItem = await CartItem.findOne({cartId:cart._id,productId:productId})

    if(!cartItem){
        throw new AppError('Cart Item not found',404)
    }

    cartItem.quantity = cartItem.quantity + quantity

    cartItem = await cartItem.save()

    if(!cartItem){
        throw new AppError('Item not updated',500)
    }

    return cartItem
}

//remove item from cart

const removeItemFromCart = async(req) => {
    const {productId} = req.body

    const user = req.user
    
    const cart = await Cart.findOne({userId:user.id})

    if(!cart){
        throw new AppError('Cart not found',404)
    }

    const removedItem = await CartItem.findOneAndDelete({cartId:cart._id,productId:productId})

    if(!removedItem){
        throw new AppError('Item not removed from cart',500)
    }

    return removedItem

}

//clear cart

const clearCart = async(req) => {
  
    const user = req.user
    
    const cart = await Cart.findOne({userId:user.id})

    if(!cart){
        throw new AppError('Cart not found',404)
    }

    const removedItem = await CartItem.deleteMany({cartId:cart._id})

    if(!removedItem){
        throw new AppError('Item not removed from cart',500)
    }

    return removedItem

}

//get user cart items
const getUserCartItems = async(req) => { 
   const user = req.user

   const cart = await Cart.findOne({userId:user.id})

   if(!cart) throw new AppError('Cart not found',404)

   const cartItems = await CartItem.find({cartId:cart._id}).populate('productId').lean()

   if(!cartItems) throw new AppError('Cart items not found',500)

   const totalPrice = cartItems.reduce((acc,item) => acc = acc + item.priceAtAdd,0)

   return {cartItems,totalPrice}
}

module.exports = {
    addItemToCart,
    updateCart,
    removeItemFromCart,
    clearCart,
    getUserCartItems
}