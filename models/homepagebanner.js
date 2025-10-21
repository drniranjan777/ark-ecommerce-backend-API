
const mongoose = require('mongoose')


const homePageBannerScehma = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        imageUrl:{
            type:String,
            required:true,
            trim:true
        }
    }
)

const HomePageBanner = mongoose.model('HomePageBanner',homePageBannerScehma)

module.exports = HomePageBanner