const { required, boolean } = require('joi')
const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema(
    {
        category:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        isDeleted:{
             type:Boolean,
             required:true,
             default:false
        }
    },
    {
        timestamps:true
    }
)

const Category = mongoose.model('Category',categorySchema)

module.exports = Category