const Brand = require('../models/brand')
const AppError = require('../utils/AppError')


//check brand ecista or not

const checkBrand = async(brand) => {
   const brandExistsOrNot = await Brand.findOne({brandName:brand})

   if(brandExistsOrNot) throw new AppError('Brand already exists',409)

    return
}

//create brand 
const createBrand = async(req) => {
   const {brandName} = req.body

   await checkBrand(brandName)

   const createdBrand = await Brand.create(req.body)

   return createdBrand

}

//get brands

const getBrands = async(req) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*10

    const totalBrands = await Brand.countDocuments()

    const brands = await Brand.find().skip(skip).limit(limit).lean()

    const totalPages = Math.ceil(totalBrands/limit)

    return {
        brands,
        totalPages,
        currentPage:page,
        totalBrands
    }
}

//get brand by id

const getBrandById = async(req) => {
    const {brandId} = req.params

    const brand = await Brand.findById(brandId)

    return brand
}

// update brand

const updateBrand = async(req) => {
    const {brandId} = req.params

    const {brandName} = req.body
    
    await checkBrand(brandName)

    const updatedBrand = await Brand.findByIdAndUpdate(
        brandId,
        {$set:req.body},
        {new:true}
    )

    return updatedBrand
}

//delete brand

const deleteBrand = async(req) => {
    const {brandId} = req.params

    const deletedBrand = await Brand.findByIdAndDelete(brandId)

    return deletedBrand
}

module.exports = {
    createBrand,
    getBrands,
    getBrandById,
    updateBrand,
    deleteBrand
}