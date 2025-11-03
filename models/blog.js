const { required } = require('joi')
const mongoose = require('mongoose')


const blogSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trime:true
        },
        description:{
            type:String,
            required:true,
            trime:true
        },
        imageUrl:{
            type:String,
            trim:true
        }
    },
    {timestamps:true}
)

const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog
