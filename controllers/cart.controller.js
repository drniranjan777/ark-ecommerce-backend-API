const {CartService} = require("../services/index")
const catchAsync = require('../utils/catchAsync')


//add item to cart

const addItemToCart = catchAsync(async(req,res) =>{

    const result = await CartService.addItemToCart(req)

   return res.status(200).json({
        status:true,
        message:'Item added to cart',
        data:result
    })

})

//update cart

const updateCart = catchAsync(async(req,res) => {
    const result = await CartService.updateCart(req)
    return res.status(200).send({
        status:true,
        message:"Updated successfull",
        data:result
    })
})

//remove item from cart

const removeItemFromCart = catchAsync(async(req,res) => {
    const result = await CartService.removeItemFromCart(req)
    return res.status(200).send({
        status:true,
        message:"Item removed from cart",
        data:result
    })
})

//clear cart

const clearCart = catchAsync(async(req,res) => {
    const result = await CartService.clearCart(req)
    return res.status(200).send({
        status:true,
        message:"Cart cleared",
        data:result
    })
})

//get user cart items

const getUserCartItems = catchAsync(async(req,res) =>{
    const result = await CartService.getUserCartItems(req)
    return res.status(200).send({
        status:true,
        message:"Cart items fetched successfull",
        data:result
    })
})


//buy now update controller

const buyNowUpdateController = catchAsync(async(req,res) => {
    const result = await CartService.buyNowUpdate(req)

    return res.status(200).send({
        status:true,
        message:"Buy now updated successfull",
        data:result
    })
})

//get buy now

const getBuyNowController = catchAsync(async(req,res) => {
    const result = await CartService.getBuyNow(req)

    return res.status(200).send({
        status:true,
        message:"Buy now fetched successfull",
        data:result
    })
})

module.exports = {
    addItemToCart,
    updateCart,
    removeItemFromCart,
    clearCart,
    getUserCartItems,

    buyNowUpdateController,
    getBuyNowController
}