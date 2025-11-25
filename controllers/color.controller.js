const {ColorService} = require('../services/index')
const catchAsync = require('../utils/catchAsync')

//create brand

const createColor = catchAsync(async(req,res) =>{
    const result = await ColorService.createColor(req)

    return res.status(201).json({
        status:true,
        message:'Color Created Successfull',
        data:result
    })
})

//get all brands

const getColors = catchAsync(async(req,res) =>{
    const result = await ColorService.getColors(req)

    return res.status(200).json({
        status:true,
        message:'Colors fetched Successfully',
        data:result
    })
})

//get brand by id

const getColorById = catchAsync(async(req,res) =>{
    const result = await ColorService.getClorById(req)

    return res.status(200).json({
        status:true,
        message:'Color fetched Successfully',
        data:result
    })
})

//update brand 

const updateColor = catchAsync(async(req,res) =>{
    const result = await ColorService.updateColor(req)

    return res.status(200).json({
        status:true,
        message:'Color updated Successfull',
        data:result
    })
})

//delete brand

const deleteColor = catchAsync(async(req,res) => {
    const result = await ColorService.deletedColor(req)

    return res.status(200).json({
        status:true,
        message:'Color deleted Successfull',
        data:result
    })
})

module.exports = {
    createColor,
    getColors,
    getColorById,
    updateColor,
    deleteColor
}