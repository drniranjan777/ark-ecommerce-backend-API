const mongoose = require('mongoose')

const productSizeShema = new mongoose.Schema(
    {
        size:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
    },
    {timestamps:true}
)

const ProductSize = mongoose.model('ProductSize',productSizeShema)

module.exports = ProductSize