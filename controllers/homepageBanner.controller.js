
const {HomePageBannerService} = require('../services/index')
const catchAsync = require('../utils/catchAsync')

//get homepage banner

const getHomePageBanner = catchAsync(async(req,res) => {
    const result = await HomePageBannerService.homePageBanner()

    return res.status(200).json({
        status:true,
        message:'Fecthed successfull',
        data:result
    })
})

//get homepage banner by id

const getHomePageBannerById = catchAsync(async(req,res) => {
    const result = await HomePageBannerService.getHomePageBannerById(req)

    return res.status(200).json({
        status:true,
        message:'Fecthed successfully',
        data:result
    })
})

//create homepage banner

const createHomePageBanner =catchAsync(async(req,res) => {
    const result = await HomePageBannerService.createHomePageBanner(req)

    return res.status(201).json({
        status:true,
        message:'Created Homepage banner successfully',
        data:result
    })
})

//update homepage banner

const updateHomePageBanner = catchAsync(async(req,res) => {
    const result = await HomePageBannerService.updateHomePageBanner(req)

    return res.status(200).json({
        status:true,
        message:' Homepage banner updated successfully',
        data:result
    })
})

//delete homepage banner

const deletedHomePageBanner = catchAsync(async(req,res) => {
    const result = await HomePageBannerService.deleteHomePageBanner(req)

    return res.status(200).json({
        status:true,
        message:' Homepage banner deleted successfully',
        data:result
    }) 
})

module.exports = {
    getHomePageBanner,
    getHomePageBannerById,
    createHomePageBanner,
    updateHomePageBanner,
    deletedHomePageBanner
}