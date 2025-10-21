const HomePageBanner = require('../models/homepagebanner')
const AppError = require('../utils/AppError')


const getHomePageBanner = async(bannerId) => {
    const homepageBanner = await HomePageBanner.findById(bannerId)

    if(!homepageBanner) throw new AppError('Banner not found',404)
    
    return homepageBanner
}

//create home page banner

const createHomePageBanner = async(req) => {
  
    const createdBanner = await HomePageBanner.create(req.body)

    if(!createdBanner) throw new AppError('Banner not created',500)
    
    return createdBanner
}

// get home page banner by id
const getHomePageBannerById = async(req,res) => {
    const {bannerId} = req.params

    const banner = await getHomePageBanner(bannerId)

    return banner
}

//get home page banner

const homePageBanner = async() => {
    const banner = await HomePageBanner.find()

    if(!banner) throw new AppError('Unable to fetch banner',500)

    return banner
}

//update home page banner

const updateHomePageBanner = async(req) => {
   const {bannerId} = req.params

   await getHomePageBanner(bannerId)

   const updatedBanner = await HomePageBanner.findByIdAndUpdate(
    bannerId,
    {$set:req.body},
    {new:true}
   )

   return updatedBanner
}

const deleteHomePageBanner = async(req) =>{
    const {bannerId} = req.params

    await getHomePageBanner(bannerId)

    const deletedHomePageBanner = await HomePageBanner.findByIdAndDelete(bannerId)

    if(!deletedHomePageBanner) throw new AppError('')
}

module.exports ={
    createHomePageBanner,
    getHomePageBannerById,
    homePageBanner,
    updateHomePageBanner,
    deleteHomePageBanner
}