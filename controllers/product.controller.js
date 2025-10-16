const {ProductService} = require('../services/index')
const catchAsync = require('../utils/catchAsync');


//create product controller

const createProduct = catchAsync(async(req,res) => {
    const result = await ProductService.createProduct(req)

    res.status(201).json({
        status:true,
        product:result,
        message:'Product Created Successfull'
    })
})

//get product controller

const getProductById = catchAsync(async(req,res) => {
    const result = await ProductService.getProductByid(req)

    res.status(201).json({
        status:true,
        product:result,
        message:'Product Fetched Successfull'
    })
})

//update product

const updateProduct = catchAsync(async(req,res) => {
    const result = await ProductService.updateProduct(req)

    res.status(200).json({
        status:true,
        product:result,
        message:'Product Updated Successfull'
    })
})

//get products

const getProducts = catchAsync(async(req,res) => {
    const result = await ProductService.getProducts(req)

    res.status(200).json({
        status:true,
        product:result,
        message:'Product Fetched Successfull'
    })
})

//delete product

const deleteProduct = catchAsync(async(req,res) => {
    const result = await ProductService.deleteProduct(req)

    res.status(200).json({
        status:true,
        message:'Product Deleted Successfull',
        data:result
    })
})

//create product review

const createProductReview = catchAsync(async(req,res) => {
    const result = await ProductService.createProductReview(req)
     res.status(201).json({
        status:true,
        message:'Review Created Successfull',
        data:result
    })
})


//create get product review by id

const getProductReviewById = catchAsync(async(req,res) => {
    const result = await ProductService.getProductReviewById(req)
     res.status(200).json({
        status:true,
        message:'Review Fetched Successfull',
        data:result
    })
})

//uppdate review

const updateProductReview = catchAsync(async(req,res) => {
    const result = await ProductService.updateProductReview(req)
     res.status(200).json({
        status:true,
        message:'Review Updated Successfull',
        data:result
    })
})

//delete review

const deleteProductReview = catchAsync(async(req,res) => {
    const result = await ProductService.deleteProductReview(req)
     res.status(200).json({
        status:true,
        message:'Review Deleted Successfull',
        data:result
    })
})

//get product reviews

const getProductReviews = catchAsync(async(req,res) => {
    const result = await ProductService.getProductReviews(req)
     res.status(200).json({
        status:true,
        message:'Reviews Fetched Successfull',
        data:result
    })
})

module.exports = {
    createProduct,
    getProductById,
    updateProduct,
    getProducts,
    deleteProduct,

    createProductReview,
    getProductReviewById,
    updateProductReview,
    deleteProductReview,
    getProductReviews
}