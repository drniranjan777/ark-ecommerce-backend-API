const { required, types } = require('joi')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
{
   name:{
    type:String,
    required:true,
    index:true
   },
   description:{
     type:String,
     required:true,
     index:true
   },
   sku:{
     type:String,
     required:true,
   },
   thumbnail:{
     type:String,
     required:true
   },
   previews:{
     type:[String],
     required:true
   },
   price:{
     type:Number,
     required:true,
   },
   tax:{
     type:Number,
     required:true,
   },
    stocklevel:{
     type:Number,
     required:true,
   },
   category:{
     type:String,
     required:true,
     index:true
   },
   size:{
     type:Number,
     required:true
   },
   color:{
     type:String,
     required:true
   },
   packsize:{
    type:Number,
    required:true
   },
   tags:{
    type:[String],
    required:true
   },
   metadata:{
    type:String,
    required:true
   }
},
{ timestamps: true }
)


const Product = mongoose.model('Product',productSchema)

module.exports = Product
