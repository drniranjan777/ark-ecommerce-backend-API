
const Coupon = require("../models/coupon")
const AppError = require("../utils/AppError")


//check coupon exists are not

const checkCoupon = async(couponCode) => {
    const coupon = await Coupon.findOne({coupon:couponCode})
    if(coupon){
        throw new AppError('Coupon Already Exists',409)
    }

    return 
}

//create coupon service
const createCoupon = async(req) => {
   const {coupon} = req.body

   await checkCoupon(coupon)

   const createdCoupon = await Coupon.create(req.body)

   if(!createdCoupon){
    throw AppError('Coupon not created',500)
   }

   return createdCoupon
}

// get coupon by id

const getCouponbyId = async(req) => {
   const {couponId} = req.params

   const coupon = await Coupon.findById(couponId) 

   if(!coupon){
    throw new AppError('Coupon Not Found',409)
   }

   return coupon
}

//update coupon

const updateCoupon = async(req) => {
    const {couponId} = req.params

    const {coupon} = req.body
    
    if(coupon){
        const existsOrNot = await Coupon.findOne({coupon,_id:{$ne:couponId}})
        if(existsOrNot){
            throw new AppError('Coupon Already Exists',409)
        }
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
        couponId,
        {$set:req.body},
        {new:true}
    )

    if(!updatedCoupon){
        throw new AppError('Coupon Not Updated',500)
    }

    return updatedCoupon
}

//get all coupons

const getCoupons = async (req) => {
  const page = Math.max(1, Number(req.query.page) || 1);    
  const limit = Math.max(1, Number(req.query.limit) || 10);

  const skip = (page - 1) * limit;

  const [coupons, total] = await Promise.all([
    Coupon.find().skip(skip).limit(limit).lean().sort({ createdAt: -1 }),
    Coupon.countDocuments(),
  ]);

  return {
    total,
    page:page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: coupons,
  };
};

//delete coupon

const deleteCoupon = async(req) => {
  const {couponId} = req.params

  const checkCouponExistsOrNot = await Coupon.findById(couponId)

  if(!checkCouponExistsOrNot){
    throw new AppError('Coupon not Exists',404)
  }

  const deletedCoupon = await Coupon.findByIdAndDelete(couponId)
  return deletedCoupon
}

//apply coupon

const applyCoupon = async(req) => {
  const {total,couponCode} = req.body

  const coupon = await Coupon.findOne({coupon:couponCode})

  if(!coupon) throw new AppError('Invalid coupon',404)

  const discount = (total * coupon.discount) / 100;

  const finalTotal = Math.max(total - discount, 0);

  return {
    discount,
    finalTotal,
    couponCode
  }
}

module.exports = {
    createCoupon,
    getCouponbyId,
    updateCoupon,
    getCoupons,
    deleteCoupon,
    applyCoupon
}