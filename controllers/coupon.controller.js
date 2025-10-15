
const {CouponService} = require("../services/index")
const CatchAsync = require("../utils/catchAsync")


//create coupon
const createCoupon = CatchAsync(async(req,res) => {
   const result = await CouponService.createCoupon(req)

   res.status(201).json({
    status:true,
    message:'Coupon Created Successfull',
    coupon:result
   })
})

//get coupon by id

const getCouponbyId = CatchAsync(async(req,res) => {
    const result = await CouponService.getCouponbyId(req)

    res.status(200).json({
        status:true,
        message:'Coupon Fetched Successfull',
        coupon:result
    })
})

//update coupon

const updateCoupon = CatchAsync(async(req,res) => {
    const result = await CouponService.updateCoupon(req)

    res.status(200).json({
        status:true,
        message:'Coupon Updated Successfull',
        updatedCoupon:result
    })
})


// get coupons
const getCoupons = CatchAsync(async(req,res) => {
    const result = await CouponService.getCoupons(req)

    res.status(200).json({
        status:true,
        message:'Coupons Fetched Successfull',
        data:result
    })
})

//delete coupon
const deleteCoupon = CatchAsync(async(req,res) => {
    const result = await CouponService.deleteCoupon(req)

    res.status(200).json({
        status:true,
        message:'Coupons Deleted Successfull',
        data:result
    })
})

module.exports = {
    createCoupon,
    getCouponbyId,
    updateCoupon,
    getCoupons,
    deleteCoupon
}