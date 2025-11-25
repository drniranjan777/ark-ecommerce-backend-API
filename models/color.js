const { required } = require('joi')
const mongoose = require('mongoose')


const colorSchema = new mongoose.Schema(
    {
        colorName:{
            type:String,
            required:true,
            trim:true
        },
        colorCode:{
            type:String,
            required:true,
            trim:true
        }
    }
)

const Color = mongoose.model("Color",colorSchema)


module.exports = Color