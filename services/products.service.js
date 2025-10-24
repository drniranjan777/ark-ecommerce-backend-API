const Product = require('../models/product')
const AppError = require('../utils/AppError')
const ProductReview = require('../models/productReview')
const ProductSize = require('../models/productSize')


//create product
const createProduct = async(req) => {
    const product = new Product(req.body)
    const saveProduct = await product.save()
  return saveProduct
}

//get product by id

const getProductByid = async(req) => {
    const {productId} = req.params
    const product = await Product.findById(productId).lean()

    if(!product){
      throw new AppError("Product not found",404)
    }
    return product
}


//update product

const updateProduct = async(req) => {
    const {productId} = req.params

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set:req.body},
        { new: true }
    );

   if (!updatedProduct) {
    throw new AppError('Product not updated', 500);
   }
    return updatedProduct
}

//get products

const getProducts = async (req) => {
  const {
    search,
    category,
    color,
    size,
    minPrice,
    maxPrice,
    sortBy = 'createdAt',  // default sort
    sortOrder = 'desc',    // asc or desc
    page = 1,
    limit = 10
  } = req.query;

  // Build filter object
  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  if (category) filter.category = category;
  if (color) filter.color = color;
  if (size) filter.size = Number(size);
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Convert pagination to numbers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;

  // Build sort object
  const sort = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1
  };

  // Query the database
  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber)
      .select('-__v') // Optional: exclude internal fields
      .lean(),        // Lean = better performance if no Mongoose methods needed
    Product.countDocuments(filter)
  ]);

  return {
    total,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(total / limitNumber),
    products
  };
};

//delete product

const deleteProduct = async(req) => {
  const {productId} = req.params

  const productExists = await Product.findById(productId)

  if(!productExists){
    throw new AppError('Product not found',404)
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

   const deletedProduct = await Product.findByIdAndDelete(productId);

  return deletedProduct;

}

//create product review

const createProductReview = async(req) => {
   const user = req.user
   const { product, rating, review } = req.body;
   const createdReview = await ProductReview.create({
     product,
     user:user.id,
     review,
     rating
   })
   console.log(user,'userrrrrr')
   return createdReview
}

//get review by id

const getProductReviewById = async(req) => {
  const {reviewId }= req.params

  const review = await ProductReview.findById(reviewId)

  if(!review){
    throw new AppError('Review not found',404)
  }

  return review
}

//upate product review

const updateProductReview = async(req) =>{
   const {reviewId} = await req.params
   const user = req.user

    const review = await getProductReviewById(req)


    if (review.user.toString() !== user.id.toString()) {
      throw new AppError('Different user created this review you are not able to update',409)
    }
  
   const updatedReview = await ProductReview.findByIdAndUpdate(
     reviewId,
     {$set : req.body},
     {new:true}
   )

   if(!updatedReview){
    throw new AppError('Review not updated',500)
   }
   return updatedReview
 
} 


//delete product review

const deleteProductReview = async(req) =>{
   const {reviewId} = await req.params
   const user = req.user

    const review = await getProductReviewById(req)

    if (review.user.toString() !== user.id.toString()) {
      throw new AppError('Different user created this review you are not able to delete',409)
    }
  
   const deletedReview = await ProductReview.findByIdAndDelete(reviewId)

   if(!deletedReview){
    throw AppError('Review not deleted',500)
   }

   return deletedReview
 
} 

//get product reviews

const getProductReviews = async(req) => {
   const {reviewId} = req.params

  //  console.log(productId,'pppppp')

   const productReviews = await ProductReview.find({product:reviewId}).populate('user','-password')

   if(!productReviews){
     throw new AppError('Internal server error',500)
   }

   return productReviews

}

/* 
  product size section
*/

//check product size exists or not
const checkSizeExistsOrNot = async(productSize) => {
  const size = await ProductSize.findOne({size:{$regex:`^${productSize}$`,$options:'i'}})
  
  if(size) throw new AppError('Product size already exists')
  return size
}

//created product size
const createProductSize = async(req) => {
   const {size} = req.body

   await checkSizeExistsOrNot(size) 

   const createdSize = await ProductSize.create({size})

   return createdSize

}

//get product size

const getProductSizeById = async(req) => {
    const {sizeId} = req.params

    const productSize = await ProductSize.findById(sizeId)

    if(!productSize) throw new AppError('Product size not found',404)

    return productSize
}

//get all product size

const getAllProductsSizes = async() => {
  const productSizes = await ProductSize.find().lean()
  return productSizes
}

//update product size

const updateProductSize = async(req) => {
  const {sizeId} = req.params
  const {size} = req.body

  await checkSizeExistsOrNot(size)

  const updatedSize = await ProductSize.findByIdAndUpdate(
    sizeId,
    {$set:{size:size}},
    {new:true}
  )

  return updatedSize
}

//delete product size
const deleteProductSize = async(req) => {
  const {sizeId} = req.params
  
  const deletedSize = await ProductSize.findByIdAndDelete(sizeId)
  return deletedSize
}

module.exports = {
    createProduct,
    getProductByid,
    updateProduct,
    getProducts,
    deleteProduct,

    createProductReview,
    getProductReviewById,
    updateProductReview,
    deleteProductReview,
    getProductReviews,

    //product size
    createProductSize,
    getProductSizeById,
    getAllProductsSizes,
    updateProductSize,
    deleteProductSize
}
