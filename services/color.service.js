const Color = require('../models/color')
const AppError = require('../utils/AppError')


//check color exists or not

const checkColor = async(color,colorCode) => {
   const checkColor = await Color.findOne({colorName:color,colorCode:colorCode})

   if(checkColor) throw new AppError('Color already exists',409)

    return
}

//create color 
const createColor = async(req) => {
   const {colorName,colorCode} = req.body

   await checkColor(colorName,colorCode)

   const createdColor = await Color.create(req.body)

   return createdColor

}

//get colors

const getColors = async(req) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*10

    const totalColors = await Color.countDocuments()

    const colors = await Color.find().skip(skip).limit(limit).lean()

    const totalPages = Math.ceil(totalColors/limit)

    return {
        colors,
        totalPages,
        currentPage:page,
        totalColors
    }
}

//get color by id

const getClorById = async(req) => {
    const {colorId} = req.params

    const color = await Color.findById(colorId)

    return color
}

// update color

const updateColor = async(req) => {
    const {colorId} = req.params

    const {colorName,colorCode} = req.body
    
    await checkBrand(colorName,colorCode)

    const updatedBrand = await Color.findByIdAndUpdate(
        colorId,
        {$set:req.body},
        {new:true}
    )

    return updatedBrand
}

//delete color

const deletedColor = async(req) => {
    const {colorId} = req.params

    const deletedColor = await Color.findByIdAndDelete(colorId)

    return deletedColor
}

module.exports = {
    createColor,
    getClorById,
    getColors,
    updateColor,
    deletedColor
}