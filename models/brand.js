const mongoose = require('mongoose')


const brandSchema = new mongoose.Schema(
    {
        brandName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        brandImage:{
            type:String,
            required:true,
            trim:true
        }
    },
    {timestamps:true}
)

const Brand = mongoose.model("Brand",brandSchema)

module.exports = Brand