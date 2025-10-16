const mongoose = require('mongoose')
const Product = require('./product')
const User = require('./user')

const productReviewSchema = new mongoose.Schema(
    {
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:Product,
            required:true,
            index:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true,
            index:true
        },
        rating:{
            type:Number,
            required:true,
            min:1,
            max:5
        },
        review:{
            type:String,
            required:true,
            min:1
        }
    },
    {timestamps:true}
)

const ProductReview = mongoose.model('ProductReview',productReviewSchema)

module.exports = ProductReview