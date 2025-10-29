const mongoose = require('mongoose')



const aboutSchema = new mongoose.Schema(
    {
        aboutPage:{
            type:String,
            required:true,
            trim:true
        },
        
    },
    {timestamps:true}
)

const About  = mongoose.model('About',aboutSchema)

module.exports = About