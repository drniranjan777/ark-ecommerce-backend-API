
const {CatgeoryService} = require('../services/index')
const catchAsync = require('../utils/catchAsync')


//create category controller

const createCategory = catchAsync(async(req,res) => {
    const result = await CatgeoryService.createCategory(req)

    res.status(201).send({
        status:true,
        message:'Category Created Successfull',
        data:result
    })
})

//get category by id
const getCategorybyId = catchAsync(async(req,res) => {
    const result = await CatgeoryService.getCategorybyId(req)
    res.status(200).send({
        status:true,
        message:'Category Fetched Successfull',
        data:result
    })
})


//update category by id
const updateCategory = catchAsync(async(req,res) => {
    const result = await CatgeoryService.updateCategory(req)
    res.status(200).send({
        status:true,
        message:'Category Updated Successfull',
        data:result
    })
})

//delete category by id

const deleteCategory = catchAsync(async(req,res) => {
    const result = await CatgeoryService.deleteCategory(req)
    res.status(200).send({
        status:true,
        message:'Category Deleted Successfull',
        data:result
    })
})


// get categories
const getCategories = catchAsync(async(req,res) => {
    const result = await CatgeoryService.getCategories(req)
    res.status(200).send({
        status:true,
        message:'Categories Fetched Successfull',
        data:result
    })
})

module.exports = {
    createCategory,
    getCategorybyId,
    updateCategory,
    deleteCategory,
    getCategories
}