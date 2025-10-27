const {BrandService} = require('../services/index')
const catchAsync = require('../utils/catchAsync')

//create brand

const createBrand = catchAsync(async(req,res) =>{
    const result = await BrandService.createBrand(req)

    return res.status(201).json({
        status:true,
        message:'Brand Created Successfull',
        data:result
    })
})

//get all brands

const getBrands = catchAsync(async(req,res) =>{
    const result = await BrandService.getBrands(req)

    return res.status(200).json({
        status:true,
        message:'Brands fetched Successfully',
        data:result
    })
})

//get brand by id

const getBrandById = catchAsync(async(req,res) =>{
    const result = await BrandService.getBrandById(req)

    return res.status(200).json({
        status:true,
        message:'Brand fetched Successfully',
        data:result
    })
})

//update brand 

const updateBrand = catchAsync(async(req,res) =>{
    const result = await BrandService.updateBrand(req)

    return res.status(200).json({
        status:true,
        message:'Brand updated Successfull',
        data:result
    })
})

//delete brand

const deleteBrand = catchAsync(async(req,res) => {
    const result = await BrandService.deleteBrand(req)

    return res.status(200).json({
        status:true,
        message:'Brand deleted Successfull',
        data:result
    })
})

module.exports = {
    createBrand,
    getBrands,
    getBrandById,
    updateBrand,
    deleteBrand
}