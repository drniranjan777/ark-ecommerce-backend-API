const Blog = require('../models/blog')
const AppError = require('../utils/AppError')

//create blog
const createBlog = async(req) => {

    const createdBlog = await Blog.create(req.body)

    return createdBlog
}

//get all blogs

const getAllBlogs = async(req) => {
   const page = Number(req.query.page) || 1
   const limit = Number(req.query.limit) || 10
   const skip = (page-1)*limit

   const blogs = await Blog.find().skip(skip).limit(limit).lean()
   const totalDocuments = await Blog.countDocuments()

   const totalPages = Math.ceil(totalDocuments/limit)

   return {
    blogs,
    currentPage:page,
    totalPages
   }
}

//get blog by id

const getBlogById = async(req) => {
    const {blogId} = req.params

    const blog = await Blog.findById(blogId)

    if(!blog) throw new AppError('Blog not found',404)

    return blog
}

//update blog
const updateBlog = async(req) => {
   const {blogId} = req.params

   const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    {$set:req.body},
    {new:true}
   )

   if(!updatedBlog) throw new AppError('Blog not found',404)

    return updatedBlog
}

//delete blog

const deleteBlog = async(req) => {
 const {blogId} = req.params

   const deletedBlog = await Blog.findByIdAndDelete(blogId)

   if(!deletedBlog) throw new AppError('Blog not found',404)

    return deletedBlog
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
}