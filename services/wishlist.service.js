
const {Wishlist,WishlistItem} = require('../models/wishlist')
const Product = require('../models/product')
const AppError = require('../utils/AppError')

//add item to Wishlist

const addItemToWishlist = async(req) => {
    const user = req.user
    const {productId} = req.body

    
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found",404);
    
    let wishlist = await Wishlist.findOne({userId:user.id})

    if(!wishlist) wishlist = await Wishlist.create({ userId: user.id });



    let wishlistItem = await WishlistItem.findOne({wishlistId:wishlist._id,productId:productId})



    if(wishlistItem){
      throw new AppError('Product already exists in wishlist',409)
    }
    else{
     wishlistItem = await WishlistItem.create({
            wishlistId:wishlist.id,
            productId,
        })
    }

    if(!wishlistItem) throw new AppError('Item not added',500)


    return wishlistItem
}


//remove item from Wishlist

const removeItemFromWishlist = async(req) => {
    const {productId} = req.body

    const user = req.user
    
    const wishlist = await Wishlist.findOne({userId:user.id})

    if(!wishlist) throw new AppError('Wishlist not found',404)


    const removedItem = await WishlistItem.findOneAndDelete({wishlistId:wishlist._id,productId:productId})

    if(!removedItem) throw new AppError('Item not removed from Wishlist',500)


    return removedItem

}

//clear Wishlist

const clearWishlist = async(req) => {
  
    const user = req.user
    
    const wishlist = await Wishlist.findOne({userId:user.id})

    if(!wishlist) throw new AppError('Wishlist not found',404)
    

    const removedItem = await WishlistItem.deleteMany({wishlistId:wishlist._id})

    if(!removedItem) throw new AppError('Item not removed from Wishlist',500)


    return removedItem

}

//get user Wishlist items
const getUserWishlistItems = async(req) => { 
   const user = req.user

   const wishlist = await Wishlist.findOne({userId:user.id})

   if(!wishlist) throw new AppError('Wishlist not found',404)

   const wishlistItems = await WishlistItem.find({wishlistId:wishlist._id}).populate('productId').lean()

   if(!wishlistItems) throw new AppError('Wishlist items not found',500)

   return wishlistItems
}

module.exports = {
    addItemToWishlist,
    removeItemFromWishlist,
    clearWishlist,
    getUserWishlistItems
}