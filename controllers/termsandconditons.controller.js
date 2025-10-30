const {TermsAndConditonsService} = require('../services/index')
const catchAsync  = require('../utils/catchAsync')


//create termd and conditons api

const createTermsAndConditons = catchAsync(async(req,res) =>{
   const result = await TermsAndConditonsService.createTermsAndConditons(req)

   return res.status(201).json({
    status:true,
    message:'Terms and Conditions created successfull',
    createTermsAndConditons:result
   })
})

const deleteTermsAndConditons = catchAsync(async(req,res) =>{
   const result = await TermsAndConditonsService.deleteTermsAndConditions(req)

   return res.status(201).json({
    status:true,
    message:'Terms and Conditions deleted successfull',
    deletedTermsAndConditons:result
   })
})

const getTermsAndConditons = catchAsync(async(req,res) =>{
   const result = await TermsAndConditonsService.getTermsAndConditions(req)

   return res.status(201).json({
    status:true,
    message:'Terms and Conditions fetched successfull',
    deletedTermsAndConditons:result
   })
})


module.exports = {
    createTermsAndConditons,
    deleteTermsAndConditons,
    getTermsAndConditons
}