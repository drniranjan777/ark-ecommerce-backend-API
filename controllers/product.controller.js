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
    await ProductService.deleteProduct(req)

    res.status(200).json({
        status:true,
        message:'Product Deleted Successfull'
    })
})

module.exports = {
    createProduct,
    getProductById,
    updateProduct,
    getProducts,
    deleteProduct
}