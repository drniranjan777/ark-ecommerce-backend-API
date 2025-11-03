const {BlogService} = require('../services/index')
const catchAsync = require('../utils/catchAsync')


const createBlog = catchAsync(async(req,res) => {
    const result = await BlogService.createBlog(req)

    return res.status(201).json({
        status:true,
        message:'Blog created successfull',
        data:result
    })
})

// get all blogs
const getAllBlogs = catchAsync(async(req,res) => {
    const result = await BlogService.getAllBlogs(req)

    return res.status(200).json({
        status:true,
        message:'Blogs fetched successfull',
        data:result
    })
})

// get blog by id
const getBlogById = catchAsync(async(req,res) => {
    const result = await BlogService.getBlogById(req)

    return res.status(200).json({
        status:true,
        message:'Blog fetched successfull',
        data:result
    })
})

// update Blog
const updateBlog = catchAsync(async(req,res) => {
    const result = await BlogService.updateBlog(req)

    return res.status(200).json({
        status:true,
        message:'Blog updated successfull',
        data:result
    })
})

// delete Blog
const deleteBlog = catchAsync(async(req,res) => {
    const result = await BlogService.deleteBlog(req)

    return res.status(200).json({
        status:true,
        message:'Blog deleted successfull',
        data:result
    })
})

module.exports={
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
}