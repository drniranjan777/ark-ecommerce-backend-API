const {WishlistService} = require("../services/index")
const catchAsync = require('../utils/catchAsync')


//add item to wishlist

const addItemToWishlist= catchAsync(async(req,res) =>{

    const result = await WishlistService.addItemToWishlist(req)

   return res.status(200).json({
        status:true,
        message:'Item added to wishlist',
        data:result
    })

})


//remove item from wishlist

const removeItemFromWishlist = catchAsync(async(req,res) => {
    const result = await WishlistService.removeItemFromWishlist(req)
    return res.status(200).send({
        status:true,
        message:"Item removed from wishlist",
        data:result
    })
})

//clear wishlist

const clearWishlist = catchAsync(async(req,res) => {
    const result = await WishlistService.clearWishlist(req)
    return res.status(200).send({
        status:true,
        message:"Wishlist cleared successfull",
        data:result
    })
})

//get user wishlist items

const getUserWishlistItems = catchAsync(async(req,res) =>{
    const result = await WishlistService.getUserWishlistItems(req)
    return res.status(200).send({
        status:true,
        message:"Wishlist items fetched successfull",
        data:result
    })
})

module.exports = {
  addItemToWishlist,
  removeItemFromWishlist,
  clearWishlist,
  getUserWishlistItems
}